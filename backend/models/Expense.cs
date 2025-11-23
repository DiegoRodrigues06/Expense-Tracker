using Microsoft.VisualBasic;

namespace backend.models
{
    public class Expense
    {
        public int Id { get; set; }
        public float Budget { get; set;}
        public string Description { get; set; }
        public float Value { get; set; }
        public string Goal { get; set; }
        public DateTime Date { get; set; }

        //  chave estrangeira
        public int UsersID { get; set; }
        public Users User { get; set; }
    }
}