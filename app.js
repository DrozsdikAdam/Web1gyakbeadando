var allproducts;
var sorted;
var subarrayClothes;
var subarrayJewelery;
var subarrayElectronics;
var quantity = 0;
var cart = [];
var currentPage;

const fetchProducts = (page) => {
  fetch("https://fakestoreapi.com/products").then((res) => {
    res.json().then((response) => {
      console.log(response);
      currentPage = page;
      let products = response;
      for (let product of products) {
        product.quantity = 0;
        if (
          product.category === "men's clothing" ||
          product.category === "women's clothing"
        ) {
          product.BigCategory = "Clothes";
        }
      }
      allproducts = products;
      sorted = products.sort((a, b) => b.rating.rate - a.rating.rate);
      for (let item of sorted) {
        if (item.BigCategory === "Clothes") {
          subarrayClothes.push(item);
        }}
      for (let item of sorted) if (item.category === "jewelery") subarrayJewelery.push(item);
      for (let item of sorted)
        if (item.category === "electronics") subarrayElectronics.push(item);
      if(page === "homePage"){
      generateCards("homePopular");
      generateCards("homeClothes");
      generateCards("homeJewelery");
      generateCards("homeElectronics");
    }
    else if(page ==="jewelryPage"){
generateRows(subarrayJewelery.length);
    }
    else if(page ==="clothesPage"){
      generateRows(subarrayClothes.length);
          }
          else{
            generateRows(subarrayElectronics.length);
          }
  });
  });
};

const generateRows = (num) => {
  var container = document.getElementById("container");
  for (let i = 0; i <num/4; i++){
var src = document.createElement("section");
src.classList = "bg-light text-dark p-5 text-center text-sm-start";
container.appendChild(src);
var div1 = document.createElement("div");
div1.classList = "container";
src.appendChild(div1);
var div2 = document.createElement("div");
div2.classList = "container-fluid mb-2";
div1.appendChild(div2);
var h1 = document.createElement("h1");
h1.classList = "text-center mb-2";
div2.appendChild(h1);
var br = document.createElement("br");
div2.appendChild(br);
var div3 = document.createElement("div3");
div3.classList = "row";
div3.id = "jewelryRow" + i;
div1.appendChild(div3);
  }
}

const generateCards = (location) => {
  let parent;
  let array = [];
  let until;
  if (location === "homePopular") {
    parent = document.getElementById("homePopular");
    array = sorted;
    until = 4;
  } else if (location === "homeClothes") {
    parent = document.getElementById("homeClothes");
    array = subarrayClothes;
    until = 4;
  } else if (location === "homeJewelery") {
    parent = document.getElementById("homeJewelery");
    array = subarrayJewelery;
    until = 4;
  } else if (location === "homeElectronics") {
    parent = document.getElementById("homeElectronics");
    array = subarrayElectronics;
    until = 4;
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
    input.value = array[current].quantity;
    input.id = location + current + "count";
    input.classList = "text-center btn counter";
    input.disabled = true;
    div.appendChild(input);
    let button2 = document.createElement("button");
    button2.classList = "btn btn-success";
    button2.innerHTML = "+";
    button2.onclick = () => Cart("+", current, location, array, parent);
    div.appendChild(button2);
  }
};

const updateCards = (parent, loc, array, current) => {
  if (array[current].category === "jewelery") {
    for (let i = 0; i < 4; i++) {
      if (array.length === 20) {
        if (array[current].title === subarrayJewelery[i].title) {
          loc = "homePopular";

          parent = document.getElementById(loc + current).parentElement;
          checkCard(current, sorted, loc, parent);
          loc = "homeJewelery";

          parent = document.getElementById(loc + i).parentElement;
          checkCard(i, subarrayJewelery, loc, parent);
        }
      } else {
        if (array[current].title === sorted[i].title) {
          loc = "homePopular";
          parent = document.getElementById(loc + i).parentElement;

          checkCard(i, sorted, loc, parent);
          loc = "homeJewelery";

          parent = document.getElementById(loc + current).parentElement;
          checkCard(current, subarrayJewelery, loc, parent);
        }
      }
    }
  } else if (array[current].category === "electronics") {
    for (let i = 0; i < 4; i++) {
      if (array.length === 20) {
        if (array[current].title === subarrayElectronics[i].title) {
          loc = "homePopular";
          parent = document.getElementById(loc + current).parentElement;
          checkCard(current, sorted, loc, parent);
          loc = "homeElectronics";
          parent = document.getElementById(loc + i).parentElement;
          checkCard(i, subarrayElectronics, loc, parent);
        }
      } else {
        if (array[current].title === sorted[i].title) {
          loc = "homePopular";
          parent = document.getElementById(loc + i).parentElement;
          checkCard(i, sorted, loc, parent);
          loc = "homeElectronics";
          parent = document.getElementById(loc + current).parentElement;
          checkCard(current, subarrayElectronics, loc, parent);
        }
      }
    }
  } else {
    for (let i = 0; i < 4; i++) {
      if (array.length === 20) {
        if (array[current].title === subarrayClothes[i].title) {
          loc = "homePopular";
          parent = document.getElementById(loc + current).parentElement;

          checkCard(current, sorted, loc, parent);
          loc = "homeClothes";
          parent = document.getElementById(loc + i).parentElement;
          checkCard(i, subarrayClothes, loc, parent);
        }
      } else {
        if (array[current].title === sorted[i].title) {
          loc = "homePopular";
          parent = document.getElementById(loc + i).parentElement;
          checkCard(i, sorted, loc, parent);
          loc = "homeClothes";
          parent = document.getElementById(loc + current).parentElement;
          checkCard(current, subarrayClothes, loc, parent);
        }
      }
    }
  }
};

const Cart = (dir, current, loc, array, parent) => {
  for (const item of allproducts) {
    if (item.title === array[current].title) {
      if (dir === "Add") {
        item.quantity++;
        cart.push(item);
      } else if (dir === "-") item.quantity--; 
      else item.quantity++;
      
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
  if(currentPage === "homePage"){
  updateCards(parent, loc, array, current);
  checkCard(current, array, loc, parent);
  }
  else checkCard(current, array, loc, parent);

  if (cart.length === 0) {
    document.getElementById("itemcount1").innerHTML = null;
    document.getElementById("itemcount2").innerHTML = null;
  } else {
    document.getElementById("itemcount1").innerHTML = cart.length;
    document.getElementById("itemcount2").innerHTML = cart.length;
  }

  /* localStorage.setItem('objektum', JSON.stringify(objektum));
    localStorage.setItem('tomb', JSON.stringify(tomb));
    localStorage.setItem('valtozo', valtozo); */
};
