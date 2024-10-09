const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);


function loadFood(){
  loadcontent();
}

function loadcontent(){
let btnRemove=document.querySelectorAll('.fa-trash-o');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });
 //product Item change Event
 let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

 let cartBtns=document.querySelectorAll('.add-cart')
cartBtns.forEach((btn)=>{
  btn.addEventListener('click',addcart);
 }); 
 updateTotal();
}
function removeItem(){
  if(confirm('Are you sure to Remove')){
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemlist=itemlist.filter(el=>el.title!=title);
 this.parentElement.remove(); 
 loadcontent();
   }
  }
function changeQty(){
    if(isNaN(this.value) || this.value<1){
      this.value=1;
    }
    loadcontent();
  }
  
let itemlist=[];
function addcart(){
 let food=this.parentElement;
 let title=food.querySelector('.food-title').innerHTML;
 let price=food.querySelector('.food-price').innerHTML;

 let newProduct={title,price}
  if(itemlist.find((el)=>el.title==newProduct.title))
  {
    alert("Product Already in your Cart");
    return;
  }else{
    itemlist.push(newProduct);
  }
 let newProductElement= createCartProduct(title,price);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
  loadcontent();
}
function createCartProduct(title,price){
  return`
  <div class="cart-box">
      <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>  
        <input type="number" value="1" class="cart-quantity">   
      </div>
      <i class="fa fa-trash-o"></i>
    </div>`;
}
function updateTotal()
{
  const cartitems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartitems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

  });

  totalValue.innerHTML='Rs.'+total;


  const cartCount=document.querySelector('.totalquantity');
  let count=itemlist.length;
  cartCount.innerHTML=count;



}
