
# Sistema de inventario "stockManager".


Un sistema de inventario basico para almacenar productos de forma facil. Desarrollado con vite, react js, botstrap 5.

## Instalación

Debe de descargar el sistema y dentro de la carpeta de este ejecutar el comando npm install.

```bash
  npm install
```

Luego debe de configurar la direccion url del backend en el archivo src/backend.jsx en la variable "url",
es necesario colocar /api al final de la direccion.

```javascript
const url = "http://direccionbackend/api"
```

Para arrancar el sistema se debe ejecutar en la consola el comando:
```bash
  npm run dev
```

## Funcionamiento
### Registrar
Para agregar un producto haga click en el boton de agregar en la parte derecha del banner, se le mostrara un formulario con la lista de datos a ingresar, debe de tener en cuenta que no se puede repetir los nombres en los productos y que el formato de las imagenes debe ser JPG.

Los productos registrados se mostraran en la pantalla principal con sus respectivos detalles.

### Eliminar
Si quiere eliminar un producto haga click en el boton que se encuentra en la parte superior derecha de color rojo y con el icono de borrar en la imagen del producto. Debe de confirmar si desea eliminar el producto.

### Editar
Para editar un producto se haga click en boton superior derecho de la imagen del producto, este es de color amarillo y con el simblolo de editar. Debe de llenar el formulario y confirmar si desea editar el producto.

### Busqueda y filtrar por categoría
Se puede buscar un producto por el nombre en la barra de busqueda que se encuentra en el header y precionando el boton con el simbolo de lupa, cabe señalar que el nombre debe ser exacto y que el sistema diferencia entre mayusculas y minisculas.

Para filtrar de categoria solo debe seleccionar una categoria en la lista que se encuentra al lado derecho de la barra de busqueda con el texto "Categorías".

Si desea ver los productos nuevamente precione el boton de busqueda con la barra en blanco o sellecione la opcion de "categoría" en la lista de  categorías.