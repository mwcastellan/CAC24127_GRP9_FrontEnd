document.addEventListener("DOMContentLoaded", init);
const URL_API = "https://tpo-nodejs-bb.vercel.app/pedidos";

var customers = []; 
 
function init() {
  search();
}

function agregarPedido() {
  clean();
  abrirFormulario();
}

function abrirFormulario() {
  htmlModal = document.getElementById("pedidos_modal");
  htmlModal.setAttribute("class", "pedidos_modale pedidos_opened");
}

function cerrarModal() {
  htmlModal = document.getElementById("pedidos_modal");
  htmlModal.setAttribute("class", "pedidos_modale");
}

// TRAER PEDIDOS
async function search() {
  var url = URL_API;
  var response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  pedidos = await response.json();
  var html = "";
  for (pedido of pedidos) {
    var row = `<tr>
    <td>${pedido.id}</td>
    <td>${pedido.FECHA_COMPRA}</td>
    <td>${pedido.IDCLIENTE}</td>
    <td>${pedido.IDPRODUCTO}</td>
    <td>${pedido.PRECIO}</td>
    <td>${pedido.CANTIDAD}</td>
    <td>${pedido.IMPORTE}</td>
    <td>${pedido.IDESTADO}</td>
    <td>
      <a href="#" onclick="edit(${pedido.id})" class="pedidos_myButton">Editar</a>
      <a href="#" onclick="remove(${pedido.id})" class="pedidos_btnDelete">Eliminar</a>
    </td>
  </tr>`;
    html = html + row;
  }

  document.querySelector("#pedidos > tbody").outerHTML = html;
}

function edit(id) {
  abrirFormulario();
  var pedido = pedidos.find((x) => x.id == id);
  document.getElementById("txtid").value = id;
  document.getElementById("txtfecha_compra").value = pedido.FECHA_COMPRA;
  document.getElementById("txtidcliente").value = pedido.IDCLIENTE;
  document.getElementById("txtidproducto").value = pedido.IDPRODUCTO;
  document.getElementById("txtprecio").value = pedido.PRECIO;
  document.getElementById("txtcantidad").value = pedido.CANTIDAD;
  document.getElementById("txtimporte").value = pedido.IMPORTE;
  document.getElementById("txtidestado").value = pedido.IDESTADO;
}

// ELIMINAR PEDIDO - PENDIENTE
async function remove(id) {
  respuesta = confirm("¿Está seguro de eliminar el Pedido Nro: " + id + " ?");
  if (respuesta) {
    var url = URL_API + "/" + id;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200)
          alert("Eliminar: Pedido eliminado correctamente");
        else alert("Eliminar(then): Error al grabar: " + response.status);
      })
      .catch((err) => {
        alert("Eliminar: Error al grabar: " + err.status);
      });
    window.location.reload();
  }
}

function clean() {
  document.getElementById("txtid").value = 0;
  document.getElementById("txtfecha_compra").value = "";
  document.getElementById("txtidcliente").value = 0;
  document.getElementById("txtidproducto").value = 0;
  document.getElementById("txtprecio").value = 0;
  document.getElementById("txtcantidad").value = 0;
  document.getElementById("txtimporte").value = 0;
  document.getElementById("txtidestado").value = 1;
  document.getElementById("txtmsg").value = "Mensaje";
}

// ALTA O MODIFICACION DE PEDIDOS
async function save() {
  var data = {
    FECHA_COMPRA: document.getElementById("txtfecha_compra").value,
    IDCLIENTE: document.getElementById("txtidcliente").value,
    IDPRODUCTO: document.getElementById("txtidproducto").value,
    PRECIO: document.getElementById("txtprecio").value,
    CANTIDAD: document.getElementById("txtcantidad").value,
    IMPORTE: document.getElementById("txtimporte").value,
    IDESTADO: document.getElementById("txtidestado").value,
  };
  var id = document.getElementById("txtid").value;
  // ALTA //
  if (id == "0") {
    var url = URL_API + "/";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status == 200)
          document.getElementById("txtmsg").value =
            "Alta: Pedido agregado correctamente";
        else
          document.getElementById("txtmsg").value =
            "Alta: Error al grabar:" + response.status;
      })
      .catch((err) => {
        err.response &&
          err.response.data &&
          this.setState({ apiResponse: err.response.data });
      });
  }
  // MODIFICACION
  else {
    var url = URL_API + "/" + id;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status == 200)
          document.getElementById("txtmsg").value =
            "Modificacion: Pedido modificado correctamente";
        else
          document.getElementById("txtmsg").value =
            "Modificacion: Error al grabar:" + response.status;
      })
      .catch((err) => {
        err.response &&
          err.response.data &&
          this.setState({ apiResponse: err.response.data });
      });
  }
}
