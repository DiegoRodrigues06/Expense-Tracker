using Microsoft.AspNetCore.Mvc;
using backend.data;
using backend.models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.controller
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public UsersController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // ---- Criar usuário ---
        [HttpPost]
        public async Task<IActionResult> CreateUser (Users user)
        {
            _appDbContext.Users.Add(user);
            await _appDbContext.SaveChangesAsync();

            return Ok(user);
        }

        // ---- Buscar usuário ---
        [HttpGet]
        public IActionResult GetUsers ()
        {
            var users = _appDbContext.Users.ToList();
            
            return Ok(users);
        }
    }
}