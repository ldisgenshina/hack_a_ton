using backend.Domain.Contracts.Request;
using backend.Domain.Context;
using backend.Midleware.Interfaces;
using LiteDB;
using backend.Domain.Models.Tables;

namespace backend.Midleware.Services
{
    public class AuthService : IAuthService
    {
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly DbContext _context;
        public AuthService(IJwtService jwtService, IConfiguration configuration, DbContext dbContext)
        {
            _jwtService = jwtService;
            _configuration = configuration;
            _context = dbContext;
        }

        public async Task<string> CreateUserAsync(CreateEmployeeRequest request)
        {
            try
            {
                if(request.Login == null || request.Password == null)
                    throw new ApiException(400, "Неверный формат данных");
                using var db = new LiteDatabase(_context.PathToDatabase);
                var employees = db.GetCollection<Employee>("employee");
                var existingEmployee = employees.FindOne(e => e.Login == request.Login);
                if(existingEmployee != null)
                    throw new ApiException(409, "Сотрудник с таким Login уже существует");
                                               
                Employee newEmployee = new()
                {
                    Login = request.Login,
                    Password = request.Password
                };
                employees.Insert(newEmployee);

                return _jwtService.GenerateTokenForEmployee(newEmployee.Id.ToString(), newEmployee.Login );
            }
            catch
            {
                throw new ApiException(500, "Незадокументированная ошибка сервера");
            }
        }
        public async Task<string> LoginAsync(int userId)
        {
            try
            {
                using var db = new LiteDatabase(_context.PathToDatabase);
                var employees = db.GetCollection<Employee>("employee");
                var existingEmployee = employees.FindById(userId);
                if(existingEmployee == null)
                    throw new ApiException(404, $"Сотрудник с Id:{userId} не найден");
                return _jwtService.GenerateTokenForEmployee
                    (existingEmployee.Id.ToString(), existingEmployee.Login );
            }
            catch
            {
                throw new ApiException(500, "Незадокументированная ошибка сервера");
            }
        }
    }
}