using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Domain.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace backend.Midleware.Services{
    // Интерфейс jwt сервисов
    public interface IJwtService{
        string GenerateTokenForTV(string tvId);
        string GenerateTokenForEmployee(string employeeId, string login);
    }
    // Сам сервис
    public class JwtService : IJwtService{
        // Настройки токенов
        private readonly JwtSettings _jwtSettingsForTV;
        private readonly JwtSettings _jwtSettingsForEmployee;

        public JwtService(IOptions<JwtSettingsTV> jwtSettingsForTV, IOptions<JwtSettingsEmployee> jwtSettingsForEmployee){
            _jwtSettingsForTV = jwtSettingsForTV.Value;
            _jwtSettingsForEmployee = jwtSettingsForEmployee.Value;
        }



        // Генерация токена для телеков
        public string GenerateTokenForTV(string tvId){
            // Создание клаймов
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, tvId.ToString()),
                new Claim(ClaimTypes.Role, "TV"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            // Создание сигнатуры
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettingsForTV.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // Объявляю и инициализирую токен
            var token = new JwtSecurityToken(
                issuer: _jwtSettingsForTV.Issuer,
                audience: _jwtSettingsForTV.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(_jwtSettingsForTV.ExpiredHours),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // Генерация токена для пользователей
        public string GenerateTokenForEmployee(string employeeId, string login){
            // Создание клаймов
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, employeeId),
                new Claim(ClaimTypes.Role, "Employee"),
                new Claim(ClaimTypes.Name, login.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            // Создание сигнатуры
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettingsForEmployee.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // Объявляю и инициализирую токен
            var token = new JwtSecurityToken(
                issuer: _jwtSettingsForEmployee.Issuer,
                audience: _jwtSettingsForEmployee.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettingsForEmployee.ExpiredMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}