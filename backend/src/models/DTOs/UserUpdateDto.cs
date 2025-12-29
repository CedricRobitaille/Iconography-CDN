public class UserPatchDto
{
  public string? Name { get; set; }
  public string? Email { get; set; }
  public string? Password { get; set; }
  public int? Role { get; set; }
}

public class UserPutDto
{
  public string Name { get; set; } = null!;
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;
  public int Role { get; set; }
}