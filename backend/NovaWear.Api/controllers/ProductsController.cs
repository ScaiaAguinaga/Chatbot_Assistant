using Microsoft.AspNetCore.Mvc;
using NovaWear.Api.Models;

namespace NovaWear.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // Temporary in-memory list of products
        private static readonly List<Product> Products = new()
        {
            new Product
            {
                Id = 1,
                Name = "NovaWear Tech Hoodie",
                Price = 89.99m,
                Description = "Lightweight thermal-lined hoodie with reflective accents and a modern, tapered fit.",
                Image = "/products/Placeholder.jpg",
                Tags = ["hoodie", "fall", "streetwear", "athleisure", "layering"]
            },
            new Product
            {
                Id = 2,
                Name = "AeroShell Rain Jacket",
                Price = 129.99m,
                Description = "Waterproof, breathable shell with taped seams and packable hood for unexpected downpours.",
                Image = null,
                Tags = ["jacket", "rain", "spring", "outdoor", "performance" ]
            }
            // TODO: Add the rest of your items later
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll()
        {
            return Ok(Products);
        }

        [HttpGet("{id:int}")]
        public ActionResult<Product> GetById(int id)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            return Ok(product);
        }
    }
}
