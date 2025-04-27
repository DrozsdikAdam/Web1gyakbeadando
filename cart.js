export const Cart = (dir, current, loc, array, parent) => {
    console.log(window.allproducts);
    for (const productitem of window.allproducts) {
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
  
    if (window.currentPage === "homePage") {
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
  
    localStorage.clear();
    localStorage.setItem("Kosár", JSON.stringify(cart));
  };