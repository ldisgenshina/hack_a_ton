using backend.Midleware.Interfaces;
using backend.Domain.Contracts.Request;
using backend.Domain.Contracts.Response;
using backend.Domain.Models;


namespace backend.Midleware.Interfaces
{
    public interface IStorageService
    {
        public Task SaveCanvas(GetPostCanvasRequest request);
        public Task<GetPostCanvasRequest> SendCanvas(int canvasId);
        public Task<List<GetPostCanvasRequest>> SendListCanvas(PlaginationMeta plagination);
        public Task<GetPostersResponse> SendImagesToAndroid(int deviceId);
    }
}
