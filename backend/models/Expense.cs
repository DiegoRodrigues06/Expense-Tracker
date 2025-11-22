using Microsoft.VisualBasic;

namespace backend.models
{
    public class Expense
    {
        private int Id { get; set; }
        private string Description { get; set; }
        private float Value { get; set; }
        private DateTime Date { get; set; }

        private int UsersID { get; set; }
        private Users User { get; set; }
    }
}