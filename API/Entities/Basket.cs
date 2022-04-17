using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Numerics;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new ();

        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }

        public void AddItem(Product product, int quantity)
        {
            if(Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem{Product = product,Quantity = quantity});
            }

            var existingItem = Items.FirstOrDefault(item  => item.ProductId == product.Id);

            if(existingItem is not null)
            {
                existingItem.Quantity +=quantity;
            }


        }

        public void RemoveItem(int ProductId,int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == ProductId);

            if(item is  null) return ;
            item.Quantity -= quantity;
            // {
            //     item.Quantity -= quantity;
            // }
            //should be the last
            if(item.Quantity == 0)
            {
                Items.Remove(item);
            }
        }


    }
}