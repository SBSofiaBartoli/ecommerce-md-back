# E-commerce API – NestJS

Backend API para una plataforma de e-commerce desarrollada con **NestJS**, enfocada en una arquitectura modular, segura y escalable.  
El sistema gestiona autenticación de usuarios, productos, categorías, órdenes de compra y carga de imágenes, con persistencia en base de datos relacional.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **TypeORM**
- **JWT (Json Web Tokens)**
- **bcrypt**
- **Cloudinary** (gestión de imágenes)
- **Class Validator / Class Transformer**
- **Swagger** (documentación de API)

---

## 📦 Funcionalidades principales

### 🔐 Autenticación y Autorización
- Registro de usuarios con contraseña encriptada
- Login con generación de JWT
- Manejo de roles (User / Admin)
- Protección de rutas mediante guards

### 👤 Gestión de Usuarios
- Listado paginado de usuarios
- Obtención de usuario por ID
- Actualización y eliminación de usuarios
- Cambio de rol a administrador
- Exclusión de datos sensibles (password)

### 🛍️ Productos
- CRUD completo de productos
- Asociación de productos a categorías
- Paginación de resultados
- Control de stock
- Precarga de productos mediante seeder

### 🗂️ Categorías
- Creación y listado de categorías
- Seeder automático desde archivo JSON
- Prevención de duplicados mediante upsert

### 📦 Órdenes de compra
- Creación de órdenes asociadas a usuarios
- Validación de stock
- Cálculo automático del total
- Descuento de stock al confirmar la orden
- Relación entre órdenes, detalles y productos

### 🖼️ Carga de imágenes
- Subida de imágenes de productos a Cloudinary
- Asociación automática de imagen al producto

### 🌱 Seeder automático
- Precarga de categorías y productos al iniciar la aplicación
- Implementado mediante `OnModuleInit`

### 🧾 Logging
- Middleware personalizado para loguear cada request (método, URL y timestamp)

---

## 🧱 Arquitectura

- Arquitectura modular basada en **NestJS**
- Separación clara de:
  - Controllers
  - Services
  - Entities
  - DTOs
  - Middlewares
- Patrón Repository con TypeORM
- Manejo centralizado de errores con excepciones HTTP

---

## ⚙️ Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev
