using System.Security.Claims;
using backend.Domain.Contracts.Request;
using backend.Midleware.Interfaces;
using backend.Midleware.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers{
    [Controller]
    [Route("api/employee")]
    public class EmployeeController : ControllerBase{
        private readonly ILogger<EmployeeController> _logger;
        private readonly IAuthService _authService;

        public EmployeeController(
         ILogger<EmployeeController> logger,
         IAuthService authService)
         {
            _logger = logger;
            _authService = authService;
        }

        
        [HttpPost("add")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> CreateUser([FromBody] CreateEmployeeRequest request)
        {
            try
            {
                string token = await _authService.CreateUserAsync(request);
                return Ok(token);
            }
            catch(Exception ex)
            {
                if(ex is ApiException apiEx)
                {
                    int statusCode = apiEx.StatusCode;
                    return StatusCode(statusCode, apiEx.Info);
                }
                return StatusCode(500, "Неожиданная ошибка сервера");
            }
        }


        [HttpPost("login")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]

        public async Task<IActionResult> Login([FromBody]LoginEmloyeeRequest loginRequest){
            // Надо ещё искать соответствующий логин, пароль!!!!!!!
            try{
                string? id = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if(!int.TryParse(id, out int userId))
                    throw new ApiException(400, "Неверный формат данных");
                string token = await _authService.LoginAsync(userId);
                return Ok(token);
            }
            catch(Exception ex)
            {
                if(ex is ApiException apiEx)
                {
                    int statusCode = apiEx.StatusCode;
                    return StatusCode(statusCode, apiEx.Info);
                }
                return StatusCode(500, "Неожиданная ошибка сервера");
            }
        }
    }
}