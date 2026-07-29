CREATE DATABASE biblioteca_virtual;

USE biblioteca_virtual;

-- Usuarios de la biblioteca (quienes piden prestado)
CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    documento VARCHAR(20),
    correo VARCHAR(100)
);

-- Catálogo de obras (el "libro" en sí, sin importar cuántas copias existan)
CREATE TABLE titulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20),
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    categoria VARCHAR(50),
    anio INT
);

-- Copias físicas de cada título
CREATE TABLE ejemplares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_titulo INT NOT NULL,
    codigo VARCHAR(50) UNIQUE,
    estado VARCHAR(20) DEFAULT 'Disponible',
    FOREIGN KEY (id_titulo) REFERENCES titulos(id)
);

-- Préstamos (vinculados a un ejemplar específico, no al título genérico)
CREATE TABLE prestamos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idEjemplar INT,
    fechaPrestamo DATE,
    fechaDevolucion DATE,
    estado VARCHAR(20),
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    FOREIGN KEY (idEjemplar) REFERENCES ejemplares(id)
);

-- Administradores del sistema (login)
CREATE TABLE admins(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    correo VARCHAR(100),
    resetToken VARCHAR(255),
    resetTokenExpira DATETIME
);

-- Usuario administrador por defecto (usuario: admin, contraseña: 12345)
-- ⚠️ Cambia el correo y la contraseña antes de usar en producción
INSERT INTO admins (usuario, password, correo)
VALUES (
    'admin',
    '$2b$10$CMNs9vWpSvaxfgYPJXeBa.yh62EnGX12cr5cTmNW9Qsu9SpxY3LpG',
    'admin@ejemplo.com'
);