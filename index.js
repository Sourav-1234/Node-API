const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
app.use(cors());
const app = express();
const port = 3000;

app.use(express.static('static'));z

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


// Problem-1 -Get Cart Total 

app.get('/cart-total',(req,res) =>{
  let newItemPrice=parseFloat(req.query.newItemPrice);

  let cartTotal=parseFloat(req.query.cartTotal);
  let totalPrice =newItemPrice+ cartTotal;
  res.send(totalPrice.toString())
})




//Problem -2 - Discount Applied 

app.get('/membership-discount' ,(req,res)=>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';  
  
  const discountPercentage = 10;
  if(isMember){
    cartTotal =cartTotal - (cartTotal * discountPercentage / 100);
  }
  
  res.send(cartTotal.toString())
})



//Problem -3 -Calculate Tax

app.get('/calculate-tax',(req,res)=>{
   
  let cartTotal=parseFloat(req.query.cartTotal);
  const taxRate = 0.05; 
   
  let taxAmount=cartTotal*taxRate;
  res.send(taxAmount.toString())

})


//Problem -4 - Estimate Delivery 

app.get('/estimate-delivery',(req,res) =>{
  let shippingMethod=req.query.shippingMethod;
  let distance=parseFloat(req.query.distance);
  let deliveryDays;

  if(shippingMethod.toLowerCase() === 'standard'){
    deliveryDays=Math.ceil(distance/50);
   }
 if(shippingMethod.toLowerCase()=== 'express'){
  deliveryDays=Math.ceil(distance/100);
  }
res.send(deliveryDays.toString());
})




//Problem -5 -Shipping Cost based on Weight 
app.get('/shipping-cost', (req, res) => {

  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;

  res.send(shippingCost.toString());

})



//Problem -6 - Calculate Loyalty Points 
app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString())
})











app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
