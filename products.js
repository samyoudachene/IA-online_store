let products = [];
let filtered = [];

const grid = document.getElementById("productsGrid");
const filterGender = document.getElementById("filterGender");
const filterCategory = document.getElementById("filterCategory");
const searchInput = document.getElementById("searchInput");

async function loadProducts() {
  try {
    const res = await fetch("./data/products.json");
    products = await res.json();

    filtered = [...products];
    renderProducts();
  } catch (err) {
    console.error(err);
    grid.innerHTML = "<p>Cannot load products.</p>";
  }
}

function renderProducts() {
  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image}" alt="">
      <h3>${p.name.en}</h3>
      <p class="price">${p.price} DZD</p>
      <p>Stock: ${p.stock}</p>
      <button class="btn dark" onclick="addToCart(${p.id})">
        Add to Cart
      </button>
    `;

    grid.appendChild(card);
  });
}

function filterProducts() {
  const g = filterGender.value;
  const c = filterCategory.value;
  const s = searchInput.value.toLowerCase();

  filtered = products.filter(p => {
    const okGender = g === "all" || p.gender === g;
    const okCategory = c === "all" || p.category === c;
    const okSearch = p.name.en.toLowerCase().includes(s);

    return okGender && okCategory && okSearch;
  });

  renderProducts();
}

filterGender.addEventListener("change", filterProducts);
filterCategory.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

loadProducts();