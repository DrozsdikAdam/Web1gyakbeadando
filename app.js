var allproducts;
var sorted;
var subarrayClothes = [];
var subarrayJewelry = [];
var subarrayElectronics = [];
var quantity = 0;
var cart = [];
var currentPage;
var counter;

const fetchProducts = async (page) => {
  if (localStorage.getItem("currentUser") === null)
    localStorage.setItem("currentUser", JSON.stringify(null));
  loginButton();
  fetch("https://fakestoreapi.com/products").then((res) => {
    res.json().then((response) => {
      currentPage = page;
      let products = response;
      console.log(products);
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
      counter = 0;

      if (localStorage.getItem("Terméklista") === null)
        localStorage.setItem("Terméklista", JSON.stringify(allproducts));

      const storedCart = localStorage.getItem("Kosár");
      cart = storedCart ? JSON.parse(storedCart) : cart;
      for (let item of allproducts)
        for (let cartitem of cart)
          if (item.title === cartitem.title) item.quantity = cartitem.quantity;

      if (cart.length === 0) {
        document.getElementById("itemcount1").innerHTML = null;
        document.getElementById("itemcount2").innerHTML = null;
      } else {
        document.getElementById("itemcount1").innerHTML = cart.length;
        document.getElementById("itemcount2").innerHTML = cart.length;
      }

      for (let item of sorted) {
        if (item.BigCategory === "Clothes") subarrayClothes.push(item);
        if (item.category === "jewelery") subarrayJewelry.push(item);
        if (item.category === "electronics") subarrayElectronics.push(item);
      }
      if (page === "homePage") {
        generateCards("homePopular");
        generateCards("homeClothes");
        generateCards("homeJewelry");
        generateCards("homeElectronics");
      } else if (page === "jewelryPage") {
        generateRows(
          subarrayJewelry.length,
          "jewelryRow",
          "containerJewelry",
          "Ékszerek"
        );
      } else if (page === "clothesPage") {
        generateRows(
          subarrayClothes.length,
          "clothesRow",
          "containerClothes",
          "Ruhák"
        );
      } else {
        generateRows(
          subarrayElectronics.length,
          "electronicsRow",
          "containerElectronics",
          "Elektronikai cikkek"
        );
      }
    });
  });
};

const generateRows = (num, rown, locationForRows, title) => {
  var container = document.getElementById(locationForRows);
  for (let i = 0; i < num / 4; i++) {
    var sec = document.createElement("section");
    if (i % 2 == 0)
      sec.classList = "bg-light text-dark p-5 text-center text-sm-start";
    else sec.classList = "bg-dark text-light p-5 text-center text-sm-start";
    container.appendChild(sec);
    var div1 = document.createElement("div");
    div1.classList = "container";
    sec.appendChild(div1);
    var div2 = document.createElement("div");
    div2.classList = "container-fluid mb-2";
    div1.appendChild(div2);
    if (i == 0) {
      var h1 = document.createElement("h1");
      h1.classList = "text-center mb-2";
      h1.innerHTML = title;
      div2.appendChild(h1);
      var br = document.createElement("br");
      div2.appendChild(br);
    }
    var div3 = document.createElement("div");
    div3.classList = "row";
    div3.id = rown + i;
    div1.appendChild(div3);
    generateCards(rown, i);
  }
};

const generateCards = (location, rown) => {
  let parent;
  let array = [];
  let until;
  let from = 0;
  if (location === "homePopular") {
    parent = document.getElementById("homePopular");
    array = sorted;
    until = 4;
  } else if (location === "homeClothes") {
    parent = document.getElementById("homeClothes");
    array = subarrayClothes;
    until = 4;
  } else if (location === "homeJewelry") {
    parent = document.getElementById("homeJewelry");
    array = subarrayJewelry;
    until = 4;
  } else if (location === "homeElectronics") {
    parent = document.getElementById("homeElectronics");
    array = subarrayElectronics;
    until = 4;
  } else if (location === "jewelryRow") {
    parent = document.getElementById(location + counter);
    array = subarrayJewelry;
    if (subarrayJewelry.length - rown * 4 < 4) until = subarrayJewelry.length;
    else if (subarrayJewelry.length - rown * 4 > 4) until = 4 + rown * 4;
    else until = subarrayJewelry.length - rown * 4;
    from = rown * 4;
    counter++;
  } else if (location === "clothesRow") {
    parent = document.getElementById(location + counter);
    array = subarrayClothes;
    if (subarrayClothes.length - rown * 4 < 4) until = subarrayClothes.length;
    else if (subarrayClothes.length - rown * 4 > 4) until = 4 + rown * 4;
    else until = subarrayClothes.length - rown * 4;
    from = rown * 4;
    counter++;
  } else if (location === "electronicsRow") {
    parent = document.getElementById(location + counter);
    array = subarrayElectronics;
    if (subarrayElectronics.length - rown * 4 < 4)
      until = subarrayElectronics.length;
    else if (subarrayElectronics.length - rown * 4 > 4) until = 4 + rown * 4;
    else until = subarrayElectronics.length - rown * 4;
    from = rown * 4;
    counter++;
  }
  for (let i = from; i < until; i++) {
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
    if (
      location === "jewelryRow" ||
      location === "clothesRow" ||
      location === "electronicsRow"
    )
      generateButtons(array, div2, i, location + counter);
    else generateButtons(array, div2, i, location);
  }
};

