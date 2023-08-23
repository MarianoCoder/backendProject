# Información del proyecto 👨‍💻

Este es un proyecto realizado en concepto de entrega final correspondiente al curso de Programación Backend de Coder House. El objetivo es crear una tienda con carrito de compras, donde sea posible generar un usuario, y realizar el proceso completo de compra de productos.

# Para poder inicar el proyecto, se debe utilizar

```bash
  cd /backendProject
  npm start
```

Abrir http://localhost:3000 para ver las vistas en el buscador, o bien a través de postman 🖥️

Dentro del directorio se encuenta un archivo data.json con ejemplos para agregar un producto.

# Hasta el momento las funcionalidades que incluye el proyecto son

- Crear un usuario, modificar sus datos, eliminar un usuario, recuperar y modificar contraseña, login y logout del usuario. 👤
  Y también iniciar sesión a traves de github en http://localhost:3000/login
  Listar todos los usuarios en http://localhost:3000/api/users (solo postman)

- Crear un producto, modificar sus datos, subir imagen del producto y eliminarlo de la base de datos en http://localhost:3000/api/products (solo postman) 🍫🧃
  Listar todos productos en http://localhost:3000/api/products (solo postman)

- Se pueden crear, obtener y modificar businesses con sus respectivos id y sus productos en http://localhost:3000/api/business , en el archivo data_business.json se puede encontrar datos de ejemplo para crear uno. (solo postman) 🏪

- Crear, modificar y eliminar ordenes de pedidos, relacionando los id de los usuarios creados, los id de los businesses y sus productos, en http://localhost:3000/api/orders , en el archivo data_orders.json se puede encontrar datos de ejemplo para crear uno. (solo postman) 📝

- Se pueden enviar emails con el detalle de un pedido modificando la dirección de email en la variable de entorno EMAIL_USER del archivo .env en el endpoint http://localhost:3000/mailing 📨

- Se pueden realizar test en http://localhost:3000/api-docs/#/Products 🧪
