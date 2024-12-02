let openShopping=document.querySelector('.shopping');
let closeShopping=document.querySelector('.closeShopping');
let list=document.querySelector('.list');
let listCart=document.querySelector('.listCart');
let body=document.querySelector('body');
let total=document.querySelector('.total');
let quantity=document.querySelector('.quantity');

openShopping.addEventListener('click',()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click',()=>{
    body.classList.remove('active')
})

let products=[
    {
        id:0,
        name:'CUPCAKE',
        image:'cupcake.png',
        price:5000,
    },
    {
        id:1,
        name:'BOTTLES',
        image:'image2.jpeg',
        price:1500,
    },
    {
        id:2,
        name:'GROCERIES',
        image:'image3.png',
        price:50000,
    },
    {
        id:3,
        name:'DOUGHNUTS',
        image:'image4.png',
        price:2500,
    },
    {
        id:4,
        name:'WEAVON',
        image:'Weavon.jpg',
        price:250000,
    },
    {
        id:5,
        name:'SLIPPERS HEELS',
        image:'images.jpeg',
        price:4500,
    }
]

let listCarts=[];
function initApp(){
products.forEach((value,key)=>{
    let newDiv=document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML=`
    <img src="${value.image}"/>
    <div class="title">${value.name}</div>
    <div class="price">₦${value.price.toLocaleString()}</div>
    <button onclick="addToCart(${key})">Add To Cart</button>
    `;
    list.appendChild(newDiv);
})
}

initApp();

function addToCart(key){
    if(listCarts[key]==null){
        listCarts[key]=JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity= 1;
    }
    reloadCart();
}

function reloadCart(){
    listCart.innerHTML='';
    let count=0;
    let totalPrice=0;
    listCarts.forEach((value,key)=>{
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;

    if(value != null){
        let newDiv=document.createElement('li');
        newDiv.innerHTML=`
        <div><img src="${value.image}"/></div>
        <div>${value.name}</div>
        <div>₦${value.price.toLocaleString()}</div>
        <div>${value.quantity}</div>
        <div>
        <button onclick="changeQuantity(${key}, ${value.quantity -1})">-</button>
           <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${value.quantity +1})">+</button>
        </div>
        `
        listCart.appendChild(newDiv);
    }
    })
    total.innerText=totalPrice.toLocaleString();
    quantity.innerText=count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCarts[key];
    }else{
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCart();
}