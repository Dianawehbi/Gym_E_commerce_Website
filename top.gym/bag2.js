
let addtocart = document.querySelectorAll(".button");
let totalprice = 0;
let nbofitems = 0;
let userActivityData = [];
document.getElementById("cartheader").innerHTML = `<p>Your cart is empty<br>Every item for every need</p>`
addtocart.forEach(button => {
    button.addEventListener('click', () => {
        if (nbofitems > 0) {
            document.getElementById("priceinfo").style.display = "block";
        }
        document.getElementById("cartheader").innerHTML = `<h3>Cart</h3>`;

        let parentElement = button.closest(".product");
        let imageElement = parentElement.querySelector(".image");
        let descriptionElement = parentElement.querySelector(".description");
        let priceElement = parentElement.querySelector(".price");

        if (!imageElement || !descriptionElement || !priceElement) {
            console.error("Required element not found");
            return;
        }

        let imageDiv = document.createElement("div");
        let descriptionDiv = document.createElement("div");
        let priceDiv = document.createElement("div");
        let quantityDiv = document.createElement("div");
        let deleteDiv = document.createElement("div");
        nbofitems++;

        let mainDiv = document.createElement("div");
        mainDiv.className = "maindiv";

        mainDiv.appendChild(imageDiv);
        mainDiv.appendChild(descriptionDiv);
        mainDiv.appendChild(priceDiv);
        mainDiv.appendChild(quantityDiv);
        mainDiv.appendChild(deleteDiv);

        document.getElementById("container").appendChild(mainDiv);

        imageDiv.innerHTML = `<img src="${imageElement.src}" alt="image" class="imagess">`;
        descriptionDiv.innerHTML = `<p>${descriptionElement.textContent}</p>`;
        priceDiv.innerHTML = `<p class="item-price">${priceElement.textContent}</p>`;
        quantityDiv.innerHTML = `<div class="quantitydiv">
                                    <button class="minus">-</button> 
                                    <p class="quan">1</p>
                                    <button class="plus">+</button> 
                                 </div>`;
        deleteDiv.innerHTML = `<button class="delete">Remove</button>`;

        //json
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({
            image: imageElement.src,
            description: descriptionElement.textContent,
            price: parseFloat(priceElement.textContent.slice(0, -1)),
            quantity: 1
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        //json 

        function RemoveElemenet() {
            deleteDiv.querySelector(".delete").addEventListener('click', () => {
                mainDiv.remove();
                nbofitems--;
                if (nbofitems == 0) {
                    document.getElementById("cartheader").innerHTML = `<p>Your cart is empty<br>Every item for every need</p>`
                    document.getElementById("priceinfo").style.display = "none";
                }
            })
            calculateTotalprice();
            checkoutlaststep();
        }
        RemoveElemenet();

        //Minus button 
        quantityDiv.querySelector(".minus").addEventListener('click', () => {
            nbofitems--;
            if (quantityDiv.querySelector(".minus").parentElement.querySelector(".quan").textContent == 1) {
                window.alert("The element will be removed now ");
                mainDiv.remove();
                calculateTotalprice()
                checkoutlaststep();
                return;
            }
            quantityDiv.querySelector(".minus").parentElement.querySelector(".quan").innerHTML = parseInt(quantityDiv.querySelector(".minus").parentElement.querySelector(".quan").textContent - 1);

            //  3 - Update the data in local storage when the user modifies the cart:
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart = cart.filter((item) => {
                return !(item.image === imageElement.src && item.description === descriptionElement.textContent && item.price === parseFloat(priceElement.textContent.slice(0, -1)));
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            //

            calculateTotalprice();
            checkoutlaststep();
        })

        //Plus Button
        quantityDiv.querySelector(".plus").addEventListener('click', () => {
            quantityDiv.querySelector(".plus").parentElement.querySelector(".quan").innerHTML = 1 + parseInt(quantityDiv.querySelector(".plus").parentElement.querySelector(".quan").textContent);
            nbofitems++;
            calculateTotalprice();
            checkoutlaststep();

            //json 
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart = cart.map((item) => {
                if (item.image === imageElement.src && item.description === descriptionElement.textContent && item.price === parseFloat(priceElement.textContent.slice(0, -1))) {
                    item.quantity = parseInt(quantityDiv.querySelector(".quan").textContent);
                }
                return item;
                //json

            })
            calculateTotalprice()
            checkoutlaststep();
            /*  totalprice = parseInt(document.querySelector(".quan").textContent * parseFloat(document.querySelector(".price").textContent.split('$')));
              Totalprice.innerHTML = totalprice;
            */


            window.location.href = "card.html";
        });
    })
})

function checkoutlaststep() {
    document.getElementById("priceinfo").innerHTML = `<button id="checkout" onclick="checkoutprocess()" class="checkout">
                                                      <div class="nboditemsinsidecart">${nbofitems} items</div>
                                                      checkout
                                                      <div id="totalpriceinsidecart">${calculateTotalprice()} $</div>
                                                      </button>`;
    if (nbofitems == 1) {
        document.querySelector(".nboditemsinsidecart").innerHTML = `${nbofitems} item`;
    }
}


function calculateTotalprice() {
    let allprice = document.querySelectorAll(".item-price");
    let totalprice = 0;

    allprice.forEach((element) => {
        let mainDiv = element.closest(".maindiv");
        let quantity = parseInt(mainDiv.querySelector(".quan").textContent, 10);
        console.log(quantity);
        if (quantity == null) {
            quantity = 0;;
        }
        let pricewithout$ = element.textContent.slice(0, -1);
        let price = parseFloat(pricewithout$);
        totalprice += (price * quantity);
        console.log(totalprice);
    });

    return totalprice;
}
function checkoutprocess() {
    if (confirm("Do you want to confirm your order?")) {
        alert("Order confirmed!");
        // Add additional order processing logic here
    } else {
        alert("Order not confirmed.");
    }
}
localStorage.
