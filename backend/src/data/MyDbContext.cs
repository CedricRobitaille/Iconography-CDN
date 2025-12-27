using Microsoft.EntityFrameworkCore;
using Backend.Models;
using System.Security.Authentication;

namespace Backend.Data
{
  public class MyDbContext : DbContext
  {
    public MyDbContext(DbContextOptions<MyDbContext> options)
      : base(options) {}

    // Each DbSet is a new table in the DB 
    public DbSet<User> Users => Set<User>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Company_Member> Company_Members => Set<Company_Member>();
    public DbSet<Icon> Icons => Set<Icon>();
    public DbSet<Company_Icon> Company_Icons => Set<Company_Icon>();

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
      modelBuilder.Entity<Company_Member>()
          .HasOne(cm => cm.User)
          .WithMany()
          .HasForeignKey(cm => cm.UserId)
          .OnDelete(DeleteBehavior.Cascade);

      // Company / Company_Members relationship
      modelBuilder.Entity<Company_Member>()
          .HasOne(cm => cm.Company)
          .WithMany()
          .HasForeignKey(cm => cm.CompanyId)
          .OnDelete(DeleteBehavior.Cascade);

      // Icon Relationships
      modelBuilder.Entity<Company_Icon>(entity =>
      {
        // Company → Company_Icon (unidirectional, cascade)
        entity.HasOne(ci => ci.Company)
            .WithMany()
            .HasForeignKey(ci => ci.CompanyId)
            .OnDelete(DeleteBehavior.Cascade);

        // Icon → Company_Icon (unidirectional, cascade)
        entity.HasOne(ci => ci.Icon)
            .WithMany() // no navigation on Icon either
            .HasForeignKey(ci => ci.IconId)
            .OnDelete(DeleteBehavior.Cascade);

        // User → Company_Icon (no cascade)
        entity.HasOne(ci => ci.User)
            .WithMany()
            .HasForeignKey(ci => ci.UserId)
            .OnDelete(DeleteBehavior.Restrict);
      });
    }
  }
}