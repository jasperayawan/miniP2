
// document.querySelector() method - para magselect ng HTML elements gamit yung class name nila

const productsContainer = document.querySelector('.products');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceContainer = document.querySelector('.total-price');
const cartCount = document.querySelector('#cart-count');
const resetButton = document.querySelector('.reset-cart');
const checkoutButton = document.querySelector('.checkout-button');


// ito yung empty array
let cartItems = [];

// ito icheck nya yung local storage ng browser. if merong nakasave, iload nito sa cartItems array gamin yung method na JSON.parse()
if (localStorage.getItem('cartItems')) {
  cartItems = JSON.parse(localStorage.getItem('cartItems'));
  updateCartCount();
  updateCart(); 
}

//updateCart() para idisplay yung cart items
//updateCartCount() para bilanging yung quantity ng cart at mag-appear sa cart icon


// Add event listener for add to cart button, you can change the click and clickevent depende kung ano gusto mo
productsContainer.addEventListener('click', (clickeventObject) => {
  if (clickeventObject.target.classList.contains('add-to-cart')) {
    const product = clickeventObject.target.closest('.product');
    const name = product.dataset.name;
    const price = Number(product.dataset.price);
    const code = product.dataset.code;
    const quantity = Number(product.querySelector('input[type="number"]').value);
    addItemToCart(name, price, quantity, code);
    updateCart();
    saveCartItems();
    updateCartCount();
  }

});



//FUNCTION 1 Calculate the total quantity of all items in the cart
function updateCartCount() {
  let count = 0;
  for (const item of cartItems) {
    count += item.quantity;
  }
  // Update the cart count element with the new count
  cartCount.textContent = count;
}

//Function 2 Add item to SHOPPING CART
function addItemToCart(name, price, quantity, code) {
  // Check if item is already in cart
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === name && cartItems[i].code === code) {
      cartItems[i].quantity += quantity;
      return;

    }
  }
  // Add item to cart
  cartItems.push({ name, price, quantity, code });
     // show a success message
     alert("Product added to cart!");

 
}

//FUNCTION 3 Update cart
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let totalQuantity = 0;
  let totalPrice = 0;
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>Product</th>
      <th>Code</th>
      <th>Quantity</th>
      <th>Price/Qty</th>
      <th>Total Price</th>
      <th>Remove</th>
    </tr>
  `;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = document.createElement('tr');
    cartItem.innerHTML = `
      <td class="product-name">${cartItems[i].name}</td>
      <td class="product-code">${cartItems[i].code}</td>
      <td><input type="number" class="cart-item-quantity" min="0" value="${cartItems[i].quantity}" data-index="${i}"></td>
      <td class="product-price">₱${cartItems[i].price}</td>
      <td class="product-price">₱${cartItems[i].price * cartItems[i].quantity}</td>
      <td><button class="remove-item" data-index="${i}">x</button></td>
    `;
    table.appendChild(cartItem);
    totalQuantity += cartItems[i].quantity;
    totalPrice += cartItems[i].price * cartItems[i].quantity;
  }
  cartItemsContainer.appendChild(table);
  totalPriceContainer.innerHTML = `Total Quantity: ${totalQuantity} | Grand Total: ₱${totalPrice.toFixed(2)}`;
}

// Add event listener to change sa shopping cart (3-days ko ito nalaman, kaloka!)

cartItemsContainer.addEventListener('change', (changeeventObject) => {
  if (changeeventObject.target.classList.contains('cart-item-quantity')) {
    const index = changeeventObject.target.dataset.index;
    const newQuantity = Number(changeeventObject.target.value);
    cartItems[index].quantity = newQuantity;
    updateCart();
    saveCartItems();
    updateCartCount();
  }
});


//FUNCTION 4 Save cart items to local storage
function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add event listener for remove item button
cartItemsContainer.addEventListener('click', (removeitemObject) => {
  if (removeitemObject.target.classList.contains('remove-item')) {
    const index = removeitemObject.target.dataset.index;
    cartItems.splice(index, 1);
    updateCartCount();
    updateCart();
    saveCartItems(); 
  }
});


resetButton.addEventListener('click', () => {
  // Clear the cart items array and update the cart
  cartItems = [];
  updateCart();
  updateCartCount();

  // Clear the local storage
  localStorage.removeItem('cartItems');
});



// Checkout button

checkoutButton.addEventListener('click', () => {
  // Save the order to local storage
  saveOrderToLocalStorage();
  // Show the modal
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
});

// FUNCTION 5 to save the order to local storage
function saveOrderToLocalStorage() {
  // Get the current date and time
  const now = new Date();
  // Create a new order object with the current date and time, cart items and total price
  const order = {
    date: now.toLocaleString(),
    items: cartItems,
    total: getTotalPrice()
  };
  // Get the existing orders from local storage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  // Add the new order to the orders array
  orders.push(order);
  // Save the updated orders array to local storage
  localStorage.setItem('orders', JSON.stringify(orders));
}

// FUNCTION 6 to get the total price of the cart items
function getTotalPrice() {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}

// Order confirmation modal
const close = document.querySelector('.close');
const confirmButton = document.querySelector('.confirm-order');
const modal = document.querySelector('.modal');
close.addEventListener('click', () => {
  // Hide the modal when close button is clicked
  modal.style.display = 'none';
});
confirmButton.addEventListener('click', () => {
  // Confirmation button click handler
  alert('Your order has been confirmed!');
  // Clear the cart items array and update the cart
  cartItems = [];
  updateCartCount();
  updateCart();
  // Clear the local storage
  localStorage.removeItem('cartItems');
  // Hide the modal
  modal.style.display = 'none';

  
});


// Wishlist (Add sa counter and update if may naremove)
const wishlistBtns = document.querySelectorAll(".add-to-wishlist");

wishlistBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const product = btn.parentElement.parentElement.dataset;
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    displayWishlistItems();
  });
});

function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlist-count");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistCount.textContent = wishlist.length;
}

function displayWishlistItems() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistItems = document.getElementById("wishlist-items");
  wishlistItems.innerHTML = "";

  wishlist.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlistCount();
      displayWishlistItems();
    });

    li.appendChild(removeBtn);
    wishlistItems.appendChild(li);
  });
}

window.addEventListener("load", () => {
  updateWishlistCount();
  displayWishlistItems();
});


// Function for the Reset Wishlist

function resetWishlist() {
  // Clear the localStorage
  localStorage.removeItem("wishlist");

  // Reset the count in the header
  const wishlistCount = document.getElementById("wishlist-count");
  wishlistCount.textContent = "0";

  // Remove all items from the displayed list
  const wishlistItems = document.getElementById("wishlist-items");
  wishlistItems.innerHTML = "";
}

const resetBtn = document.getElementById("reset-wishlist");
resetBtn.addEventListener("click", resetWishlist);



