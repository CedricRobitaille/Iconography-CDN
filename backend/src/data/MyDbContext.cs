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


    public DbSet<Icon> Icons => Set<Icon>();
    public DbSet<Company_Icon> Company_Icons => Set<Company_Icon>();


    public DbSet<Tag> Tags => Set<Tag>();
    public DbSet<Icon_Tag> Icon_Tags => Set<Icon_Tag>();



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Company / User relationship
      modelBuilder.Entity<Company>()
          .HasOne(c => c.Owner)
          .WithMany()
          .HasForeignKey(c => c.OwnerId)
          .OnDelete(DeleteBehavior.Cascade);

      // User / Company relationship
      modelBuilder.Entity<User>()
          .HasOne(u => u.Company)
          .WithMany(c => c.Employees)
          .HasForeignKey(u => u.CompanyId)
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