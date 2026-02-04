if (localStorage.getItem("products")==null) {
var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://dummyjson.com/products");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var products = JSON.parse(xhr.responseText);

            localStorage.setItem("products", JSON.stringify(products));

        }
    };

xhr.send();
}
var products = JSON.parse(localStorage.getItem("products"));
products=products.products;

if (localStorage.getItem("counter") === null) {  
        localStorage.setItem("counter", 0);
}
if (localStorage.getItem("LoggedIn") === null) {  
        localStorage.setItem("LoggedIn", false);
}
if (localStorage.getItem("UserName") === null) {  
        localStorage.setItem("UserName", "user");
}

for (let i = 1; i <= products.length; i++) {
    if (localStorage.getItem(i) === null) {  
        localStorage.setItem(i, 0);
    }
}
for (let i = 1; i <= products.length; i++) {
    if (localStorage.getItem(`wish-${i}`) === null) {  
        localStorage.setItem(`wish-${i}`, 0);
    }
}
if (localStorage.getItem("totalprice") === null) {  
        localStorage.setItem("totalprice", 0);
}
if (localStorage.getItem("w-counter") === null) {  
        localStorage.setItem("w-counter", 0);
}
var loggedIn = JSON.parse(localStorage.getItem("LoggedIn"))
let logInLink = document.querySelector(".log-in")
let logOutLink = document.querySelector(".log-out")

var userName = localStorage.getItem("UserName")
if (loggedIn) {
    logInLink.style.display = "none"
    document.querySelector(".user-name").innerHTML = userName
}
else{
    logOutLink.style.display = "none"
    localStorage.setItem("counter", 0);
    localStorage.setItem("LoggedIn", false);
    localStorage.setItem("UserName", "user");


    for (let i = 1; i <= products.length; i++) {
            localStorage.setItem(i, 0);
    }
    for (let i = 1; i <= products.length; i++) {
            localStorage.setItem(`wish-${i}`, 0);
    }
    localStorage.setItem("totalprice", 0);
    localStorage.setItem("w-counter", 0);
   location.href = "../login.html"

}
document.getElementById("cartCounter").innerHTML=getloc("counter");

// var totalPrice=124.9;

/////////////////////////////////////////////
    // document.getElementById("cartCounter").innerHTML=getloc("counter");
//     var loggedIn = JSON.parse(localStorage.getItem("LoggedIn"))
// if(!loggedIn){
//     empty2();
    
//             localStorage.setItem("counter", 0);
//             localStorage.setItem("LoggedIn", false);
//             localStorage.setItem("UserName", "user");

