var loggedIn = JSON.parse(localStorage.getItem("LoggedIn"));

if (localStorage.getItem("counter") === null) {
  localStorage.setItem("counter", 0);
}
if (localStorage.getItem("LoggedIn") === null) {
  localStorage.setItem("LoggedIn", false);
}
if (localStorage.getItem("UserName") === null) {
  localStorage.setItem("UserName", "user");
}

let categoryContainer = document.querySelector(".category-container");
let productsContainer = document.querySelector(".featured-products-container");
let logInLink = document.querySelector(".log-in");
let logOutLink = document.querySelector(".log-out");
let categoriesImages = [
  "./images/beauty.jpg",
  "./images/Fragrances.jpg",
  "./images/furniture.jpg",
  "./images/groceries.jpg",
];
var requestData = [];
var productsData = [];
var products = JSON.parse(localStorage.getItem("products")) || [];
var categories = JSON.parse(localStorage.getItem("categories")) || [];
var counter = JSON.parse(localStorage.getItem("counter")) || 0;
var userName = localStorage.getItem("UserName");

document.querySelector(".cart-counter").innerHTML = counter;
if (loggedIn) {
  logInLink.style.display = "none";
  document.querySelector(".user-name").innerHTML = userName;
} else {
  logOutLink.style.display = "none";
  localStorage.setItem("counter", 0);

  localStorage.setItem("UserName", "user");
}
if (!loggedIn) {
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
apiRequest();

getProducts();

function apiRequest() {
  try {
    if (!localStorage.getItem("categories")) {
      let request = new XMLHttpRequest();
      request.open("Get", "https://dummyjson.com/products/categories");
      request.send();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          requestData = JSON.parse(request.response);
          localStorage.setItem("categories", JSON.stringify(requestData));
          displayCategories(requestData.categories.slice(0,4))
        }
      };
      categories = JSON.parse(localStorage.getItem("categories")) || [];
      console.log(categories);

      displayCategories(categories.slice(0, 4));
    } else {
      displayCategories(categories.slice(0, 4));
    }
  } catch (error) {
    console.log(error);
    // ! message for errors/
  }
}
function displayCategories(requestData) {
  let box = "";
  for (var element in requestData) {
    box += `
     <a href="products.html?category=${requestData[element].name.toLowerCase()}">
                <div class="category-card">
                    <img src="${categoriesImages[element]}" alt="">
                    <h3>${requestData[element].name}</h3>
                   
                </div>
    </a>
    `;
  }
  categoryContainer.innerHTML = box;
}
function getProducts() {
  try {
    if (localStorage.getItem("products") == null) {
      let request = new XMLHttpRequest();
      request.open("Get", "https://dummyjson.com/products");
      request.send();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          productsData = JSON.parse(request.response);
          localStorage.setItem("products", JSON.stringify(productsData));
          console.log(productsData);

          displayProducts(productsData.products);
        }
      };
      products = JSON.parse(localStorage.getItem("products")) || [];
      displayProducts(products.products);
    } else {
      displayProducts(products.products);
    }
  } catch (error) {
    console.log(error);
  }
}
function displayProducts(products) {
  let box = "";
  for (const index in products) {
    if (index == 0 || index == 10 || index == 15 || index == 6) {
      box += `
                    <div class="product-card">
                <img src="${products[index].images[0]}" alt="">
                <div class="product-card-text">
                    <span class="category-name">${products[index].category}</span>
                    <h3 class="product-name">${products[index].title}</h3>
                     <span class="product-price">$ ${products[index].price}</span>
                </div>
                <button class="view-products"><a href="ProductDetails.html?id=${products[index].id}">View Details</a></button>
            </div>
        `;
    } else {
      continue;
    }
  }
  productsContainer.innerHTML = box;
}

logOutLink.addEventListener("click", function (e) {
  e.preventDefault();

  localStorage.setItem("counter", 0);
  localStorage.setItem("LoggedIn", false);
  localStorage.setItem("UserName", "user");

  for (let i = 1; i <= products.products.length; i++) {
    localStorage.setItem(i, 0);
  }
  for (let i = 1; i <= products.products.length; i++) {
    localStorage.setItem(`wish-${i}`, 0);
  }
  localStorage.setItem("totalprice", 0);
  localStorage.setItem("w-counter", 0);

  location.href = "./login.html";
});
