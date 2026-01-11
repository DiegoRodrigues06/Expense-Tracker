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

        public class ExpenseResponseDto
        {
            public int Id { get; set; }
            public decimal Budget { get; set; }
            public string Description { get; set; }
            public decimal Value { get; set; }
            public string Goal { get; set; }
            public DateTime Date { get; set; }

            public int UsersID { get; set; }
            public string UserName { get; set; }

            public int CategoryID { get; set; }
            public string CategoryName { get; set; }
        }
    }
}