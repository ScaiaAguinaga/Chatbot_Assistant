using NovaWear.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = "_allowedOrigins";

// CORS configuration for the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOrigins,
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// OpenAPI support
builder.Services.AddOpenApi();

// Controller support
builder.Services.AddControllers();

// Register product repository
builder.Services.AddSingleton<IProductRepository, JsonProductRepository>();

var app = builder.Build();

// Development-only OpenAPI
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

app.UseCors(allowedOrigins);

// Map controllers
app.MapControllers();

app.Run();
