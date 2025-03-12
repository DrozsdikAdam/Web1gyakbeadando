const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products").then(res => {
        //console.log(res);
        res.json().then(response => {
            console.log(response);
            let products = response;
            for(let product of products)
            {
                product.quantity = 0;
            }
            var firstpic = document.getElementById("firstPop");
            var secondpic = document.getElementById("secondPop");
            var thirdpic = document.getElementById("thirdPop");
            var firsttext = document.getElementById("firstText");
            var secondtext = document.getElementById("secondText");
            var thirdtext = document.getElementById("thirdText");
            
            var arraysorted = response;
            
            arraysorted.sort((a, b) => a.rating.rate - b.rating.rate);
            firstpic.src = arraysorted[0].image;
            secondpic.src = arraysorted[1].image;
            thirdpic.src = arraysorted[2].image;
            firsttext.innerHTML = arraysorted[0].title;
            secondtext.innerHTML = arraysorted[1].title;
            thirdtext.innerHTML = arraysorted[2].title;


        });
    });
}