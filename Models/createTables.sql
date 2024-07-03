CREATE DATABASE IF NOT EXISTS usuarios_db;
USE usuarios_db;

CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT
);

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    mail VARCHAR(100) UNIQUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES Roles(id)
);

CREATE TABLE Archivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_archivo VARCHAR(255),
    tipo_archivo ENUM('jpeg', 'jpg', 'png', 'txt'),
    tamaño INT
);

CREATE TABLE Logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion VARCHAR(255),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);