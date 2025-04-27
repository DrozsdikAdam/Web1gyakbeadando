
const cartPage = () => {
    loginButton();
    const allproducts = JSON.parse(localStorage.getItem("Terméklista"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const Products = JSON.parse(localStorage.getItem("Kosár"));
    const cartContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const paybtn = document.getElementById("paybtn");
    let totalPrice = 0;
    cartContainer.innerHTML = "";

    let counter = Products.length;
    if (counter === 0) {
        document.getElementById("itemcount1").innerHTML = null;
        document.getElementById("itemcount2").innerHTML = null;
      } else {
        document.getElementById("itemcount1").innerHTML = counter;
        document.getElementById("itemcount2").innerHTML = counter;
      }

      if(currentUser === null && counter > 0){
        setTimeout(()=>{
            alert("Ha fizetni szeretnél jelentkezz be!");
        },2000);
        paybtn.disabled = true;
      }else{
        paybtn.disabled = false;
      }
    

    if (Products && Products.length > 0) {
        Products.forEach(element => {
            let product = document.createElement("div");
            product.className = "cart-item d-flex containerdiv justify-content-between align-items-center flex-column flex-md-row my-3";
            let img = document.createElement("img");
            img.src = element.image;
            img.className = "img-fluid rounded";
            img.style.width = "150px";
            img.style.height = "auto";
            img.alt = element.title;
            let name = document.createElement("h5");
            name.className = "product-name";
            name.innerText = element.title;
            let price = document.createElement("h5");
            price.className = "product-price";
            price.innerText = element.price + " $";
            let quantity = document.createElement("h5");
            quantity.className = "product-quantity";
            quantity.innerText = element.quantity + " db";
            let removebtn = document.createElement("button");
            removebtn.className = "btn btn-danger fs-4";
            removebtn.innerHTML = "<i class='bi bi-trash'></i>";
            removebtn.onclick = () => {
                const productIndexInAll = allproducts.findIndex(p => p.id === element.id);
                allproducts[productIndexInAll].quantity = 0;
                Products.splice(Products.indexOf(element), 1);
                localStorage.setItem("Terméklista", JSON.stringify(allproducts));
                localStorage.setItem("Kosár", JSON.stringify(Products));
                cartPage();
            }
            
            product.appendChild(img);
            product.appendChild(name);
            product.appendChild(price);
            product.appendChild(quantity);
            product.appendChild(removebtn);
            cartContainer.appendChild(product);

            totalPrice += element.quantity * element.price;
        });
        totalPriceElement.innerText = totalPrice.toFixed(2) + " $"
        
    }
    else{
        cartContainer.classList.add("d-flex");
        cartContainer.classList.add("justify-content-center");
        cartContainer.classList.add("align-items-center");
        cartContainer.innerHTML = "<h2 class='text-center'>Üres a kosár</h2>";
        paybtn.disabled = true;
        totalPriceElement.innerText = totalPrice.toFixed(2) + " $"
    }

    
}

const checkout = () => {
    const allproducts = JSON.parse(localStorage.getItem("Terméklista"));
    allproducts.forEach(element => {
        element.quantity = 0;
    });
    localStorage.setItem("Terméklista", JSON.stringify(allproducts));
    localStorage.setItem("Kosár", JSON.stringify([]));
    alert("Köszönjük a vásárlást!");
    window.location.href = "index.html";


}