using Microsoft.VisualBasic;

namespace backend.models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public float Value { get; set; }
        public DateTime Date { get; set; }

        public int UsersID { get; set; }
        public Users User { get; set; }
    }
}