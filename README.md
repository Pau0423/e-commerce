🛒 MontevideoImport – E-commerce con React + Firebase

Proyecto final del curso React JS – Coderhouse
Desarrollado por Paula Rodríguez

Descripción del proyecto:

MontevideoImport es una Single Page Application (SPA) desarrollada en React, que simula un e-commerce de productos tecnológicos.
Incluye:

Catálogo dinámico de productos

Filtrado por categorías

Detalle individual del producto

Carrito de compras con estado global

Checkout con creación de órdenes en Firebase

Persistencia de datos y manejo de stock

La aplicación fue diseñada siguiendo buenas prácticas, rutas declarativas y separación clara en componentes.

Tecnologías utilizadas

React JS

Vite

React Router DOM

Firebase Firestore

Context API

CSS Modules
Estructura principal del proyecto:
src/
├── components/
│ ├── cart/
│ │ ├── CartPage.jsx
│ │ ├── CartWidget.jsx
│ │ └── CartWidget.module.css
│ ├── CheckoutForm.jsx
│ ├── CheckoutForm.module.css
│ ├── ItemListContainer.jsx
│ ├── ItemListContainer.module.css
│ ├── ItemDetailContainer.jsx
│ ├── ItemDetailContainer.module.css
│ ├── Item.jsx
│ ├── ItemList.jsx
│ ├── NavBarT.jsx
│ └── Search.jsx
│
├── context/
│ └── CartContext.jsx
│
├── data/
│ ├── products.js
│ └── firebaseConfig.js
│
├── App.jsx
├── main.jsx
└── styles / assets

Funcionalidades principales:

Catálogo de productos (Firestore)

Los productos se obtienen desde una colección "products" de Firebase.
Cada producto incluye:

título

precio

categoría

descripción

stock

imagen (gestionada localmente con un ImageMap)

Navegación entre vistas:

Implementada con React Router:

/ → listado general

/category/:categoryId → productos filtrados

/item/:itemId → detalle del producto

/cart → carrito

/checkout → formulario de compra

Carrito global con Context API:

El carrito permite:

agregar productos

aumentar/disminuir cantidad

eliminar ítems

vaciar carrito

persistencia en localStorage

Además, se muestra el total de unidades en un CartWidget.

Detalle de producto + ItemCount:

En la vista de detalle:

se valida el stock

se impide bajar de 1 o superar el stock

al agregar un producto, el contador se oculta

aparecen opciones para ver el carrito o seguir comprando

Checkout conectado a Firebase:

El checkout:

solicita nombre, e-mail y teléfono

genera una orden en la colección "orders"

guarda: comprador, items, total, fecha

devuelve al usuario un ID único de compra

vacía el carrito automáticamente

UI / UX

loaders

mensajes condicionales

carrito vacío

producto sin stock

estilos encapsulados con CSS Modules

Estructura Firestore:

Colección: products

Documentos con IDs: 1, 2, 3, 4, 5
Campos:
title: string
price: number
stock: number
category: string
description: string
Colección: orders

Se genera automáticamente en el checkout:
buyer: { name, email, phone }
items: []
total: number
date: timestamp

Cómo ejecutar el proyecto:

Clonar el repositorio

Instalar dependencias:

npm install

Crear archivo .env en la raíz del proyecto:
VITE_FIREBASE_API_KEY=AlzaSyAwcaDZBgSSXCPgD0H0Ge06bV7z_dP5GeZE
VITE_FIREBASE_AUTH_DOMAIN=montevideo-import.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=montevideo-import
VITE_FIREBASE_STORAGE_BUCKET=montevideo-import.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=899490172528
VITE_FIREBASE_APP_ID=1:899490172528:web:4b452092ca5ea212c5a895

Ejecutar
npm run dev
