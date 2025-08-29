let listaDeCompras = [];
let itemAEditar;

const form = document.getElementById("form-itens");
const inputForm = document.getElementById("receber-item");
const ulLista = document.getElementById("lista-de-itens");
const ulListaComprados = document.getElementById("itens-comprados");
const listaTratada = localStorage.getItem("listaDeCompras");

function atualizarLocalStorage() {
  localStorage.setItem("listaDeCompras", JSON.stringify(listaDeCompras));
}
if (listaTratada) {
  listaDeCompras = JSON.parse(listaTratada);
  mostrarItens();
} else {
  listaDeCompras = [];
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  salvarItem();
  mostrarItens();
  inputForm.focus();
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
  inputForm.value = "";
}
function mostrarItens() {
  ulLista.innerHTML = "";
  ulListaComprados.innerHTML = "";
  listaDeCompras.forEach((item, index) => {
    if (item.check) {
      ulListaComprados.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />
            <span class="itens-comprados is-size-5">${item.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
    } else {
      ulLista.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
              <input type="checkbox" class="is-clickable" />
              <input type="text" class="is-size-5" value="${item.valor}" ${
        index !== Number(itemAEditar) ? "disabled" : ""
      }></input>
          </div>
          <div>
              ${
                index === Number(itemAEditar)
                  ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>'
                  : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'
              }
              <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
      </li>`;
    }
  });
  const itensCheck = document.querySelectorAll('input[type="checkbox"]');
  itensCheck.forEach((i) => {
    i.addEventListener("click", (evento) => {
      const indiceDoElemento =
        evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeCompras[indiceDoElemento].check = evento.target.checked;
      mostrarItens();
    });
  });
  const deletarItem = document.querySelectorAll(".deletar");
  deletarItem.forEach((i) => {
    i.addEventListener("click", (evento) => {
      const indiceDoElemento =
        evento.target.parentElement.parentElement.getAttribute("data-value");
      listaDeCompras.splice(indiceDoElemento, 1);
      mostrarItens();
    });
  });
  const editarItem = document.querySelectorAll(".editar");
  editarItem.forEach((i) => {
    i.addEventListener("click", (evento) => {
      itemAEditar =
        evento.target.parentElement.parentElement.getAttribute("data-value");
      mostrarItens();
      console.log(itemAEditar);
    });
  });
  atualizarLocalStorage();
}
function salvarEdicao() {
  const itemEditado = document.querySelector(
    `[data-value="${itemAEditar}"] input[type="text"]`
  );
  listaDeCompras[itemAEditar].valor = itemEditado.value;
  itemAEditar = -1;
  mostrarItens();
}
