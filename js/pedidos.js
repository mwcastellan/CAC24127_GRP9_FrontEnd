window.addEventListener("load", () => {
  cargarPedidos();
});
// funcion que carga y muestra
const cargarPedidos = async () => {
  try {
    let respuesta = await fetch("https://tpo-nodejs-bb.vercel.app/pedidos");
    if (respuesta.status == 200) {
      let datos = await respuesta.json();
      let contenedor = `<table class="Pedidos">
                       <p><h2>PEDIDOS</h2></p>
                       <th class="itemp">id</th>
                       <th class="itemp">FECHA_COMPRA</th>
                       <th class="itemp">IDCLIENTE</th>
                       <th class="itemp">IDPRODUCTO</th>
                       <th class="itemp">CANTIDAD</th>
                       <th class="itemp">PRECIO</th>
                       <th class="itemp">IMPORTE</th>
                       <th class="itemp">IDESTADO</th>
                       `;
      datos.forEach((pedido) => {
        // Pedidos
        contenedor += `<tr class="Pedido"> 
                       <td class="itemp id">${pedido.id}</td>
                       <td class="itemp fecha_compra">${pedido.FECHA_COMPRA}</td>
                       <td class="itemp idcliente">${pedido.IDCLIENTE}</td>
                       <td class="itemp idproducto">
                          <input type="number" name="idproducto" value=${pedido.IDPRODUCTO}></td>
                       <td class="itemp cantidad">
                          <input type="number" name="cantidad" value=${pedido.CANTIDAD}></td>
                       <td class="itemp precio">
                          <input type="number" name="precio" value=${pedido.PRECIO}></td>
                       <td class="itemp importe">
                          <input type="number" name="importe" value=${pedido.IMPORTE}></td>
                       <td class="itemp estado">${pedido.IDESTADO}</td>
                       <td class="itemp"><input type="submit" value="Modificar"></td>
                       <td class="itemp"><input type="submit" value="Eliminar"></td>
                       </tr>    `;
      });
      contenedor += `<tr class="Pedido"> 
                       <td class="itemp id"></td>
                       <td class="itemp fecha_compra">
                          <input type="date" name="fecha_compra" required></td>
                       <td class="itemp idcliente">
                          <input type="number" name="idcliente" value=0 required></td>
                       <td class="itemp idproducto">
                          <input type="number" name="idproducto" value=0 required></td>
                       <td class="itemp cantidad">
                          <input type="number" name="cantidad" value=0 required></td>
                       <td class="itemp precio">
                          <input type="number" name="precio" value=0 required></td>
                       <td class="itemp importe">
                          <input type="number" name="importe" value=0 required></td>
                       <td class="itemp estado">1</td>
                       <td class="itemp"><input type="submit" value="Agregar"></td>
                      </tr>    `;
      contenedor += `</table">`;
      document.querySelector(".Contenedor").innerHTML = contenedor;
    } else if (respuesta.status === 404) {
      console.log("error 404 nos vemos en otro lugar");
    }
  } catch (error) {
    console.log(error);
  }
};
