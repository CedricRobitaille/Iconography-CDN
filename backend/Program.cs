// How to run
// 1. `dotnet build
// 2. `dotnet run

using Microsoft.EntityFrameworkCore; // Import EF for UseMySql, AddDbContext, and DbContextOptions
using Backend.Data; // Import the namespace where the DbContext resides
using DotNetEnv;

Env.Load();

// Application Builder, loads json, env, etc
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<MyDbContext>(options => // Enables UserController from MyDbContext
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))); // Tell SF which DB to use and server version


builder.Services.AddControllers(); // MVC Controller Support
builder.Services.AddEndpointsApiExplorer(); // Metadata for API endpoints for swagger
builder.Services.AddSwaggerGen(); // Generates the swagger json


var app = builder.Build();  // Builds the application

// Create tables if non-existing
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    db.Database.Migrate();
}

// Swagger middleware to give the API a frontend.
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run(); // Starts the web server