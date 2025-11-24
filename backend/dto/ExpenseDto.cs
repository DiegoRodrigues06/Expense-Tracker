namespace backend.dto
{
    public class ExpenseDto
    {
        public class ExpenseUpdateDto
        {
            public decimal? Budget { get; set; }
            public string Description { get; set; }
            public decimal? Value { get; set; }
            public string Goal { get; set; }
        }
    }
}