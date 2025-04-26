const Init = () => {
    const allproducts = JSON.parse(localStorage.getItem("Terméklista"));
    console.log(allproducts);
    let tablebody = document.getElementById("productList");
    console.log(tablebody);
    allproducts.forEach(element => {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        row.appendChild(cell);
        let cell1 = document.createElement("td");
        cell1.innerHTML = element.id
        row.appendChild(cell1);
        let cell2 = document.createElement("td");
        row.appendChild(cell2);
        let cel3 = document.createElement("td");
        row.appendChild(cel3);
        let cell4 = document.createElement("td");
        row.appendChild(cell4);
        let cell5 = document.createElement("td");
        row.appendChild(cell5);
        let cell6 = document.createElement("td");
        row.appendChild(cell6);
        tablebody.appendChild(row);
    })
}