using backend.Domain.Contracts.Request;

namespace backend.Midleware.Interfaces
{
    public interface IAuthService
    {
        public Task<string> CreateUserAsync(CreateEmployeeRequest request);
        public Task<string> LoginAsync( int userId);
    }
}