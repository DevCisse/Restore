export  function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }


  export  function currencyFormatter(price : number) {
   return '$' + (price/100).toFixed(2);
  }


  
  
export function payFunction(email,amount)
{

}


  export function payWithPaystack(e,email,amount) {
    e.preventDefault();
    let handler = PaystackPop.setup ({
      key: 'pk_test_997deb30eb541fdd600281bc38faa8549e139bd6', // Replace with your public key
     // email:( document.getElementById("email-address") as HTMLInputElement).value,
      email:email,
      amount:amount,
      //amount: parseInt((document.getElementById("amount") as HTMLInputElement).value) * 100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        //alert('Window closed.');
      },
      callback: function(response){
        // let message = 'Payment complete! Reference: ' + response.reference;
        // alert(message);

        fetch(process.env.REACT_APP_API_URL,{
          method  : 'POST',
          headers :{'content-type':'application/json'},
          body: JSON.stringify({

          })
        })

      }
    });
    handler.openIframe();
  }