using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;



var builder = WebApplication.CreateBuilder(args);

// Регестрирую сервис токенизации, передаю в конструктор настройки jwt для TV и для сотрудника
builder.Services.Configure<JwtSettingsTV>(builder.Configuration.GetSection("JwtSettingsTV"));
builder.Services.Configure<JwtSettingsEmployee>(builder.Configuration.GetSection("JwtSettingsEmployee"));
builder.Services.AddScoped<IJwtService, JwtService>();

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
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(secretKeyEmployee)
    };
});
// Добавляю авторизацию
builder.Services.AddAuthorization();
// Добавляю контроллеры
builder.Services.AddControllers();

// Настройки для аутентификации
var jwtSettingsEmployee = builder.Configuration.GetSection("JwtSettingsEmployee");
var secretKeyEmployee = Encoding.UTF8.GetBytes(jwtSettingsEmployee["SecretKey"]!);

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

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

// Добавляю https, аунтетификацию, авторизацию, мапы
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
