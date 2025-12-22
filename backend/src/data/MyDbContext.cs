using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
  public class MyDbContext : DbContext
  {
    public MyDbContext(DbContextOptions<MyDbContext> options)
      : base(options) {}

    // Each DbSet is a new table in the DB 
    public DbSet<User> Users => Set<User>();
    public DbSet<Icon> Icons => Set<Icon>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // Configure how the <item> entity maps to the DB table
      modelBuilder.Entity<User>()
        .Property(p => p.Price) // Property defines which property of the entity we want to configure
        .HasPrecision(10, 2); // This specifies how the data is configured before placing in the table (ie: 10 digits and 2 decimal places)
    }
  }
}