namespace NovaWear.Api.Models
{
    public class Product
    {
        // Unique identifier
        public int Id { get; set; }

        // Product name
        public string Name { get; set; } = "";

        // Product price
        public decimal Price { get; set; }

        // Product description
        public string Description { get; set; } = "";

        // Image URL (optional)
        public string? Image { get; set; }

        // Product tags
        public List<string> Tags { get; set; } = [];
    }
}
