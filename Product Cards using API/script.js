let productDiv = document.querySelector(".product");
let CategorylistDiv = document.querySelector(".categorylist");
let allCat = [];

let displayProduct = async (allCheckCat = [], searchQuery = "") => {
  productDiv.innerHTML = "";
  try {
    let response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    let data = await response.json();

    // Check if data contains 'categories' property
    if (data && data.categories && Array.isArray(data.categories)) {
      data.categories.forEach((category) => {
        if (
          allCheckCat.length === 0 ||
          allCheckCat.includes(category.category_name)
        ) {
          category.category_products.forEach((item) => {
            // Category ka data display hora hai - means three categories names
            if (!allCat.includes(category.category_name)) {
              allCat.push(category.category_name);
            }

            if (
              (searchQuery === "" ||
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.vendor
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())) &&
              (allCheckCat.length === 0 ||
                allCheckCat.includes(category.category_name))
            ) {
              // Category ke items display hore hai

              // Check if all necessary properties exist in each item
              if (
                item &&
                item.image &&
                item.price &&
                item.title &&
                item.vendor
              ) {
                productDiv.innerHTML += `<div class="productItems">
                <div class="cardstyle">
                  <img
                    src="${item.image}"
                    alt=""
                  />
    
                  <p>${item.vendor}</p>
                  <hr />
                  <p>${item.badge_text}</p>
                  <p>Price Rs. ${item.price} | ${item.compare_at_price}</p>
                  <h4>${item.title}</h4>
                </div>
              </div>`;
              }
            }
          });
        }
      });

      // Category ka data display hora hai - means three categories names
      // Create checkboxes for categories
      CategorylistDiv.innerHTML = allCat
        .map((categoryName) => {
          const checked = allCheckCat.includes(categoryName) ? "checked" : "";
          return `<label><input type="checkbox" ${checked} onclick='categoryFilter()' value="${categoryName}">${categoryName}</label>`;
        })
        .join("");
    } else {
      console.error("Invalid data format:", data);
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
};

displayProduct();

// category filter
let categoryFilter = () => {
  let checkInput = document.querySelectorAll("input[type='checkbox']");
  let checkdata = [];
  checkInput.forEach((e) => {
    if (e.checked) {
      checkdata.push(e.value);
    }
  });

  let searchQuery = document.getElementById("searchInput").value;
  displayProduct(checkdata, searchQuery);
};

// Search input box event listener
document
  .getElementById("searchInput")
  .addEventListener("input", categoryFilter);
