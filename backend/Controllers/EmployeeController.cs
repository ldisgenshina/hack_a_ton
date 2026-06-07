using Microsoft.Extensions.Logging;

namespace backend.Controllers{
    public class EmployeeController{
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
                if(){
                    token = _jwtService.GenerateTokenForUser(id, loginRequest.Login)
                    return Ok()
                }
            }
            catch(Exception ex){
                _logger.LogInformation("Ошибка сервера: " + ex.Message);
                return StatusCode(500);
            }
        }
    }
}