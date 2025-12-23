public class AccountCreationDto
{
  public UserDto User { get; set; } = null!;
  public CompanyDto Company { get; set; } = null!;
}

public class UserDto
{
  public string Name { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
}

public class CompanyDto
{
  public string Name { get; set; } = string.Empty;
  public int Type { get; set; }
}