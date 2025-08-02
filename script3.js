const form = document.getElementById("bikeOrderForm");
const message = document.getElementById("orderMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const model = document.getElementById("model").value;
  const color = document.getElementById("color").value.trim();

  if (name && model && color) {
    message.textContent = `Thank you, ${name}! Your order for a ${color} ${model} has been placed successfully.`;
    form.reset();
  } else {
    message.textContent = "Please fill out all fields correctly.";
  }
});
