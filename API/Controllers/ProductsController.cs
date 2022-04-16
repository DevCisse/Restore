using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        
        public ProductsController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public  async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            
            var query =   _context.Products
            .Sort(productParams.OrderBy)   
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands,productParams.Types)
            .AsQueryable();

            #region old swith statement
                   // switch (orderBy)
            // {
            //     case "price":
            //     query =  query.OrderBy( p => p.Price);
            //     break;

            //     case "priceDesc":
            //     query = query.OrderByDescending(p => p.Price);
            //     break;

            //     default:
            //     query = query.OrderBy(p => p.Name);
            //     break;
            // }
            #endregion


           // return await query.ToListAsync();

           var products = await PagedList<Product>.ToPagedList(query,productParams.PageNumber,productParams.PageSize);

        //    Response.Headers.Add("pagination",JsonSerializer.Serialize(products.MetaData,new JsonSerializerOptions{
        //        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        //    }));
          Response.AddPaginationHeader(products.MetaData);



           return products;

           
        }
    
        [HttpGet("{id}")]
        public  async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await  _context.Products.FindAsync(id);

            if(product is null) return NotFound();

            return product;
       
        }


        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //with Iaction we get everything in Action Result except for type safety i.e return type

            var  brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var  types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();


            return Ok(new {brands,types});
        }
        
    }
}