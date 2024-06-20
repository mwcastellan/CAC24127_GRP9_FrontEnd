window.addEventListener("load", () => {
  cargarProductos();
});
// funcion que carga y muestra
const cargarProductos = async () => {
  try {
    let respuesta = await fetch("https://tpo-nodejs-bb.vercel.app/reporte_01");
    if (respuesta.status == 200) {
      let datos = await respuesta.json();
      let productos = `<h2 class="Productos_Clipped">Productos grid-container</h2>`;
      let pagina = "";
      let idcategoria = 0;
      let idsubcategoria = 0;
      datos.forEach((producto) => {
        // Categoria
        if (idcategoria != producto.IDCATEGORIA) {
          productos += `<img src="img/productos/${producto.PATH_CATEGORIA}" alt="Productos_Accesorios" />
          <h2 class="Productos_Clipped">Productos_Grupo_General</h2>`;
          idcategoria = producto.IDCATEGORIA;
        }
        //
        // Subcategoria
        if (idsubcategoria != producto.IDSUBCATEGORIA) {
          productos += ` <section class="Productos_Grupo_Particular">
          <img src="img/productos/${producto.PATH_SUBCATEGORIA}" alt="Productos_Accesorios_Camas" />
          <h2 class="Productos_Clipped">Productos_Grupo_Particular</h2>
        </section>`;
          idsubcategoria = producto.IDSUBCATEGORIA;
        }
        //
        // Productos
        productos += `<article class="Producto grid-item">
            <h4>${producto.DESCRIPCION}</h4>
            <img src="./img/productos/${producto.NOMBRE_IMAGEN}" alt="Productos" />
            <p>${producto.PRECIO}</p>
            <p>
            ${producto.DESCRIPCION_AMPLIA}
            </p>
            <a class="Producto_btn" href="">Añadir al carrito</a>
          </article>
          `;
      });
      document.querySelector(".Productos_Grupo_General").innerHTML = productos;
    } else if (respuesta.status === 404) {
      console.log("error 404 nos vemos en otro lugar");
    }
  } catch (error) {
    console.log(error);
  }
};
