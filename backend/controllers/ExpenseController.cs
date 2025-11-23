using Microsoft.AspNetCore.Mvc;
using backend.data;
using backend.models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace backend.controller
{
    [ApiController]
    [Route("api/category")]
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
    }
}