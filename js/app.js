// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   ready();
// }

function showTotals() {
  const total = [];
  const items = document.querySelectorAll(".cart-item-price");

  items.forEach(function (item) {
    total.push(parseFloat(item.textContent));
  });

  const totalMoney = total.reduce(function (total, item) {
    total += item;
    return total;
  }, 0);

  const finalMoney = totalMoney.toFixed(2);

  document.getElementById("cart-total").textContent = finalMoney;
  document.querySelector(".item-total").textContent = finalMoney;
  document.getElementById("item-count").textContent = total.length;
}

// filter buttons
const store = document.getElementById("store-items");

function filterStore(selection) {
  if (selection === "all") {
    for (let i = 0; i < store.childElementCount; i++) {
      store.children[i].classList.remove("hide");
      store.children[i].classList.add("show");
    }
  } else {
    for (let i = 0; i < store.childElementCount; i++) {
      if (store.children[i].dataset.item === selection) {
        store.children[i].classList.remove("hide");
        store.children[i].classList.add("show");
      } else {
        store.children[i].classList.remove("show");
        store.children[i].classList.add("hide");
      }
    }
  }
}

const filterBtn = document.querySelectorAll(".filter-btn");

/* Clicking on the store filter buttons */
filterBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    filterStore(event.target.dataset.filter);
  });
});

function removeAll() {
  var cartItems = document.getElementsByClassName("cart")[0];
  let numItems =
    cartItems.childElementCount -
    2; /* Minus two because the buttons are elements too */
  for (let i = 0; i < numItems; i++) {
    setTimeout(() => {
      cartItems.children[i].classList.add("empty-cart");
    }, i * 50);
  }
  setTimeout(() => {
    while (cartItems.childElementCount > 2) {
      cartItems.removeChild(cartItems.children[0]);
    }
    showTotals();
    cart.classList.toggle("show-cart");
  }, numItems * 50);
}

// purchase button
document
  .getElementsByClassName("btn-purchase")[0]
  .addEventListener("click", purchaseClicked);

function purchaseClicked() {
  const purchased = document.getElementById("confirmation-2");
  purchased.classList.add("show-confirmation");
  setTimeout(() => {
    purchased.classList.remove("show-confirmation");
  }, 3000);
  //alert("Thank you for your purchase");

  removeAll();
}

// clear cart button
document
  .getElementsByClassName("btn-clear")[0]
  .addEventListener("click", clearCart);

function clearCart() {
  removeAll();
}

// delete item

var removeCartItemButtons = document.getElementsByClassName("fa-trash");

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  showTotals();
}

for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}

// show cart

(function () {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  cartInfo.addEventListener("click", function () {
    cart.classList.toggle("show-cart");
  });
})();

// add items to cart
(function () {
  const cartBtn = document.querySelectorAll(".store-item-icon");

  cartBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath = event.target.parentElement.previousElementSibling.src;

        let pos = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(pos);

        const item = {};
        item.img = `img-cart${partPath}`;

        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        item.name = name;

        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;

        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;

        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );

        cartItem.innerHTML = `<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="cart-item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>      
            </div>
            `;

        // select cart
        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, total);
        cartItem
          .getElementsByClassName("fa-trash")[0]
          .addEventListener("click", removeCartItem);
        const confirm = document.getElementById("confirmation");
        confirm.classList.add("show-confirmation");
        setTimeout(() => {
          confirm.classList.remove("show-confirmation");
        }, 3000);
        //alert("Item added to cart");
        showTotals();
      }
    });
  });
})();
