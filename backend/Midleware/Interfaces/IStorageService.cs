using backend.Midleware.Interfaces;
using backend.Domain.Contracts.Request;
using backend.Domain.Contracts.Response;
using backend.Domain.Models;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace backend.Midleware.Interfaces
{
    public interface IStorageService
    {
        public Task SaveCanvas(GetPostCanvasRequest request);
        public Task<GetPostCanvasRequest> SendCanvas(int canvasId);
        public Task<GetPostersResponse> SendListCanvas(PlaginationMeta plagination);
        public Task<GetPostersAndroidResponse> SendImagesToAndroid(int deviceId);
    }
}
