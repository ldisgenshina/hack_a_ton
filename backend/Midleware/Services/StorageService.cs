using backend.Midleware.Interfaces;
using backend.Domain.Contracts.Request;
using backend.Domain.Contracts.Response;
using backend.Domain.Models;
using System.Text.Json;
using LiteDB;
using backend.Domain.Context;
using backend.Domain.Models.Tables;
using backend.Domain.Enums;
using System.Text;

namespace backend.Midleware.Services
{
    public class StorageService : IStorageService
    {
        private readonly IConfiguration _configuration;
        private readonly DbContext _context;
        private readonly string _jsonTempDirectory;
        private readonly string _pngTempDirectory;
        public StorageService(IConfiguration configuration, DbContext context)
        {
            _configuration = configuration;
            _context = context;
            _jsonTempDirectory = configuration["PosterJsonStorage"] ?? "backend/Temp/PosterJson";
            _pngTempDirectory = configuration["PosterPngStorage"] ?? "backend/Temp/PosterPng";
        }

        public async Task SaveCanvas(GetPostCanvasRequest request)
        {
            try
            {
                if(request.Canvas.ValueKind == JsonValueKind.Undefined || request.Image == null) 
                    throw new ApiException(400, "Невалидный запрос");
                string FileNameJsonFormat = GenerateUniqueFileName(PosterTypes.JSON);
                string FileNamePngFormat = GenerateUniqueFileName(PosterTypes.PNG);

                string JsonFormatFilePath = Path.Combine(_jsonTempDirectory, FileNameJsonFormat);
                string PngFormatFilePath = Path.Combine(_pngTempDirectory, FileNamePngFormat);
                
                using var db = new LiteDatabase(_context.PathToDatabase);
                var posters = db.GetCollection<Poster>("posters");
                posters.Insert(new Poster
                {
                    JsonLink = JsonFormatFilePath,
                    PngLink = PngFormatFilePath
                });

                await SaveJsonAsync(request.Canvas,JsonFormatFilePath);
                await SavePngAsync(request.Image, PngFormatFilePath);
            }
            catch
            {
                throw new ApiException(500, "Внутренняя ошибка сервера");
            }
        }
        public async Task<GetPostCanvasRequest> SendCanvas(int canvasId)
        {
            try
            {
                if(canvasId <= 0) throw new ApiException(400, "Невалидный запрос");

                using var db = new LiteDatabase(_context.PathToDatabase);
                var posters = db.GetCollection<Poster>("posters");
                var poster = posters.FindById(canvasId);
                if(poster == null) throw new ApiException(404, "Запись в БД с таким Id отсутсвует");

                string jsonLink = poster.JsonLink;
                string pngLink = poster.PngLink;

                JsonElement canvas = await GetJsonFromFileAsync(jsonLink);
                byte[] image = await GetByteImageAsync(pngLink);

                GetPostCanvasRequest response = new GetPostCanvasRequest()
                {
                    Image = image,
                    Canvas = canvas
                };
                return response;
            }
            catch
            {
                throw new ApiException(500, "Внутренняя ошибка сервера");
            }
        }
        public async Task<GetPostersResponse> SendListCanvas(PlaginationMeta plagination)
        {
            try
            {
                using var db = new LiteDatabase(_context.PathToDatabase);
                var posters = db.GetCollection<Poster>("posters");
                var page = posters.Query()
                    .OrderBy(p => p.Id)      
                    .Skip((plagination.Page - 1) * plagination.Size)  
                    .Limit(plagination.Size)              
                    .ToList();
                int totalRecords = page.Count();

                List<byte[]> images = new List<byte[]>();
                foreach(var poster in page)
                    images.Add(await GetByteImageAsync(poster.PngLink));
                GetPostersResponse response = new GetPostersResponse()
                {
                    Images = images,
                    Plagination = plagination
                };
                return response;
            }
            catch
            {
                throw new ApiException(500, "Внутренняя ошибка сервера");
            }
        }
        public async Task<GetPostersAndroidResponse> SendImagesToAndroid(int deviceId)
        {
            try
            {
                using var db = new LiteDatabase(_context.PathToDatabase);
                var devicePoster = db.GetCollection<DevicePoster>("devicePoster");
                var necessaryIdentificators = devicePoster.Query()
                                                          .Where(dp => dp.DeviceId == deviceId)
                                                          .Select(dp => dp.PosterId)
                                                          .ToList();
                var posters = db.GetCollection<Poster>("poster");
                
                var requiredPosters = posters.Query()
                                             .Where(p => necessaryIdentificators
                                             .Contains(p.Id))
                                             .ToList();
                
                List<byte[]> images = new List<byte[]>();
                foreach(var poster in requiredPosters)
                    images.Add(await GetByteImageAsync(poster.PngLink));

                GetPostersAndroidResponse response = new GetPostersAndroidResponse()
                {
                    Images = images,
                };
                return response;
            }
            catch
            {
                throw new ApiException(500, "Внутренняя ошибка сервера");
            }
        }

        private string GenerateUniqueFileName(PosterTypes types)
        {
            using var db = new LiteDatabase(_context.PathToDatabase);
            var posters = db.GetCollection<Poster>("posters");
            int lastId = posters.Max(p => p.Id);
            var poster = posters.FindById(lastId);
            StringBuilder path;
            char lastSymbolChar;
            int lastSymbol;
            string newPath;
            switch (types)
            {
                case PosterTypes.JSON:
                    path = new StringBuilder(poster.JsonLink);
                    lastSymbolChar = path[^1];

                    if(!int.TryParse(lastSymbolChar.ToString(), out lastSymbol))
                        throw new ApiException(500, "Внетренняя ошибка сервера");
                    lastSymbol++;
                    path[^1] = (char)lastSymbol;
                    newPath = path.ToString() + ".json";
                    return newPath;


                case PosterTypes.PNG:
                    path = new StringBuilder(poster.PngLink);
                    lastSymbolChar = path[^1];

                    if(!int.TryParse(lastSymbolChar.ToString(), out lastSymbol))
                        throw new ApiException(500, "Внетренняя ошибка сервера");
                    lastSymbol++;
                    path[^1] = (char)lastSymbol;
                    newPath = path.ToString() + ".png";


                    return newPath;
            }
            throw new ApiException(500, "Внутрення ошибка сервера");
        }

        private static async Task<byte[]> GetByteImageAsync(string path)
        {
            if (!File.Exists(path)) throw new ApiException(404, "Файл не найден");
            return await File.ReadAllBytesAsync(path);
        }

        private static async Task SavePngAsync(byte[] image, string path)
        {
            await File.WriteAllBytesAsync(path, image);
        }

        private static async Task SaveJsonAsync(JsonElement json, string path)
        {
            await using var fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
            using var writer = new Utf8JsonWriter(fileStream);
            json.WriteTo(writer);
        }

        private static async Task<JsonElement> GetJsonFromFileAsync(string path)
        {
            if(!File.Exists(path)) throw new ApiException(404, "Файл не найден");
            await using var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
            using var document = await JsonDocument.ParseAsync(fileStream);

            return document.RootElement.Clone();
        }
    }
}