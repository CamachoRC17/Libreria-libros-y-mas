# Biblioteca Virtual

Sistema de gestión de biblioteca con panel administrativo para el control de libros, usuarios y préstamos.

## Tecnologías

- **Backend:** Node.js, Express
- **Base de datos:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Seguridad:** bcrypt (contraseñas), Google reCAPTCHA
- **Correo:** Nodemailer (recuperación de contraseña)

## Requisitos previos

Antes de instalar el proyecto, asegúrate de tener:

- [Node.js](https://nodejs.org/) instalado (v16 o superior)
- MySQL corriendo localmente (por ejemplo, con [Laragon](https://laragon.org/) o XAMPP)
- Una cuenta de Gmail con verificación en 2 pasos activada (para el envío de correos)
- Claves de [Google reCAPTCHA](https://www.google.com/recaptcha/admin) (v3, dominio `localhost` habilitado)

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/libreria-libros-y-mas.git
cd libreria-libros-y-mas/backend
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura la base de datos

Crea la base de datos en MySQL y luego importa la estructura desde el archivo `biblioteca.sql` (ubicado en la raíz del backend):

```bash
mysql -u root -p < biblioteca.sql
```

> Por defecto, el proyecto se conecta con usuario `root` y sin contraseña, en el puerto `3306`. Si tu configuración es distinta, edita el archivo `backend/config/db.js`.

### 4. Configura las variables de entorno

Copia el archivo de ejemplo y crea tu propio `.env`:

```bash
cp .env.example .env
```

Luego edita `backend/.env` con tus propios valores:

```
RECAPTCHA_SECRET=tu_clave_secreta_de_recaptcha
EMAIL_USUARIO=tu_correo@gmail.com
EMAIL_CLAVE=tu_contraseña_de_aplicacion_de_gmail

EJ: 

RECAPTCHA_SECRET=6LeeFkgtAAAAAIyB-18vHAwYw5BwL2Hi18tCVUCS
EMAIL_USUARIO=ronalddelportillo11@gmail.com
EMAIL_CLAVE=oenqpujqzfdwkkiu

```

> ⚠️ **Nunca subas tu archivo `.env` real a GitHub.** Cada persona debe generar sus propias claves y contraseña de aplicación.

### 5. Inicia el servidor

```bash
node server.js
```

Si todo está bien configurado, deberías ver en la terminal:

```
Servidor ejecutándose en puerto 3000
Base de datos conectada
```

### 6. Abre el frontend

Abre el archivo `frontend/index.html` con **Live Server** (extensión de VS Code) o cualquier servidor local, y accede desde tu navegador.

## 📁 Estructura del proyecto

```
libreria-libros-y-mas/
├── backend/
│   ├── config/          # Configuración de base de datos
│   ├── controllers/     # Lógica de negocio (login, libros, usuarios, etc.)
│   ├── database/        # Scripts SQL
│   ├── routes/          # Rutas de la API
│   ├── .env.example     # Plantilla de variables de entorno
│   └── server.js        # Punto de entrada del servidor
└── frontend/
    ├── css/
    ├── js/
    ├── index.html        # Panel de control
    ├── login.html
    ├── libros.html
    ├── usuarios.html
    ├── prestamos.html
    └── reportes.html
```

## ✨ Funcionalidades

- Autenticación de administradores con verificación reCAPTCHA
- Gestión de libros, usuarios y préstamos
- Panel de control con estadísticas generales
- Generación de reportes

## 👤 Autor

Grupo J: Ronald Camacho, Sergio Rosero Bedoya, Freddy Hernandez

## 📄 Licencia

Este proyecto es de uso académico / personal.