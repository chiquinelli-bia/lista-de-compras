let listaDeCompras;

const form = document.getElementById("form-itens");
const inputForm = document.getElementById("receber-item");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  salvarItem();
});

function salvarItem() {
  const itemCompras = inputForm.value;
  listaDeCompras.push({ valor: itemCompras });
}
