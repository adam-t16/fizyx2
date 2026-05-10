// CART STORAGE KEY
const CART_KEY = "fizyx-cart";

function getCart(){
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ADD PRODUCT
function addToCart(name, price, image, category){

  let cart = getCart();

  cart.push({
    name,
    price,
    image,
    category
  });

  saveCart(cart);

  updateCartCount();
  alert(name + " ajouté au panier 🛒");
}

// UPDATE BADGE COUNT
function updateCartCount(){

  const cart = getCart();
  const badge = document.querySelector(".badge");

  if(badge){
    badge.textContent = cart.length;
  }
}

// RENDER CART PAGE
function renderCart(){

  const cart = getCart();
  const container = document.getElementById("cartItems");

  let subtotal = 0;

  if(!container) return;

  container.innerHTML = "";

  if(cart.length === 0){
    container.innerHTML = `<div class="empty">Votre panier est vide</div>`;
    updateTotal(0);
    return;
  }

  cart.forEach((item, index) => {

    subtotal += item.price;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div class="item-info">
          <div class="item-category">${item.category}</div>
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.price} DH</div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">
          Supprimer
        </button>
      </div>
    `;
  });

  updateTotal(subtotal);
}

// UPDATE TOTAL
function updateTotal(total){

  const sub = document.getElementById("subtotal");
  const tot = document.getElementById("total");

  if(sub) sub.textContent = total + " DH";
  if(tot) tot.textContent = total + " DH";
}

// REMOVE ITEM
function removeItem(index){

  let cart = getCart();

  cart.splice(index, 1);

  saveCart(cart);

  renderCart();
  updateCartCount();
}

function initCartUI(){
  updateCartCount();
  renderCart();
}

document.addEventListener("DOMContentLoaded", initCartUI);