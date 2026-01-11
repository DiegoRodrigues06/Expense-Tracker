using Microsoft.AspNetCore.Mvc;
using backend.data;
using backend.models;
using backend.dto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

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

        // ---- Buscar usuário pelo ID ----
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _appDbContext.Users
                .Where(u => u.Id == id)
                .Select(u => new UserDto.UserResponseDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,

                    Expenses = u.Expenses.Select(e => new UserDto.UserExpenseDto
                    {
                        Id = e.Id,
                        Budget = e.Budget,
                        Description = e.Description,
                        Value = e.Value,
                        Goal = e.Goal,
                        Date = e.Date
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // ---- Deletar usuário pelo ID ----
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser (int id)
        {   
            var deletedUser = _appDbContext.Users.Find(id);
            if (deletedUser == null) return NotFound();

            _appDbContext.Users.Remove(deletedUser);
            await _appDbContext.SaveChangesAsync();
            return Ok(deletedUser);
        }

        // ---- Função Login ----
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDto.LoginDto loginDto)
        {
            try
            {
                if (string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Senha))
            {
                return BadRequest("Email e Senha são obrigatórios."); // Retorna 400 (má requisição)
            }
            var user = _appDbContext.Users
                .FirstOrDefault(u => u.Email == loginDto.Email && u.Senha == loginDto.Senha);

            if (user == null)
                return Unauthorized("Email ou senha incorretos.");

            return Ok();

            } catch (Exception) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao logar.");
            }
            
        }

    }
}