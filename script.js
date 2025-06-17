let allProducts = [];

async function fetchProducts(query = "") {
  const url = query 
    ? `https://dummyjson.com/products/search?q=${query}` 
    : `https://dummyjson.com/products`;
  const res = await fetch(url);
  const data = await res.json();
  allProducts = data.products;
  displayProducts(allProducts);
}

function displayProducts(products) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Rating:</strong> ${product.rating}</p>
    `;
    grid.appendChild(card);
  });
}

function handleSearch() {
  const input = document.getElementById('searchInput').value.trim();
  if (!input) {
    alert("Please enter a search term.");
    return;
  }
  fetchProducts(input);
}

function sortProducts() {
  const option = document.getElementById('sortOption').value;
  let sorted = [...allProducts];

  switch (option) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating-asc":
      sorted.sort((a, b) => a.rating - b.rating);
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }

  displayProducts(sorted);
}

// Load all products initially
fetchProducts();
