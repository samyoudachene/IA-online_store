let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItemsDiv = document.getElementById("cartItems");
let totalPriceEl = document.getElementById("totalPrice");

fetch("data/products.json")
  .then(res => res.json())
  .then(products => {

    let total = 0;

    if(cart.length === 0){
      cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
      return;
    }

    cartItemsDiv.innerHTML = "";

    cart.forEach(id => {
      const product = products.find(p => p.id === id);
      if(product){
        total += product.price;

        const div = document.createElement("div");
        div.style.border = "1px solid #eee";
        div.style.padding = "10px";
        div.style.marginBottom = "10px";

        div.innerHTML = `
          <h3>${product.name.en}</h3>
          <p>${product.price} DZD</p>
        `;

        cartItemsDiv.appendChild(div);
      }
    });

    totalPriceEl.innerText = "Total: " + total + " DZD";
  });
