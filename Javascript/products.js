let logInLink = document.querySelector(".log-in");
let logOutLink = document.querySelector(".log-out");
var loggedIn = JSON.parse(localStorage.getItem("LoggedIn"));

var userName = localStorage.getItem("UserName");
if (loggedIn) {
  logInLink.style.display = "none";
  document.querySelector(".user-name").innerHTML = userName;
} else {
  logOutLink.style.display = "none";
  localStorage.setItem("counter", 0);
  localStorage.setItem("LoggedIn", false);
  localStorage.setItem("UserName", "user");
  products = localStorage.getItem("products");

  for (let i = 1; i <= products.length; i++) {
    localStorage.setItem(i, 0);
  }
  for (let i = 1; i <= products.length; i++) {
    localStorage.setItem(`wish-${i}`, 0);
  }
  localStorage.setItem("totalprice", 0);
  localStorage.setItem("w-counter", 0);
}
document.getElementById("cartCounter").innerHTML = getloc("counter");
var container = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
var products;
var xhr = new XMLHttpRequest();
xhr.open("Get", "https://dummyjson.com/products");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    products = JSON.parse(xhr.responseText);
    products = products.products;
    console.log(products);

    //display products
    function displayProducts(arr) {
      arr.forEach((element) => {
        var card = document.createElement("div");
        card.id = "card";

        var img = document.createElement("img");
        img.src = element.images[0];
        img.width = "200";
        img.height = "200";
        var category = document.createElement("span");
        category.innerText = element.category;
        var title = document.createElement("h3");
        title.innerText = element.title;
        var price = document.createElement("h3");
        price.innerText = "$" + element.price;
        var details = document.createElement("button");
        details.innerText = "Details";
        details.onclick = function () {
          window.location.href = "ProductDetails.html?id=" + element.id;
        };
        details.id = "details";
        card.appendChild(img);
        card.appendChild(category);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(details);
        container.appendChild(card);
      });
    }
    // displayProducts(products);

    //search functionality
    searchInput.addEventListener("keyup", function () {
      const value = this.value.toLowerCase();
      const cards = document.querySelectorAll("#card");
      cards.forEach((card) => {
        const title = card.querySelector("h2").innerText.toLowerCase();
        if (title.includes(value)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });

    //category filter
    const params = new URLSearchParams(window.location.search);
    var category = params.get("category");

    let filteredProducts = products;
    var pageTitle = document.getElementById("pageTitle");

    pageTitle.style.backgroundImage =
      "linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('../images/head.jpg')";

    pageTitle.style.backgroundRepeat = "no-repeat";
    pageTitle.style.backgroundSize = "cover";
    pageTitle.style.backgroundPosition = "center";

    pageTitle.style.padding = "20px";
    pageTitle.style.margin = "25px";
    pageTitle.style.borderRadius = "15px";
    pageTitle.style.height = "200px";

    pageTitle.style.color = "white";
    pageTitle.style.display = "flex";
    pageTitle.style.alignItems = "center";
    pageTitle.style.justifyContent = "flex-start";
    pageTitle.style.padding = "20px 20px 20px 100px";

    if (category) {
      pageTitle.innerText =
        category.charAt(0).toUpperCase() + category.slice(1) + " Products";
      filteredProducts = products.filter((p) => p.category === category);
    } else {
      pageTitle.innerText = "All Products";
    }
    displayProducts(filteredProducts);
  }
};

//href("products.html?id=5")
function getloc(key) {
  return parseInt(localStorage.getItem(key)) || 0;
}
logOutLink.addEventListener("click", function (e) {
  e.preventDefault();

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

  location.href = "./login.html";
});
