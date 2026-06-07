using System.Security.Claims;
using backend.Midleware.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers{
    [Controller]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase{
        private readonly ILogger<EmployeeController> _logger;
        private readonly IJwtService _jwtService;

        public EmployeeController(IJwtService jwtService){
            _jwtService = jwtService;
        }



        [HttpPost("Login")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]

        public async Task<IActionResult> Login(LoginRequest loginRequest){
            // Надо ещё искать соответствующий логин, пароль!!!!!!!
            try{
                string? id = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if(User?.FindFirst(ClaimTypes.NameIdentifier)?.Value != null){
                    string token = _jwtService.GenerateTokenForEmployee(id, loginRequest.Email);
                    return Ok();
                }
                return NotFound();
            }
            catch(Exception ex){
                _logger.LogInformation("Ошибка сервера: " + ex.Message);
                return StatusCode(500);
            }
        }
    }
}