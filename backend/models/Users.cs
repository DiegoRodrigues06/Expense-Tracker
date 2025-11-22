namespace backend.models
{
    public class Users
{
    public int Id { get; set; } // tem q ser public se não o ef não reconhece
    public string Name { get; set; } = string.Empty;

    public List<Expense> Expenses { get; set; } 
}
}