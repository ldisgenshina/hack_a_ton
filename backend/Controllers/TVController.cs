using Microsoft.Extensions.Logging;

namespace backend.Controllers{
    public class TVController{
        private readonly ILogger<TVController> _logger;
        private readonly IJwtService _jwtService;

        public TVController(IJwtService jwtService){
            _jwtService = jwtService;
        }



        [HttpPost("Login/{id}")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Login(int id){
            // Надо ещё проверять уникальность id в базе!!!!!!!
            try{
                string token = _jwtService.GenerateTokenForTV(id);

                return Ok(new {token, type = "TV"});
            }
            catch(Exception ex){
                _logger.LogInformation("Ошибка сервера: " + ex.Message);
                return StatusCode(500);
            }
        }
    }
}