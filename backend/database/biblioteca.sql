CREATE DATABASE biblioteca_virtual;

USE biblioteca_virtual;

CREATE TABLE usuarios(
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100),
documento VARCHAR(20),
correo VARCHAR(100)
);

CREATE TABLE libros(
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100),
autor VARCHAR(100),
categoria VARCHAR(50),
anio INT,
estado VARCHAR(20)
);

CREATE TABLE prestamos(
id INT AUTO_INCREMENT PRIMARY KEY,
idUsuario INT,
idLibro INT,
fechaPrestamo DATE,
fechaDevolucion DATE,
estado VARCHAR(20)
);