using Microsoft.EntityFrameworkCore; // usando o namespace do Entity Framework Core
using backend.models; // usando o namespace onde criei os modelos das tabelas

namespace backend.data
{
    public class AppDbContext : DbContext // : -> herdar metodos e atributos
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Category>()
                .HasIndex(c => c.Name)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Category { get; set; }
    }
}