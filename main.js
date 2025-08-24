let listaDeCompras = [];

const form = document.getElementById("form-itens");
const inputForm = document.getElementById("receber-item");
const ulLista = document.getElementById("lista-de-itens");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  salvarItem();
  mostrarItens();
});

function salvarItem() {
  const itemCompras = inputForm.value;
  const checarDuplicado = listaDeCompras.some(
    (item) => item.valor.toUpperCase() === itemCompras.toUpperCase()
  );
  if (checarDuplicado) {
    alert("item já existe na lista de compra");
  } else {
    listaDeCompras.push({ valor: itemCompras, check: false });
  }
}
function mostrarItens() {
  ulLista.innerHTML = "";
  listaDeCompras.forEach((item, index) => {
    ulLista.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${item.valor}"></input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
  });
  const itensCheck = document.querySelectorAll('input[type="checkbox"]');
  itensCheck.forEach((i) => {
    i.addEventListener("click", (evento) => {
      const indiceDoElemento =
        evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeCompras[indiceDoElemento].check = evento.target.checked;
      console.log(listaDeCompras[indiceDoElemento].check);
    });
  });
}
