

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
const headerNav = document.querySelector('body');

const Email = sessionStorage.getItem("Email");
const Password = sessionStorage.getItem('Password');


productsContainer.addEventListener('click', (clickeventObject) => {
  if(Email != "" && Password != ""){
    // alert('login first', )
    // window.location.assign('login.html')
    // goToMarketplace()
    let pop_up_message = document.createElement('div')
    pop_up_message.classList.add('messageAppear');
    headerNav.appendChild(pop_up_message);

    pop_up_message.innerHTML += `<h5>Oops!, you're not login!</h5>
      <div class="loginfirst_container"> <button onclick ="goToMarketplace()">Login now!</button> </div>
    `
  }else if (clickeventObject.target.classList.contains('add-to-cart')) {
      const product = clickeventObject.target.closest('.product');
      const name = product.dataset.name;
      const price = Number(product.dataset.price);
      const code = product.dataset.code;
      const quantity = Number(product.querySelector('input[type="number"]').value);
      addItemToCart(name, price, quantity, code);
      updateCart();
      updateCartCount();
      saveCartItems();
    }
  
});

function goToMarketplace() {
  window.location.assign('login.html');
}
 

function btnLogout(){
  window.location.assign('login.html') 
}




//Function 1 Add item to SHOPPING CART
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

