using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

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

                // exemplo: pegar o id do usuário do token
                var userId = jwt.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

                if (userId == null)
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Token inválido");
                    return;
                }

                // salvar dados do usuário para uso no controller
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
