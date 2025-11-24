using Microsoft.AspNetCore.Mvc;
using backend.data;
using backend.models;
using backend.dto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace backend.controller
{
    [ApiController]
    [Route("api/category")]
    public class categoryController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public categoryController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // ---- Criar categoria ----
        [HttpPost]
        public async Task<IActionResult> CreateCategory (Category category)
        {
            _appDbContext.Category.Add(category);
            await _appDbContext.SaveChangesAsync();

            return Ok(category);
        }

        // ---- Buscar despesas ----
        [HttpGet]
        public IActionResult GetCategories ()
        {
            var category = _appDbContext.Category.ToList();
            
            return Ok(category);
        }

        // ---- Buscar despesa pelo ID ----
        [HttpGet("{id}")]
        public IActionResult GetCategoryById (int id)
        {
            var category = _appDbContext.Category.Find(id);

            return Ok(category);
        }

        // ---- Deletar despesa pelo ID ----
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory (int id)
        {   
            var deletedCategory = _appDbContext.Category.Find(id);
            if (deletedCategory == null) return NotFound();

            _appDbContext.Category.Remove(deletedCategory);
            await _appDbContext.SaveChangesAsync();
            return Ok(deletedCategory);
        }

        // ---- Atualizar categorias ----
        [HttpPatch]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] CategoryDto updateDto)
        {
            // Validação de ID
            if (updateDto == null)
            {
                return BadRequest("Id inválido.");
            }

            // Busca a despesa original no banco de dados
            // Inclui .FirstOrDefaultAsync() e AsTracking() para permitir modificação
            var expenseToUpdate = await _appDbContext.Category.FirstOrDefaultAsync(e => e.Id == id);
            if (expenseToUpdate == null)
            {
                return NotFound($"Despesa com ID {id} não encontrada.");
            }
            
            bool isModified = false;
            
            if (!string.IsNullOrEmpty(updateDto.Name))
            {
                expenseToUpdate.Name = updateDto.Name;
                isModified = true;
            }

            if (!string.IsNullOrEmpty(updateDto.Icon))
            {
                expenseToUpdate.Icon = updateDto.Icon;
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