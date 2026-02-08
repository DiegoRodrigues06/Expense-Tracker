using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Linq;

namespace backend.helpers
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // --- NOVA LÓGICA: Pular validação para Login e Cadastro ---
            var path = context.Request.Path.Value?.ToLower();

            // Adicione a rota /api/expense na lista de permissões temporária
            if (path == "/api/users/login" || 
                path.StartsWith("/api/users/") || 
                path.StartsWith("/api/expense") || // Libera as despesas
                (path == "/api/users" && context.Request.Method == "POST"))
            {
                await _next(context);
                return;
            }


            if (path == "/api/users/login" || (path == "/api/users" && context.Request.Method == "POST"))
            {
                await _next(context);
                return;
            }
            // ---------------------------------------------------------

            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token == null)
            {
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsync("Token não fornecido");
                return;
            }

            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);

                var userId = jwt.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

                if (userId == null)
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Token inválido");
                    return;
                }

                context.Items["UserId"] = userId;
            }
            catch
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Token mal formatado");
                return;
            }

            await _next(context);
        }
    }
}