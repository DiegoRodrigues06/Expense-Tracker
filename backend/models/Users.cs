namespace backend.models
{
    public class Users
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<Expense> Expenses { get; set; } 
}
}