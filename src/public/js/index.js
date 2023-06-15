const socket = io();

function updateProducts(products) {
  const ul = document.querySelector("ul");
  ul.innerHTML = '';

  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = product.title;
    ul.appendChild(li);
  });
};

socket.on("products", products => {
  updateProducts(products);
});

