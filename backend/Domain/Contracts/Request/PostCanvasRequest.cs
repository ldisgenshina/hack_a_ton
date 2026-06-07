using System.Text.Json;

namespace backend.Domain.Contracts.Request
{
    public class GetPostCanvasRequest
    {
        public byte[] Image {get; set;} = [];
        public JsonElement Canvas { get; set; }
    }
}