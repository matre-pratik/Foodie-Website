const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const bars = document.querySelector(".hamburger i");

//  Hamburger Menu
if (hamburger) {
  hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenu.classList.toggle("mobile-menu-active");

    if (bars.classList.contains("fa-bars")) {
      bars.classList.remove("fa-bars");
      bars.classList.add("fa-xmark");
    } else {
      bars.classList.remove("fa-xmark");
      bars.classList.add("fa-bars");
    }
  });
}


//  Cart open/close
if(cartIcon){
  cartIcon.addEventListener("click", () =>
  cartTab.classList.add("cart-tab-active")
);
}

if(closeBtn){
  closeBtn.addEventListener("click", () =>
  cartTab.classList.remove("cart-tab-active")
);
}


let productList = [];
let cartProduct = [];

const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach(item => {
    const quantity = parseInt(item.querySelector(".quantity-value").textContent);
    const price = parseFloat(item.querySelector(".item-total").textContent.replace(`$`, ""));
    totalPrice += price;
    totalQuantity += quantity;
  });

  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = `${totalQuantity}`;
};


const showCards = () => {
  if (!cardList) return;

  cardList.innerHTML = ""; 

  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");
    orderCard.innerHTML = `
      <div class="card-img">
          <img src="${product.image}" alt="${product.name}" />
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="" class="btn card-btn">Add to cart</a>
    `;
    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");
    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};



const addToCart = (product) => {
  const exitingProduct = cartProduct.find(item => item.id === product.id);

  if (exitingProduct) {
    alert("Item already in your cart..!");
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace("$", ""));

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = `
    <div class="item-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="detail">
      <h4>${product.name}</h4>
      <h4 class="item-total">${product.price}</h4>
    </div>
    <div class="flex">
      <a href="" class="quantity-btn minus">
        <i class="fa-solid fa-minus"></i>
      </a>
      <h4 class="quantity-value">${quantity}</h4>
      <a href="" class="quantity-btn plus">
        <i class="fa-solid fa-plus"></i>
      </a>
    </div>
  `;
  cartList.appendChild(cartItem);
  updateTotals();

  const plusBtn = cartItem.querySelector(".plus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotals();
  });

  const minusBtn = cartItem.querySelector(".minus");
  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      cartItem.classList.add("slide-out");
      setTimeout(() => {
        cartItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== product.id);
        updateTotals();
      }, 300);
    }
  });
};

//  Fetch Products
const initApp = () => {
  fetch("http://localhost:3000/product")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    })
    .catch((err) => console.error("Error fetching products:", err));
};

initApp();

//  Add Product Form Logic
const productForm = document.getElementById("productForm");
if (productForm) {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").value;

    const newProduct = {
      id: Date.now().toString(),
      name: name,
      price: price,
      image: image
    };

    fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product added:", data);
        productList.push(data);
        showCards();
        productForm.reset();
      })
      .catch((err) => console.error("Error adding product:", err));
  });
}
