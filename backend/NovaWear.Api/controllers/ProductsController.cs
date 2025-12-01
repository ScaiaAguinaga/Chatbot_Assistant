using Microsoft.AspNetCore.Mvc;
using NovaWear.Api.Data;
using NovaWear.Api.Models;

namespace NovaWear.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;

        // Inject repository
        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
        }

        // Get all products
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll()
        {
            var products = _repo.GetAll();
            return Ok(products);
        }

        // Get product by ID
        [HttpGet("{id:int}")]
        public ActionResult<Product> GetById(int id)
        {
            var product = _repo.GetById(id);
            if (product is null) return NotFound();
            return Ok(product);
        }
    }
}
