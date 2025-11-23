namespace backend.models
{
    public class Users
{   
    // o EF interpreta o Id e ja o coloca como auto increment
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; }
    public string Senha { get; set; }

    // 1 usuário tem varias expenses
    public List<Expense> Expenses { get; set; } 
}
}