//     for (let i = 1; i <= products.length; i++) {
//             localStorage.setItem(i, 0);
//     }
//     for (let i = 1; i <= products.length; i++) {
//             localStorage.setItem(`wish-${i}`, 0);
//     }
//             localStorage.setItem("totalprice", 0);
//             localStorage.setItem("w-counter", 0);
// }
// else{
var counter = JSON.parse(localStorage.getItem("counter")) || 0
if(getloc("counter")==0){
   empty();
}
else{

for (let i = 1; i <= products.length; i++) {
    if (localStorage.getItem(i) == "0") continue;
    else{
        var cartItems=document.getElementById("cart-items");
        var cartItem =document.createElement("div");
        cartItem.id="cart-item-"+i;
        cartItem.className="cart-item";
        cartItem.innerHTML=
        `
        
                        <img src="${products[i-1].images[0]}" alt="${products[i-1].title}" class="item-image"
                        onclick="window.location.href='ProductDetails.html?id=${i}'"
                        >
                        <div class="item-details" id="item-${i}">
                            <div class="item-name">${products[i-1].title}</div>
                            <div class="item-category">${products[i-1].category}</div>
                            <div class="wish-qty">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="decrease('${i}')">−</button>
                                <span class="quantity" id="qty-${i}">${getloc(i)}</span>
                                <button class="quantity-btn" onclick="increase('${i}')">+</button>
                            </div>
                             <img src="../images/empty.png" class="heart" onclick="wish(this,${i})" id="wish${i}">
                            </div>

                        </div>  
                        <div class="item-pricing">
                            <div class="unit-price">$${products[i-1].price} each</div>
                            <div class="item-price" id="${i}-price">$${(products[i-1].price*parseFloat(getloc(i))).toFixed(2)}</div>
                        </div>
                        <img src="../images/trashcan.png" onclick="deleteItem('${i}')"class="trash-icon" >
                       
            `

            cartItems.append(cartItem);
            calculateTotal() 
            if(localStorage.getItem(`wish-${i}`) == "1"){
                document.getElementById(`wish${i}`).src="../images/filled.png";
            }


    }
}
}
// }
function deleteItem(index){
    let c = getloc(index);
    c = Number(c) ;
    // var totalprice=getloc("totalprice");
    // totalprice=parseFloat(totalprice);
    // totalprice-=(c*parseFloat(products[index-1].price));
    while(c>0){
        decount();
        c--;
    }
    localStorage.setItem(index, 0);    
    calculateTotal()
    // localStorage.setItem("totalprice", totalprice);
    // document.getElementById("subtotal").innerText = "$"+totalprice.toFixed(2);
    // document.getElementById("tax").innerText = "$"+(totalprice*0.1).toFixed(2);
    // document.getElementById("total").innerText = "$"+(totalprice+totalprice*0.1).toFixed(2);
    document.getElementById(`cart-item-${index}`).style.display = "none";
}
function increase(index) {
    let c = getloc(index);
    c = Number(c) + 1;
    localStorage.setItem(index, c);
    // var totalprice=getloc("totalprice");
    //     totalprice=parseFloat(totalprice);
    // totalprice+=(parseFloat(products[index-1].price));
    incount();
    calculateTotal();

    // localStorage.setItem("totalprice", totalprice);
    document.getElementById(`qty-${index}`).innerText = c;
    // document.getElementById("subtotal").innerText = "$"+totalprice.toFixed(2);
    // document.getElementById("tax").innerText = "$"+(totalprice*0.1).toFixed(2);
    // document.getElementById("total").innerText = "$"+(totalprice+(totalprice*0.1)).toFixed(2);
    document.getElementById(`${index}-price`).innerText="$"+(products[index-1].price*c).toFixed(2);
    console.log("c="+c +"\n"+"total= "+totalprice);


}
function decrease(index) {
        let c = getloc(index);
        c = parseFloat(c) - 1;
        localStorage.setItem(index, c);
        // var totalprice=getloc("totalprice");
        // totalprice=parseFloat(totalprice);
        decount();
        if(c==0){
            deleteItem(index);
        }
        else{
        // totalprice-=(parseFloat(products[index-1].price));
        // localStorage.setItem("totalprice", totalprice);
        calculateTotal()
        document.getElementById(`qty-${index}`).innerText = c;
        // document.getElementById("subtotal").innerText = "$"+totalprice.toFixed(2);
        // document.getElementById("tax").innerText = "$"+(totalprice*0.1).toFixed(2);
        // document.getElementById("total").innerText = "$"+(totalprice+totalprice*0.1).toFixed(2);
        document.getElementById(`${index}-price`).innerText="$"+(products[index-1].price*c).toFixed(2);

        document.getElementById(`qty-${index}`).innerText = c;
        }
    console.log("c="+c +"\n"+"total= "+totalprice);
}
function getloc(name) {
    return parseFloat(localStorage.getItem(name)) || 0;
}
function incount(){
    var c=getloc("counter");
    c=parseFloat(c)+1
    localStorage.setItem("counter", c);
    document.getElementById("cartCounter").innerHTML=getloc("counter");

    }
function decount(){
    var c=getloc("counter");
    c=parseFloat(c)-1
    localStorage.setItem("counter", c);
    document.getElementById("cartCounter").innerHTML=getloc("counter");

    if(c==0){
    empty();
}
}
function gostore(){
    window.location.href="b1.html"
} 

function calculateTotal() {
    let totalCents = 0;
    for (let i = 1; i <= products.length; i++) {
        let qty = getloc(i);
        if (qty > 0) {
            totalCents += qty * Math.round(products[i-1].price * 100);
        }
    }
    let total = totalCents / 100;
    localStorage.setItem("totalprice", total);
    updateTotals(total);
}
function updateTotals(total){
    document.getElementById("subtotal").innerText ="$"+total.toFixed(2);
    document.getElementById("tax").innerText="$"+(total*0.1).toFixed(2);
    document.getElementById("total").innerText ="$"+(total+total*0.1).toFixed(2);
    document.getElementById("cartCounter").innerHTML=getloc("counter");

}
function wish(el,index){
    var value=getloc(`wish-${index}`);
    el.classList.toggle("active"); 
    if(value=="0"){
        el.src="../images/filled.png"
        localStorage.setItem(`wish-${index}`, 1);
         let c=getloc("w-counter");
        c++;
        localStorage.setItem("w-counter", c);
    } else {
        el.src="../images/empty.png"
        localStorage.setItem(`wish-${index}`, 0);
         let c=getloc("w-counter");
        c--;
        localStorage.setItem("w-counter", c);
    }
}
function empty(){
     document.getElementById("order").innerHTML=
    `
    <center>
    <h1 style="padding-top: 100px;">
       Your cart is empty 
       </h1>
       <button class="view-products" style="margin:50px">
                <a href="products.html">Continue shoping ?</a>
            </button>
       </center>
    `
}


logOutLink.addEventListener("click",function(e){
e.preventDefault()


    localStorage.setItem("counter", 0);
    localStorage.setItem("LoggedIn", false);
    localStorage.setItem("UserName", "user");


    for (let i = 1; i <= products.length; i++) {
            localStorage.setItem(i, 0);
    }
    for (let i = 1; i <= products.length; i++) {
            localStorage.setItem(`wish-${i}`, 0);
    }
    localStorage.setItem("totalprice", 0);
    localStorage.setItem("w-counter", 0);
    
    location.href = "./login.html"
})