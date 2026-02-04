var loggedIn = JSON.parse(localStorage.getItem("LoggedIn"))

if (loggedIn == false) {
    location.href = "../login.html"
}
if (loggedIn == false) {
    localStorage.setItem("counter", 0);
}


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

console.log(products)
if (localStorage.getItem("counter") === null) {  
        localStorage.setItem("counter", 0);
}
if (localStorage.getItem("totalprice") === null) {  
        localStorage.setItem("totalprice", 0);
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
if (localStorage.getItem("w-counter") === null) {  
        localStorage.setItem("w-counter", 0);
}
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

// document.getElementById("cartCounter").innerHTML=getloc("counter");
if(getloc("w-counter")==0){
   empty();
}
for (let i = 1; i <= products.length; i++) {
    if(localStorage.getItem(`wish-${i}`) == "0")continue;
    else{
        var wishItems=document.getElementById("wish-items");
        var wishItem =document.createElement("div");
        wishItem.id="wish-item-"+i;
        wishItem.className="wish-item";
        wishItem.innerHTML=
        `
                <img src="${products[i-1].images[0]}" alt="${products[i-1].title}" class="item-image"
                onclick="window.location.href='ProductDetails.html?id=${i}'"
                >
                <div class="item-details" id="item-${i}">
                    <div class="item-name">${products[i-1].title}</div>
                    <br>
                    <div class="item-category">${products[i-1].category}</div>

                </div>  
                
                <div class="item-pricing">
                    <div class="unit-price">$${products[i-1].price} </div>
                </div>
                 <div id="addCart${i}">
                                
                 </div>
                <img src="../images/trashcan.png" onclick="removeel('${i}')"class="trash-icon" >
                       
            `
            wishItems.append(wishItem);
            renderCartBtn(i)
              
}
}

function renderCartBtn(i){
    addCart=document.getElementById(`addCart${i}`)
    let c = getloc(i);

    if (c === 0) {
        addCart.innerHTML = `
            <div class="quantity-controls" onclick="increase(${i})" style="cursor:pointer">
                Add to Cart
            </div>
        `;

        addCart.style.justifyContent = "center";  
    } else {
        addCart.innerHTML = `
                <div class="quantity-controls">
                                <button class="quantity-btn" onclick="decrease('${i}')">−</button>
                                <span class="quantity" id="qty-${i}">${c}</span>
                                <button class="quantity-btn" onclick="increase('${i}')">+</button>
                </div>
        `;
        addCart.style.justifyContent = "space-between"; 
    }

}
function increase(id) {
    let c = getloc(id) + 1;
    localStorage.setItem(id, c);
    incount();
    renderCartBtn(id); 
    document.getElementById("cartCounter").innerHTML=getloc("counter");

}

function decrease(id) {
    let c = getloc(id) - 1;
    if (c < 0) c = 0;
    localStorage.setItem(id, c);
    decount();
    renderCartBtn(id);
    document.getElementById("cartCounter").innerHTML=getloc("counter");

}

function getloc(key) {
    return parseInt(localStorage.getItem(key)) || 0;
}

function incount() {
    let c = getloc("counter") + 1;
    localStorage.setItem("counter", c);
}

function decount() {
    let c = getloc("counter") - 1;
    if (c < 0) c = 0;
    localStorage.setItem("counter", c);
}
function removeel(i){
    document.getElementById(`wish-item-${i}`).style.display = "none";
    localStorage.setItem(`wish-${i}`, 0); 
    let c=getloc("w-counter");
    c--;
    localStorage.setItem("w-counter", c);
    if(getloc("w-counter")==0){
     empty();
     } 
}

function empty(){
     document.getElementById("order").innerHTML = `
    <center>
        <h1 style="padding-top: 100px;">
            Your wish List is empty
        </h1>
         <button class="view-products" style="margin:50px">
                <a href="products.html">Continue shoping ?</a>
            </button>
    </center>
`;

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