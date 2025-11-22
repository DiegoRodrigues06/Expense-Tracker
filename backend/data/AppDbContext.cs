using Microsoft.EntityFrameworkCore; // usando o namespace do Entity Framework Core
using backend.models; // usando o namespace onde criei os modelos das tabelas

namespace backend.data
{
    public class AppDbContext : DbContext // : -> herdar metodos e atributos
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {  
        }

        public DbSet<Users> Users{ get; set;}
    }
}