const generateButtons = (array, parent, current, location) => {
  const isItemInCart = cart.some((item) => item.title === array[current].title);
  if (!isItemInCart) {
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
        if (array[current].title === subarrayJewelry[i].title) {
          loc = "homePopular";

          parent = document.getElementById(loc + current).parentElement;
          checkCard(current, sorted, loc, parent);
          loc = "homeJewelry";

          parent = document.getElementById(loc + i).parentElement;
          checkCard(i, subarrayJewelry, loc, parent);
        }
      } else {
        if (array[current].title === sorted[i].title) {
          loc = "homePopular";
          parent = document.getElementById(loc + i).parentElement;

          checkCard(i, sorted, loc, parent);
          loc = "homeJewelry";

          parent = document.getElementById(loc + current).parentElement;
          checkCard(current, subarrayJewelry, loc, parent);
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

const loginButton = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginButton = document.getElementById("loginItem");
  const loginButton2 = document.getElementById("loginItem2");
  const logoutbtn = document.getElementById("logoutBtn1");
  const logoutbtn2 = document.getElementById("logoutBtn2");

  if (currentUser === null) {
    if (logoutbtn) loginButton.removeChild(logoutbtn);
    if (logoutbtn2) loginButton2.removeChild(logoutbtn2);
    let a = document.createElement("a");
    a.href = "/login.html";
    a.classList = "mx-md-2 nav-link loginBtn";
    a.innerHTML = "Login";
    a.id = "loginBtn";
    let a2 = document.createElement("a");
    a2.href = "/login.html";
    a2.classList = "mx-md-2 nav-link loginBtn";
    a2.innerHTML = "Login";
    a2.id = "loginBtn";

    loginButton.appendChild(a2);
    loginButton2.appendChild(a);
  } else {
    let a = document.createElement("a");
    a.onclick = () => Logout();
    a.title = "Logout";
    a.classList = "mx-md-2 nav-link loginBtn";
    a.innerHTML = currentUser.username;
    a.id = "logoutBtn1";

    let a2 = document.createElement("a");
    a2.onclick = () => Logout();
    a2.title = "Logout";
    a2.classList = "mx-md-2 nav-link loginBtn";
    a2.innerHTML = currentUser.username;
    a2.id = "logoutBtn2";
    loginButton.appendChild(a);
    loginButton2.appendChild(a2);
  }
};

const Logout = () => {
  alert("Kijelentkeztél");
  localStorage.setItem("currentUser", JSON.stringify(null));
  loginButton();
};

const Cart = (dir, current, loc, array, parent) => {
  for (const productitem of allproducts) {
    if (productitem.title === array[current].title) {
      if (dir === "Add") {
        productitem.quantity++;
        cart.push(productitem);
      } else if (dir === "-") productitem.quantity--;
      else productitem.quantity++;
      

      for (const item of cart) {
        if (item.quantity === 0 && item.title === array[current].title) {
          cart.splice(cart.indexOf(item), 1);
        } else if (item.title === array[current].title) {
          cart.splice(cart.indexOf(item), 1);
          cart.push(productitem);
        }
      }

      break;
    }
  }

  
  if (currentPage === "homePage") {
    updateCards(parent, loc, array, current);
    checkCard(current, array, loc, parent);
  } else checkCard(current, array, loc, parent);

  if (cart.length === 0) {
    document.getElementById("itemcount1").innerHTML = null;
    document.getElementById("itemcount2").innerHTML = null;
  } else {
    document.getElementById("itemcount1").innerHTML = cart.length;
    document.getElementById("itemcount2").innerHTML = cart.length;
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  localStorage.clear();
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("Kosár", JSON.stringify(cart));
  localStorage.setItem("Terméklista", JSON.stringify(allproducts));
  console.log(allproducts);
};