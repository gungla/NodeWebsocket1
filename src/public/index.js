var socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", (productos) => {
  const html = productos
    .map((producto) => {
      console.log(producto.thumbnail);
      return `<tr>
                  <th scope="row">${producto.id}</th>
                  <td>${producto.title}</td>
                  <td>$ ${producto.price}</td>
                  <td><img class="productImage" src=${producto.thumbnail} width=35 heigth=35></td>
               </tr>
              `;
    })
    .join("");

  document.getElementById("tablaProductos").innerHTML = html;
});