window.addEventListener("load", () => {
  cargarPedidos();
});
// funcion que carga y muestra
const cargarPedidos = async () => {
  try {
    let respuesta = await fetch("https://tpo-nodejs-bb.vercel.app/pedidos");
    if (respuesta.status == 200) {
      let datos = await respuesta.json();
      let contenedor = `<table class="Pedidos">`;
      datos.forEach((pedido) => {
        // Pedidos
        contenedor += `<tr class="Pedido">
                       <td class="itemp id">${pedido.id}</td>
                       <td class="itemp fecha_compra">${pedido.FECHA_COMPRA}</td>
                       <td class="itemp idcliente">${pedido.IDCLIENTE}</td>
                       <td class="itemp idproducto">${pedido.IDPRODUCTO}</td>
                       <td class="itemp cantidad">${pedido.CANTIDAD}</td>
                       <td class="itemp precio">${pedido.PRECIO}</td>
                       <td class="itemp importe">${pedido.IMPORTE}</td>
                       <td class="itemp estado">${pedido.IDESTADO}</td>
                       </tr>    `;
      });
      contenedor += `</table">`;
      document.querySelector(".Contenedor").innerHTML = contenedor;
    } else if (respuesta.status === 404) {
      console.log("error 404 nos vemos en otro lugar");
    }
  } catch (error) {
    console.log(error);
  }
};
