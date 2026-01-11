using Microsoft.AspNetCore.Mvc;
using backend.data;
using backend.models;
using backend.dto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace backend.controller
{
    [ApiController]
    [Route("api/expense")]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ExpenseController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // ---- Criar despesa ----
        [HttpPost]
        public async Task<IActionResult> CreateExpense (Expense expense)
        {
            _appDbContext.Expenses.Add(expense);
            await _appDbContext.SaveChangesAsync();

            return Ok(expense);
        }

        // ---- Buscar despesas ----
        [HttpGet]
        public IActionResult GetExpenses ()
        {
            var expenses = _appDbContext.Expenses.ToList();
            
            return Ok(expenses);
        }

        // ---- Buscar despesa pelo ID ----
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpense(int id)
        {
            var expense = await _appDbContext.Expenses
                .Where(e => e.Id == id) // onde expenseId for igual ao ID passado
                .Select(e => new ExpenseDto.ExpenseResponseDto 
                // crio um novo objeto E.R.Dto e uso o .Select para buscar apenas os dados necessários
                {
                    Id = e.Id,
                    Budget = e.Budget,
                    Description = e.Description,
                    Value = e.Value,
                    Goal = e.Goal,
                    Date = e.Date,

                    UsersID = e.UsersID,
                    UserName = e.User.Name,

                    CategoryID = e.CategoryID,
                    CategoryName = e.category.Name
                })
                .FirstOrDefaultAsync();

            if (expense == null)
                return NotFound();

            return Ok(expense);
        }

        // ---- Deletar despesa pelo ID ----
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense (int id)
        {   
            var deletedExpense = _appDbContext.Expenses.Find(id);
            if (deletedExpense == null) return NotFound();

            _appDbContext.Expenses.Remove(deletedExpense);
            await _appDbContext.SaveChangesAsync();
            return Ok(deletedExpense);
        }

        // ---- Atualizar despesa ----
        [HttpPatch]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] ExpenseDto.ExpenseUpdateDto updateDto)
        {
            // Validação de ID
            if (updateDto == null)
            {
                return BadRequest("Id inválido.");
            }

            // Busca a despesa original no banco de dados
            // Inclui .FirstOrDefaultAsync() e AsTracking() para permitir modificação
            var expenseToUpdate = await _appDbContext.Expenses.FirstOrDefaultAsync(e => e.Id == id);
            if (expenseToUpdate == null)
            {
                return NotFound($"Despesa com ID {id} não encontrada.");
            }
            
            bool isModified = false;

            if (updateDto.Budget.HasValue)
            {
                expenseToUpdate.Budget = updateDto.Budget.Value;
                isModified = true;
            }
            
            if (!string.IsNullOrEmpty(updateDto.Description))
            {
                expenseToUpdate.Description = updateDto.Description;
                isModified = true;
            }

            if (updateDto.Value.HasValue)
            {
                expenseToUpdate.Value = updateDto.Value.Value; // Usa .Value para acessar o valor subjacente
                isModified = true;
            }
            
            if (!string.IsNullOrEmpty(updateDto.Goal))
            {
                expenseToUpdate.Goal = updateDto.Goal;
                isModified = true;
            }
        

            if (!isModified)
            {
                return BadRequest("Nenhum atributo válido foi fornecido para atualização.");
            }

            try
            {
                await _appDbContext.SaveChangesAsync();
                
                return Ok(expenseToUpdate); 
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro interno ao atualizar a despesa.");
            }
        }
    }
}