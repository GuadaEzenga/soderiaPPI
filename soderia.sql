CREATE DATABASE soderia;

USE soderia;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  telefono VARCHAR(20),
  direccion VARCHAR(255),
  zona ENUM('A','B','C','D') NOT NULL,
  activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  precio DECIMAL(10, 2),
  stock INT
);

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT,
  id_producto INT,
  cantidad INT NOT NULL,
  fecha DATE NOT NULL,
  estado ENUM('pendiente', 'entregado', 'cancelado') DEFAULT 'pendiente',
  FOREIGN KEY (id_cliente) REFERENCES clientes(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Bidón de Agua 20L', 'Bidón de agua mineral purificada de 20 litros.', 650.00, 200),
('Sifón de Soda 1.5L', 'Sifón de soda retornable de 1.5 litros.', 300.00, 150),
('Dispenser de Agua Frío/Calor', 'Dispenser eléctrico para bidones de agua, con funciones de frío y calor.', 25000.00, 20),
('Bidón de Agua 12L', 'Bidón de agua mineral purificada de 12 litros.', 500.00, 100);

INSERT INTO clientes (nombre, apellido, telefono, direccion, zona, activo) VALUES
('Juan', 'Pérez', '3534123456', 'Calle Falsa 123, Villa María', 'A', TRUE),
('María', 'Gómez', '3534987654', 'Av. San Martín 456, Villa Nueva', 'B', TRUE),
('Carlos', 'Rodríguez', '3534555555', 'Bv. Sarmiento 789, Villa María', 'C', TRUE),
('Ana', 'Fernández', '3534112233', 'Ruta 2, Km 5, Villa Nueva', 'D', TRUE),
('Luis', 'Martínez', '3534777888', 'Salta 101, Villa María', 'A', TRUE);

INSERT INTO pedidos (id_cliente, id_producto, cantidad, fecha, estado) VALUES
(1, 1, 2, '2025-07-24', 'entregado'), 
(2, 2, 3, '2025-07-24', 'pendiente'),
(3, 1, 1, '2025-07-25', 'pendiente'),
(1, 3, 1, '2025-07-25', 'cancelado'), 
(4, 2, 5, '2025-07-25', 'entregado'); 

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (username, password) VALUES ('admin', '1234');

INSERT INTO clientes (nombre, apellido, telefono, direccion, zona, activo) VALUES
('Sofía', 'García', '3534223344', 'Independencia 321, Villa María', 'B', TRUE),
('Pedro', 'López', '3534667788', 'Chacabuco 987, Villa Nueva', 'C', TRUE),
('Laura', 'Díaz', '3534334455', 'Corrientes 555, Villa María', 'D', FALSE), 
('Martín', 'Acosta', '3534445566', 'Entre Ríos 200, Villa María', 'A', TRUE),
('Valeria', 'Benítez', '3534889900', 'Córdoba 150, Villa Nueva', 'B', TRUE),
('Diego', 'Castro', '3534102030', 'San Juan 30, Villa María', 'C', TRUE),
('Florencia', 'Herrera', '3534405060', 'La Rioja 75, Villa Nueva', 'D', TRUE),
('Gabriel', 'Nuñez', '3534708090', 'Mendoza 120, Villa María', 'A', TRUE),
('Carolina', 'Paz', '3534131415', 'Tucumán 40, Villa Nueva', 'B', TRUE),
('Javier', 'Rojas', '3534161718', 'Av. Libertador 500, Villa María', 'C', TRUE),
('Silvina', 'Sosa', '3534192021', 'Belgrano 60, Villa Nueva', 'D', TRUE),
('Ricardo', 'Torres', '3534222324', 'Rivadavia 800, Villa María', 'A', TRUE),
('Emilia', 'Vázquez', '3534252627', '25 de Mayo 10, Villa Nueva', 'B', TRUE);

INSERT INTO pedidos (id_cliente, id_producto, cantidad, fecha, estado) VALUES
(5, 1, 3, '2025-07-25', 'pendiente'), 
(6, 2, 2, '2025-07-26', 'pendiente'), 
(7, 4, 1, '2025-07-26', 'entregado'), 
(1, 2, 4, '2025-07-26', 'pendiente'),
(8, 1, 1, '2025-07-27', 'cancelado'),
(9, 1, 2, '2025-07-27', 'entregado'), 
(10, 2, 3, '2025-07-27', 'pendiente'),
(11, 4, 2, '2025-07-28', 'pendiente'), 
(12, 1, 1, '2025-07-28', 'entregado'), 
(13, 2, 5, '2025-07-28', 'pendiente'),
(14, 3, 1, '2025-07-29', 'pendiente'), 
(15, 1, 3, '2025-07-29', 'entregado'),
(16, 2, 2, '2025-07-29', 'pendiente'), 
(17, 4, 1, '2025-07-30', 'entregado'),
(18, 1, 2, '2025-07-30', 'pendiente'); 