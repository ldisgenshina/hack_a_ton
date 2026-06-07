using System.Text;
using backend.Domain.Context;
using backend.Domain.Models;
using backend.Midleware.Interfaces;
using backend.Midleware.Services;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);

// Регестрирую сервис токенизации, передаю в конструктор настройки jwt для TV и для сотрудника
builder.Services.Configure<JwtSettingsTV>(builder.Configuration.GetSection("JwtSettingsTV"));
builder.Services.Configure<JwtSettingsEmployee>(builder.Configuration.GetSection("JwtSettingsEmployee"));
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<DbContext>();
builder.Services.AddScoped<IStorageService, StorageService>();

// Получаю настройки токенизации
var jwtSettingsEmployee = builder.Configuration.GetSection("JwtSettingsEmployee");
var secretKeyEmployee = Encoding.UTF8.GetBytes(jwtSettingsEmployee["SecretKey"]!);

// Регистрирую аутентификацию
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // В разработке можно false
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettingsEmployee["Issuer"],
        ValidAudience = jwtSettingsEmployee["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(secretKeyEmployee)
    };
});
// Добавляю авторизацию
builder.Services.AddAuthorization();
// Добавляю контроллеры
builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Добавляю https, аунтетификацию, авторизацию, мапы
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

