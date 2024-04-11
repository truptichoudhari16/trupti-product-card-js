document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[name="category"]');
  let productsContainer;

  // Function to display products
  function displayProducts(categories) {
    productsContainer.innerHTML = "";
    categories.forEach((category) => {
      category.category_products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-card");

        productElement.innerHTML = `<div class="productItems">
        <div class="cardstyle">
                <img src=${product.image}>
                <br/>
                <p>${product.vendor}</p>
                <br/>
                <p>${product.badge_text}</p>
                <br/>
                <p>Price Rs. ${product.price} | <span>${product.compare_at_price}</span></p>
                <br/>
                <h4>${product.title}</h4>
                </div>
                </div> `;
        productsContainer.appendChild(productElement);
      });
    });
  }

  // Function to filter products based on selected categories
  function filterProducts(categories, selectedCategories) {
    if (selectedCategories.length === 0) {
      displayProducts(categories); //products display
    } else {
      const filteredProducts = categories.filter((category) =>
        selectedCategories.includes(category.category_name)
      );
      displayProducts(filteredProducts);
    }
  }

  // Fetch data from the API
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      productsContainer = document.getElementById("products-container");
      // Display all products first when no checkbox is checked
      displayProducts(data.categories);
      // Event listener for all the checkboxes
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          const selectedCategories = Array.from(
            document.querySelectorAll('input[name="category"]:checked')
          ).map((cb) => cb.value);
          filterProducts(data.categories, selectedCategories);
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
