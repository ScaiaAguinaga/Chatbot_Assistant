using System.Text.Json;
using NovaWear.Api.Models;

namespace NovaWear.Api.Data
{
    public interface IProductRepository
    {
        // Returns all products
        IReadOnlyList<Product> GetAll();

        // Returns a product by ID
        Product? GetById(int id);
    }

    public class JsonProductRepository : IProductRepository
    {
        private readonly List<Product> _products;

        public JsonProductRepository(IHostEnvironment env)
        {
            // Path to products.json
            var path = Path.Combine(env.ContentRootPath, "Data", "products.json");

            // If file missing, set empty list
            if (!File.Exists(path))
            {
                _products = [];
                return;
            }

            var json = File.ReadAllText(path);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            // Deserialize or fall back to empty list
            _products = JsonSerializer.Deserialize<List<Product>>(json, options) ?? [];
        }

        // Returns all products
        public IReadOnlyList<Product> GetAll() => _products;

        // Returns first matching product or null
        public Product? GetById(int id) =>
            _products.FirstOrDefault(p => p.Id == id);
    }
}
