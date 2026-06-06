using backend.Domain.Contracts.Request;

namespace backend.Midleware.Interfaces
{
    public interface IStorageService
    {
        public Task<string> SaveCanvas(GetPostCanvasRequest request);
        public Task<GetPostCanvasRequest> SendCanvas(int canvasId);
        public Task<List<GetPostCanvasRequest>> SendListCanvas();
    }
}
