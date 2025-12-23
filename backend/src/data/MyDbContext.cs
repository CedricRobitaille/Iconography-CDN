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
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Company_Members> Company_Members => Set<Company_Members>();
    public DbSet<Icon> Icons => Set<Icon>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // User / Company relationship
      modelBuilder.Entity<Company>()
          .HasOne(c => c.User)
          .WithMany()
          .HasForeignKey(c => c.UserId)
          .OnDelete(DeleteBehavior.Cascade);

      // User / Company_Members relationship
      modelBuilder.Entity<Company_Members>()
          .HasOne(cm => cm.User)
          .WithMany()
          .HasForeignKey(cm => cm.UserId)
          .OnDelete(DeleteBehavior.Cascade);

      // Company / Company_Members relationship
      modelBuilder.Entity<Company_Members>()
          .HasOne(cm => cm.Company)
          .WithMany()
          .HasForeignKey(cm => cm.CompanyId)
          .OnDelete(DeleteBehavior.Cascade);
    }
  }
}