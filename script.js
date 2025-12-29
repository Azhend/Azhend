let basket = JSON.parse(localStorage.getItem("basket")) || [];

function updateBasketCount() {
  const countEl = document.getElementById("basketCount");
  if (countEl) countEl.textContent = basket.length;
}

function addToBasket(name, price, file) {
  basket.push({ name, price, file });
  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasketCount();
  alert(name + " added to basket");
}

function renderBasket() {
  const itemsDiv = document.getElementById("basket-items");
  const totalSpan = document.getElementById("basketTotal");

  if (!itemsDiv || !totalSpan) return;

  itemsDiv.innerHTML = "";
  let total = 0;

  if (basket.length === 0) {
    itemsDiv.innerHTML = "<p>Your basket is empty.</p>";
    totalSpan.textContent = "0.00";
    return;
  }

  basket.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "basket-item";
    div.innerHTML = `
      <span>${item.name} – £${item.price.toFixed(2)}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    itemsDiv.appendChild(div);
  });

  totalSpan.textContent = total.toFixed(2);
}

function removeItem(index) {
  basket.splice(index, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasketCount();
  renderBasket();
}

document.addEventListener("DOMContentLoaded", () => {
  updateBasketCount();
  renderBasket();
});

