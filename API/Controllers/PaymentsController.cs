using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly PaymentService _paymentService;
        private readonly IConfiguration _configuration;
        public PaymentsController(PaymentService paymentService,StoreContext context,IConfiguration configuration )
        {
            _configuration = configuration;
            _paymentService = paymentService;
            _context = context;
            
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            var basket = await _context.Baskets
            .RetreiveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

            if (basket == null)
            {
                return NotFound();
            }

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

            if(intent == null)
            {
                return BadRequest(new ProblemDetails{Title = "Problem creating payment intent"});
            }


            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

             _context.Update(basket) ;
             
             var result = await _context.SaveChangesAsync() > 0;

             if(!result)
             {
                 return BadRequest(new ProblemDetails {Title = "Problem updating basket with intent"});
             }

             return basket.MapBasketDto();




        }


        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
             var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            // try
            // {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], _configuration["StripeSettings:WhSecret"]);



                var charge  =(Charge)stripeEvent.Data.Object;

                var order = await _context.Orders.FirstOrDefaultAsync(x =>x.PaymentIntentId == charge.PaymentIntentId);

                if(charge.Status == "succeeded")
                {
                    order.OrderStaus = OrderStatus.PaymentReceived;
                }

                await _context.SaveChangesAsync();

                return new EmptyResult();
        }
        
    }
}