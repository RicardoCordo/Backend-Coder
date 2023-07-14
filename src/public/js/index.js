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


let user;
let chatBox = document.querySelector("#chatBox");

Swal.fire({
  title: "Bienvenido",
  text: "Ingrese su email",
  input: "text",
  inputValidator: value => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.match(regex)) {
      return `Debes ingresar tu mail para usar el chat.`;
    }
  },
  allowOutsideClick: false,
  allowEscapeKey: false
}).then(result => {
  user = result.value;
  socket.emit("user", { user, message: "Se unio al chat." });
});

//no me toma este addEventListener
chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    socket.emit("message", { user, message: chatBox.value });
    chatBox.value = "";
  }
});

socket.on("messagesLogs", data => {
  let log = document.querySelector("#messageLogs");
  let messages = "";
  data.forEach(message => {
    messages += `<p><strong>${message.user}</strong>: ${message.message}</p>`;
  });
  log.innerHTML = messages;
});