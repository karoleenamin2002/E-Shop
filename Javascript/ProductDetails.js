var loggedIn = JSON.parse(localStorage.getItem("LoggedIn"))
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

if (localStorage.getItem("counter") === null) {  
        localStorage.setItem("counter", 0);
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
   

}
document.getElementById("cartCounter").innerHTML=getloc("counter");

let params = new URLSearchParams(window.location.search);
let id = params.get("id");
id=Number(id);
console.log(products);
console.log(id);

var mainImg = document.getElementById("mainImg");
mainImg.innerHTML = `
  <img class="PImg" src="${products[id-1].images[0]}">
`;
var title = document.getElementById("first");
title.style.display = "flex";
title.style.alignItems = "center";
if (loggedIn){

if (localStorage.getItem(`wish-${id}`) == "1") {
    title.innerHTML = `
        <h1 style="margin:0;">${products[id-1].title}</h1>
        <img 
            src="../images/filled.png"
            style="width:30px;height:30px;cursor:pointer;margin-left:auto;"
            onclick="wish(this, ${id})"
        >
    `;
} else {
    title.innerHTML = `
        <h1 style="margin:0;">${products[id-1].title}</h1>
        <img 
            src="../images/empty.png"
            style="width:30px;height:30px;cursor:pointer;margin-left:auto;"
            onclick="wish(this, ${id})"
        >
    `;
}

}
else {
    title.innerHTML = `
        <h1 style="margin:0;">${products[id-1].title}</h1>
         <img 
            src="../images/empty.png"
            style="width:30px;height:30px;cursor:pointer;margin-left:auto;"
        >
    `;

    title.innerHTML = `
        <h1 style="margin:0;">${products[id-1].title}</h1>
         <img 
            src="../images/empty.png"
            style="width:30px;height:30px;cursor:pointer;margin-left:auto;"
        >
    `;

}

// title.innerText = products[id-1].title;

var price =document.getElementById("price");
price.innerText = "$ "+products[id-1].price;

var des =document.getElementById("des");
des.innerText = products[id-1].description;

var pId =document.getElementById("pId");
pId.innerText = id;

var cat =document.getElementById("cat");
cat.innerText = products[id-1].category;
var rate =document.getElementById("rate");
rate.innerText = products[id-1].rating+" ⭐";

var addCart=document.getElementById("addCart");

renderCartBtn(id);

function renderCartBtn(id) {
    let c = getloc(id);
    if (c === 0) {
        addCart.innerHTML = `
            <div class="qty1" onclick="increase(${id})" style="cursor:pointer">
                 Add to Cart
            </div>
        `;
        // addCart.style.display = "flex";
        // addCart.style.alignItems = "center";       
        addCart.style.justifyContent = "center";  
        // addCart.style.backgroundColor = "#2ecc71";
        // addCart.style.color = "white";
        // addCart.style.borderRadius = "10px";
        // addCart.style.height = "50px";
        // addCart.style.padding = "0 8px"; 
    } else {
        addCart.innerHTML = `
                <button class="quantity-btn" onclick="decrease(${id})">−</button>
                <span class="quantity" id="qty-id">${c}</span>
                <button class="quantity-btn" onclick="increase(${id})">+</button>
        `;
        addCart.style.justifyContent = "space-between"; 
    }
}

function increase(id) {
    if(loggedIn){
    let c = getloc(id) + 1;
    localStorage.setItem(id, c);
    incount();
    renderCartBtn(id); 
    if(loggedIn)
    document.getElementById("cartCounter").innerHTML=getloc("counter");
    }
    else {
    location.href = "./login.html"

    }
}

function decrease(id) {
    
    if(loggedIn){
        document.getElementById("cartCounter").innerHTML=getloc("counter");
        let c = getloc(id) - 1;
        if (c < 0) c = 0;
        localStorage.setItem(id, c);
        decount();
        renderCartBtn(id);
    }
    else {
    location.href = "./login.html"

    }

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