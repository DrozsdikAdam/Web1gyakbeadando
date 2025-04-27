
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

}