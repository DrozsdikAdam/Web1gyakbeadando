var allproducts;
var sorted;
var quantity = 0;
var cart = [];

const fetchProducts = () => {
  fetch("https://fakestoreapi.com/products").then((res) => {
    //console.log(res);
    res.json().then((response) => {
      console.log(response);

      let products = response;
      for (let product of products) product.quantity = 0;
      allproducts = products;
      sorted = products.sort((a, b) => a.rating.rate - b.rating.rate);

      let firstpic = document.getElementById("firstPop");
      let secondpic = document.getElementById("secondPop");
      let thirdpic = document.getElementById("thirdPop");
      let firsttext = document.getElementById("firstText");
      let secondtext = document.getElementById("secondText");
      let thirdtext = document.getElementById("thirdText");
      firstpic.src = sorted[0].image;
      secondpic.src = sorted[1].image;
      thirdpic.src = sorted[2].image;
      firsttext.innerHTML = sorted[0].title;
      secondtext.innerHTML = sorted[1].title;
      thirdtext.innerHTML = sorted[2].title;
      //jewlery, electronics, men's clothing, woman's clothing,
      PopularCards();
    });
  });
};

const PopularCards = () => {
  for (let i = 1; i < 4; i++) {
    for (const item of allproducts) {
      if (item.title === sorted[i].title) quantity = item.quantity;
    }
    let Cardbody = document.getElementById("PopularCard" + i);
    if (quantity === 0) {
        let container = document.getElementById("contdiv" + i);
        container === null ? null : Cardbody.removeChild(container);
      let div = document.createElement("div");
      div.classList = "btn-group mx-2";
      div.id = "contdiv" + i;
      Cardbody.appendChild(div);
      let button = document.createElement("button");
      button.classList = "gomb text-center";
      button.innerHTML = "Add";
      button.onclick = () => Cart("Add", sorted[i].title, "Popular");
      div.appendChild(button);
    } else {
        let container = document.getElementById("contdiv" + i);
        container === null ? null : Cardbody.removeChild(container);
      let div = document.createElement("div");
      div.classList = "btn-group mx-2";
      div.id = "contdiv" + i;
      Cardbody.appendChild(div);
      let button1 = document.createElement("button");
      button1.classList = "btn btn-danger";
      button1.innerHTML = "-";
      button1.onclick = () => Cart("-", sorted[i].title, "Popular");
      div.appendChild(button1);
      let input = document.createElement("input");
      input.type = "text";
      input.value = quantity;
      input.id = "count";
      input.classList = "text-center btn";
      input.disabled = true;
      div.appendChild(input);
      let button2 = document.createElement("button");
      button2.classList = "btn btn-success";
      button2.innerHTML = "+";
      button2.onclick = () => Cart("+", sorted[i].title, "Popular");
      div.appendChild(button2);
    }
  }
};

const Cart = (dir, title, loc) => {
  for (const item of allproducts) {
    if (item.title === title) {
        if (dir === "Add") {
            item.quantity++;
            cart.push(item);
        } else if (dir === "-") {
            item.quantity--;
        } else {
            item.quantity++;
        }
      for (const item of cart) {
        if (item.quantity === 0 && item.title === title) {
          cart.splice(cart.indexOf(item), 1);
        } else if(item.title === title) {
          cart.splice(cart.indexOf(item), 1);
          cart.push(item);
        }
      }
      break;
    }
  }
  if (loc === "Popular")PopularCards();
  
  document.getElementById("itemcount1").innerHTML = cart.length;
  document.getElementById("itemcount2").innerHTML = cart.length;
  console.log(cart);
};
