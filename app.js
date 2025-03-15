var allproducts;
var cart = [];

const fetchProducts = () => {
  fetch("https://fakestoreapi.com/products").then((res) => {
    //console.log(res);
    res.json().then((response) => {
      console.log(response);

      let products = response;
      for (let product of products) product.quantity = 0;
      allproducts = response;
      let firstpic = document.getElementById("firstPop");
      let secondpic = document.getElementById("secondPop");
      let thirdpic = document.getElementById("thirdPop");
      let firsttext = document.getElementById("firstText");
      let secondtext = document.getElementById("secondText");
      let thirdtext = document.getElementById("thirdText");

      var arraysorted = response;

      arraysorted.sort((a, b) => a.rating.rate - b.rating.rate);
      firstpic.src = arraysorted[0].image;
      secondpic.src = arraysorted[1].image;
      thirdpic.src = arraysorted[2].image;
      firsttext.innerHTML = arraysorted[0].title;
      secondtext.innerHTML = arraysorted[1].title;
      thirdtext.innerHTML = arraysorted[2].title;
      //jewlery, electronics, men's clothing, woman's clothing,
      PopularCards(arraysorted);
    });
  });
};

const PopularCards = (sorted) => {
  for (let i = 1; i < 4; i++) {
    let quantity = 0;
    for (const item of allproducts) {
      if (item.title == sorted[i].title) quantity = item.quantity;
    }
    let Cardbody = document.getElementById("PopularCard" + i);
    if (quantity == 0) {

      let div = document.createElement("div");
      div.classList = "btn-group mx-2";
      Cardbody.appendChild(div);
      let button = document.createElement("button");
      button.classList = "btn gomb text-center";
      button.innerHTML = "Add";
      div.appendChild(button);
      
    } else {

      let div = document.createElement("div");
      div.classList = "btn-group mx-2";
      Cardbody.appendChild(div);
      let button1 = document.createElement("button");
      button1.classList = "btn btn-danger";
      button1.innerHTML = "-";
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
      div.appendChild(button2);
      
    }
  }
};
