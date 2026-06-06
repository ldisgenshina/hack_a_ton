using backend.Midleware.Interfaces;
using backend.Domain.Contracts.Request;
using backend.Domain.Contracts.Response;
using backend.Domain.Models;
using System.Text.Json;

namespace backend.Midleware.Services
{
    public class StorageService : IStorageService
    {
        private readonly IConfiguration _configuration;
        private readonly string _jsonTempDirectory;
        public StorageService(IConfiguration configuration)
        {
            _configuration = configuration;
            _jsonTempDirectory = configuration["PosterJsonStorage"] ?? "/backend/Temp/PosterJson";
        }

        public async Task SaveCanvas(GetPostCanvasRequest request)
        {
            try
            {
                if(request.Canvas == null || request.Image == null) 
                    throw new ApiException(400, "Невалидный запрос");
                
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

                throw new NotImplementedException();
            }
            catch
            {
                throw new ApiException(500, "Внутренняя ошибка сервера");
            }
        }
        public async Task<List<GetPostCanvasRequest>> SendListCanvas(PlaginationMeta plagination)
        {
            try
            {

                throw new NotImplementedException();
            }
            catch
            {
                throw new ApiException(500, "Внутренняя ошибка сервера");
            }
        }
        public async Task<GetPostersResponse> SendImagesToAndroid(int deviceId)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch
            {
                throw new ApiException(500, "Внутренняя ошибка сервера");
            }
        }
    }
}