//FUNCTION 2 Update cart
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
      <th>Total</th>
      <th></th>
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
      <td><button class="remove-item" data-index="${i}">Remove</button></td>
    `;
    table.appendChild(cartItem);
    totalQuantity += cartItems[i].quantity;
    totalPrice += cartItems[i].price * cartItems[i].quantity;
  }
  cartItemsContainer.appendChild(table);
  totalPriceContainer.innerHTML = `<span class='total'>Total Quantity</span>: ${totalQuantity} <br> <span class='total'>Grand Total</span>: ₱${totalPrice.toFixed(2)}`;
}

//FUNCTION 3 Calculate the total quantity of all items in the cart
function updateCartCount() {
    let count = 0;
    for (const item of cartItems) {
      count += item.quantity;
    }
    // Update the cart count element with the new count
    cartCount.textContent = count;
  }

// Add event listener to change sa shopping cart (3-days ko ito nalaman, kaloka!)

cartItemsContainer.addEventListener('change', (changeeventObject) => {
  if (changeeventObject.target.classList.contains('cart-item-quantity')) {
    const index = changeeventObject.target.dataset.index;
    const newQuantity = Number(changeeventObject.target.value);
    cartItems[index].quantity = newQuantity;
    updateCart();
    updateCartCount();
    saveCartItems();
    
  }
});


//FUNCTION 4 Save cart items to local storage
function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add event listener for remove item button
cartItemsContainer.addEventListener('click', (removeitemObject) => {
  if (removeitemObject.target.classList.contains('remove-item')) {
    if (confirm("Are you sure you want to remove this item from your cart?")) {
      const index = removeitemObject.target.dataset.index;
      cartItems.splice(index, 1);
      updateCart();
      updateCartCount();
      saveCartItems();
    }
  }
});


// Select the button that triggers cart clearing
const clearCartButton = document.querySelector('.reset-cart');

// Add an event listener to the button
clearCartButton.addEventListener('click', function() {

  // Ask for confirmation before clearing the cart
  const confirmClear = confirm('Are you sure you want to remove ALL ITEMS on your cart?');

  if (confirmClear) {
    // Clear the cart items array and update the cart
    cartItems = [];
    updateCart();
    updateCartCount();

    // Clear the local storage
    localStorage.removeItem('cartItems');
  }
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
  
  updateCart();
  updateCartCount();
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
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlistCount();
      displayWishlistItems();
    });

    const cartBtn = document.createElement("button");
    cartBtn.textContent = "Add to Cart";
    cartBtn.classList.add("cart-btn");
    cartBtn.addEventListener("click", () => {
      addItemToCart(item.name, item.price, 1, item.code);
      updateCart();
      updateCartCount();
      saveCartItems();
    });

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(cartBtn);

    li.appendChild(btnContainer);
    wishlistItems.appendChild(li);
  });
}

function updateWishlist() {
  updateWishlistCount();
  displayWishlistItems();
}

// Call updateWishlist() on page load
updateWishlist();




function resetWishlist() {
  // Display a confirmation dialog box
  const confirmed = confirm("Are you sure you want to reset your wishlist?");

  if (confirmed) {
    // Clear the localStorage
    localStorage.removeItem("wishlist");

    // Reset the count in the header
    const wishlistCount = document.getElementById("wishlist-count");
    wishlistCount.textContent = "0";

    // Remove all items from the displayed list
    const wishlistItems = document.getElementById("wishlist-items");
    wishlistItems.innerHTML = "";
  }
}

const resetBtn = document.getElementById("reset-wishlist");
resetBtn.addEventListener("click", resetWishlist);






const popUpMessage = document.createElement('div');
popUpMessage.classList.add('pop-up-message');
popUpMessage.innerHTML = `<div class="div-child"> 
    <div class="alert alert-success mx-3" role="alert">
    <button class="btn--close-cookie btn-close"></button>
    <p style="font-size: 14px; text-align: justify; color: black">
      DISCLAIMER: We are committed to providing our customers with the
      freshest and highest quality local produce possible. However, we
      understand that sometimes customers may wish to purchase produce from
      outside their location radius. Please note that if you choose to
      purchase produce outside your location radius, you may incur
      additional costs for delivery and handling. We will do our best to
      ensure that your order arrives in a timely manner and in good
      condition, but we cannot guarantee the same level of freshness or
      quality as our local produce. If you choose to proceed with your
      order, you acknowledge and accept these potential consequences and
      costs. We appreciate your understanding and support in our efforts to
      promote sustainable and locally sourced produce.
   
    </p>
  </div>
    </div>
    `


popUpMessage.style.display = "flex";
popUpMessage.style.justifyContent = "center";
popUpMessage.style.alignItems = "center";
headerNav.append(popUpMessage);

document.querySelector('.btn--close-cookie').addEventListener('click', function(){
    // popUpMessage.parentElement.removeChild(popUpMessage)
    popUpMessage.remove();
})



function toggleBtn(){
  let displayHandling = document.getElementById('profile_List')
  
  if(displayHandling.style.display === 'flex'){
      displayHandling.style.display = 'none'
  } else{
      displayHandling.style.display = 'flex'
  }
}

const cartIcon = document.getElementById('cart-icon')

cartIcon.addEventListener('click', function(){
  let cartcontainer = document.querySelector('.cart_container')

  if(cartcontainer.style.display === 'block'){
    cartcontainer.style.display = 'none';
  } else {
    cartcontainer.style.display = 'block'
  }
  closeContainercart()
})

function closeContainercart(){
  const closeBtn = document.getElementById('btn_close')

  closeBtn.addEventListener('click', () => {
    let closeContainer = document.querySelector('.cart_container')
    closeContainer.style.display = 'none'
  })
}

const wishlistIcon = document.getElementById('wishlist-icon');
const wishlistItemsContainer = document.querySelector('.wishlist-items-container');

wishlistIcon.addEventListener('click', () => {
  let cartcontainer = document.querySelector('.cart_container')

  if(cartcontainer.style.display === 'block'){
    cartcontainer.style.display = 'none';
  } else {
    cartcontainer.style.display = 'block'
  }
  closeContainercart()
})

function closeContainercart(){
  const closeBtn = document.getElementById('btn_close')

  closeBtn.addEventListener('click', () => {
    let closeContainer = document.querySelector('.cart_container')
    closeContainer.style.display = 'none'
  })
}




const paymentForm = document.querySelector('#payment-form');

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate the payment details
  const cardNumber = document.querySelector('#card-number').value;
  const expiryDate = document.querySelector('#expiry-date').value;
  const cvv = document.querySelector('#cvv').value;

  // Add your payment validation logic here
  // ...

  // If payment is valid, confirm the order
  alert('Your payment has been processed. Thank you for your order!');
  // Clear the cart items array and update the cart
  cartItems = [];
  updateCart();
  updateCartCount();
  // Clear the local storage
  localStorage.removeItem('cartItems');
  // Hide the payment form
  paymentForm.style.display = 'none';
});















  

  