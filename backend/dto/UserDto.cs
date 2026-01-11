namespace backend.dto
{
    public class UserDto
    {
        public class LoginDto
        {
            public string Email { get; set; }
            public string Senha { get; set; }
        }

        public class UserExpenseDto
        {
            public int Id { get; set; }
            public decimal Budget { get; set; }
            public string Description { get; set; }
            public decimal Value { get; set; }
            public string Goal { get; set; }
            public DateTime Date { get; set; }
        }

        public class UserResponseDto
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }

            public List<UserExpenseDto> Expenses { get; set; }
        }
    
    }
    
}