using Microsoft.VisualBasic;

namespace backend.models
{
    public class Expense
    {
        public int Id { get; set; }
        public decimal Budget { get; set;}
        public string Description { get; set; }
        public decimal Value { get; set; }
        public string? Goal { get; set; }
        public DateTime Date { get; set; }

        //  chave estrangeira
        public int UsersID { get; set; }
        // relacionamento
        public Users User { get; set; }

        public int CategoryID { get; set; }
        public Category category { get; set; }
    }
}