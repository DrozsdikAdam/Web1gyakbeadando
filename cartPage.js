
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

      if(currentUser === null){
        setTimeout(()=>{
            alert("Ha fizetni szeretnél jelentkezz be!");
        },2000);
        paybtn.disabled = true;
      }else{
        paybtn.disabled = false;
      }
    

    }