var allproducts;
var sorted;
var quantity = 0;
var cart = [];

const fetchProducts = () => {
  fetch("https://fakestoreapi.com/products").then((res) => {
    res.json().then((response) => {
      console.log(response);

      let products = response;
      for (let product of products) {
        product.quantity = 0;
        if (product.category === "men's clothing" || product.category === "women's clothing") {
          product.BigCategory = "Clothes";
        } 
      }
      allproducts = products;
      sorted = products.sort((a, b) => b.rating.rate - a.rating.rate);

      generateCards("homePopular");
      generateCards("homeClothes");
      generateCards("homeJewelery");
      //jewelery, electronics, men's clothing, woman's clothing,
      //PopularCards();
    });
  });
};

const generateCards = (location) => {
    let parent;
    let array = [];
    let until;
    if (location === "homePopular") {
      parent = document.getElementById("homePopular");
      array = sorted;
      until = 3;
    } else if (location === "homeClothes") {
      parent = document.getElementById("homeClothes");
      for (let item of sorted) {
        if (item.BigCategory === "Clothes") {
          array.push(item);
        }
      }
      until = 3;
    } else if (location === "homeJewelery") {
      parent = document.getElementById("homeJewelery");
      for (let item of sorted) if (item.category === "jewelery")array.push(item);
      until = 3;
    } else {
      // Add logic for other categories if needed
    }
    for (let i = 0; i < until; i++) {
      let div = document.createElement("div");
      div.classList = "card border border-dark-subtle mx-md-2 my-2 p-2 col-md";
      parent.appendChild(div);
      let img = document.createElement("img");
      img.src = array[i].image;
      img.classList = "object-fit-contain cardpic rounded card-img-top img-fluid";
      div.appendChild(img);
      let div2 = document.createElement("div");
      div2.classList = "card-body d-flex flex-column justify-content-between";
      div.appendChild(div2);
      let p1 = document.createElement("p");
      p1.classList = "card-text text-center";
      p1.innerHTML = array[i].title;
      div2.appendChild(p1);
      let p2 = document.createElement("p");
      p2.classList = "card-text px-3";
      div2.appendChild(p2);
      let span1 = document.createElement("span");
      span1.classList = "category";
      span1.innerHTML = array[i].category;
      p2.appendChild(span1);
      let span2 = document.createElement("span");
      span2.classList = "price";
      span2.innerHTML = array[i].price + "$";
      p2.appendChild(span2);
      generateButtons(array, div2, i, location);
    }
  };

const generateButtons = (array, parent, current, location) => {
  let div = document.createElement("div");
  div.classList = "btn-group mx-2";
  div.id = location + current;
  parent.appendChild(div);
  let button = document.createElement("button");
  button.classList = "gomb text-center";
  button.innerHTML = "Add";
  button.onclick = () => Cart("Add", current, location, array, parent);
  div.appendChild(button);
};

const checkCard = (current, array, location, parent) => {
    if (array[current].quantity === 0) {
      let container = document.getElementById(location + current);
      container === null ? null : parent.removeChild(container);
      let div = document.createElement("div");
      div.classList = "btn-group mx-2";
      div.id = location + current;
      parent.appendChild(div);
      let button = document.createElement("button");
      button.classList = "gomb text-center";
      button.innerHTML = "Add";
      button.onclick = () => Cart("Add", current, location, array, parent);
      div.appendChild(button);
    } else {
      let container = document.getElementById(location + current);
      container === null ? null : parent.removeChild(container);
      let div = document.createElement("div");
      div.classList = "btn-group mx-2";
      div.id = location + current;
      parent.appendChild(div);
      let button1 = document.createElement("button");
      button1.classList = "btn btn-danger";
      button1.innerHTML = "-";
      button1.onclick = () => Cart("-", current, location, array, parent);
      div.appendChild(button1);
      let input = document.createElement("input");
      input.type = "text";
      input.value = array[current].quantity; // Use array[current].quantity
      input.id = "count";
      input.classList = "text-center btn";
      input.disabled = true;
      div.appendChild(input);
      let button2 = document.createElement("button");
      button2.classList = "btn btn-success";
      button2.innerHTML = "+";
      button2.onclick = () => Cart("+", current, location, array, parent);
      div.appendChild(button2);
    }
  };

const Cart = (dir, current, loc, array, parent) => {
  for (const item of allproducts) {
    if (item.title === array[current].title) {
      if (dir === "Add") {
        item.quantity++;
        cart.push(item);
      } else if (dir === "-") {
        item.quantity--;
      } else {
        item.quantity++;
      }
      for (const item of cart) {
        if (item.quantity === 0 && item.title === array[current].title) {
          cart.splice(cart.indexOf(item), 1);
        } else if (item.title === array[current].title) {
          cart.splice(cart.indexOf(item), 1);
          cart.push(item);
        }
      }
      break;
    }
  }
  checkCard(current, array, loc, parent);

  if (cart.length === 0) {
    document.getElementById("itemcount1").innerHTML = null;
    document.getElementById("itemcount2").innerHTML = null;
  } else {
    document.getElementById("itemcount1").innerHTML = cart.length;
    document.getElementById("itemcount2").innerHTML = cart.length;
  }
};
