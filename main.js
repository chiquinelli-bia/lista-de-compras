let listaDeCompras;

const form = document.getElementById("form-itens");
const inputForm = document.getElementById("receber-item");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  salvarItem();
});

function salvarItem() {
  const itemCompras = inputForm.value;
  const checarDuplicado = listaDeCompras.some(
    (item) => elemento.valor.toUpperCase() === itemCompras.toUpperCase()
  );
  if (checarDuplicado) {
    alert("item já existe na lista de compra");
  } else {
    listaDeCompras.push({ valor: itemCompras });
  }
}
