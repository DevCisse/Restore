// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using API.Data;
// using API.DTOs;
// using API.Entities;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using SQLitePCL;

// namespace API.Controllers
// {
//     public class BasketController : BaseApiController
//     {
//         private readonly StoreContext _context;

//         public BasketController(StoreContext context)
//         {
//             _context = context;
//         }


//         [HttpGet(Name ="GetBasket")]
//         public async Task<ActionResult<BasketDto>> GetBasket()
//         {

//              var buyerId = Request.Cookies["buyerId"];
//             var basket = await RetrieveBasket();

//             if (basket is null) return NotFound();

//             return MapBasketToDto(basket);
//         }

      

//         [HttpPost]
//         public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
//         {

//              var buyerId = Request.Cookies["buyerId"];

//             var basket = await RetrieveBasket();

//             if (basket is null) basket = CreateBasket();
//             //get basket || create basket
//             // if user does not have basket create basket
//             //get product

//             var product = await _context.Products.FindAsync(productId);

//             if (product == null) return NotFound();

//             basket.AddItem(product, quantity);

//             var result = await _context.SaveChangesAsync() > 0;

//             if (result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));
//             //add item to the basket
//             //save changes
//             return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
//         }



//         [HttpDelete]
//         public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
//         {
//             //get basket

           
//            var basket = await RetrieveBasket();

//            if(basket is null) return NotFound();

//             // var product  = basket.Items.FirstOrDefault(x =>x.Product.Id == productId);

//             // if(product.Quantity == 0)
//             // {
//             //     basket.Items.Remove(product);
//             // }

//             // product.Quantity -= quantity;

//             basket.RemoveItem(productId,quantity);

//             var result = await _context.SaveChangesAsync() > 0;
           
//             if(result) return Ok();
//             //remove item or reduce qunatity
//             //save changes
//             return BadRequest(new ProblemDetails{Title = "Problem removing item from basket"});
//         }


//         private async Task<Basket> RetrieveBasket()
//         {

//             var buyerId = Request.Cookies["buyerId"];
//             return await _context.Baskets
//                         .Include(i => i.Items)
//                         .ThenInclude(p => p.Product)
//                         .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
//         }

//         private Basket CreateBasket()
//         {
//             var buyerId = Guid.NewGuid().ToString();
//             var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30), };

//             Response.Cookies.Append("buyerId", buyerId, cookieOptions);

//             var basket = new Basket { BuyerId = buyerId };
//             _context.Baskets.Add(basket);

//             return basket;
//         }

//           private BasketDto MapBasketToDto(Basket basket)
//         {
//             return new BasketDto
//             {
//                 Id = basket.Id,
//                 BuyerId = basket.BuyerId,
//                 Items = basket.Items.Select(item => new BasketItemDto
//                 {
//                     ProductId = item.ProductId,
//                     Name = item.Product.Name,
//                     Price = item.Product.Price,
//                     PictureUrl = item.Product.PictureUrl,
//                     Brand = item.Product.Brand,
//                     Quantity = item.Quantity,
//                     Type = item.Product.Type,
//                 }).ToList()

//             };
//         }



//     }
// }



using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            
            return MapBasketToDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {

            var buyerId = Request.Cookies["buyerId"];
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if (product == null) return BadRequest(new ProblemDetails{Title = "Product not found"});
            
            basket.AddItem(product, quantity);
            
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"});
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}