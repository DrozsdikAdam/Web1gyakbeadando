const Init = () => {
    loginButton();
    var allproducts = JSON.parse(localStorage.getItem("Terméklista"));
    allproducts = allproducts.sort((a, b) => a.id - b.id)
    let tablebody = document.getElementById("productList");
    allproducts.forEach(element => {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        let img = document.createElement("img");
        img.src = element.image;
        img.style.width = "150px";
        img.style.height = "150px";
        img.classList = "img img-fluid";
        img.alt = element.title;
        cell.appendChild(img);
        row.appendChild(cell);
        let cell1 = document.createElement("td");
        cell1.innerHTML = element.id
        row.appendChild(cell1);
        let cell2 = document.createElement("td");
        cell2.innerHTML = element.title
        row.appendChild(cell2);
        let cell3 = document.createElement("td");
        cell3.innerHTML = element.price + "$"
        row.appendChild(cell3);
        let cell4 = document.createElement("td");
        cell4.innerHTML = element.category
        row.appendChild(cell4);
        let cell5 = document.createElement("td");
        cell5.innerHTML = element.quantity
        row.appendChild(cell5);
        let cell6 = document.createElement("td");
        cell6.innerHTML = element.rating.rate+" ";
        let star = document.createElement("i");
        star.classList.add("bi");
        star.classList.add("bi-star-fill");
        cell6.appendChild(star);
        row.appendChild(cell6);
        tablebody.appendChild(row);
    });

    let counter = 0;
    allproducts.forEach(element => {if (element.quantity > 0)counter++;});
    if (counter === 0) {
        document.getElementById("itemcount1").innerHTML = null;
        document.getElementById("itemcount2").innerHTML = null;
      } else {
        document.getElementById("itemcount1").innerHTML = counter;
        document.getElementById("itemcount2").innerHTML = counter;
      }
}

