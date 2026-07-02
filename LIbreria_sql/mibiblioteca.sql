-- =================================================================
-- SCRIPT DEFINITIVO: CONSOLIDADO DE LIBROS (SIN REPETICIONES)
-- INCLUYE NUEVOS HALLAZGOS DE LAS IMÁGENES DE ALTA RESOLUCIÓN
-- =================================================================

-- 1. ASEGURAR ESTRUCTURA DE LA TABLA
CREATE TABLE IF NOT EXISTS `Libro` (
    `id_libro` INT AUTO_INCREMENT PRIMARY KEY,
    `titulo` VARCHAR(150) NOT NULL,
    `autor` VARCHAR(150) NOT NULL,
    `editorial` VARCHAR(100) DEFAULT 'Por Definir'
);

-- 2. INSERCIÓN DE DATOS UNIFICADOS
INSERT INTO `Libro` (`titulo`, `autor`, `editorial`) 
VALUES 
-- --- INGENIERÍA CIVIL, VÍAS Y GEOTECNIA ---
('Topografía con AutoCAD CIVIL 3D 2009', 'Hugo León Arenas Lozano', 'Grupo Macro'),
('Diseño Geométrico de Carreteras', 'James Cárdenas Grisales', 'Ecoe Ediciones'),
('Ingeniería de Pavimentos: Fundamentos, estudios básicos y diseño', 'Hugo Alexander Rondón Quintana / Fredy Alberto Reyes Lizcano', 'Universidad Católica de Colombia'),
('Diseño, Construcción y Mantenimiento de Pavimentos de Concreto', 'Diego Sánchez de Guzmán / Tecnológica del Concreto', 'Asocreto'),
('La Ingeniería de Suelos en las Vías Terrestres', 'Alfonso Rico Rodríguez / Hermilo del Castillo', 'Limusa'),
('Hidráulica de Tuberías', 'Juan Saldarriaga', 'Universidad de los Andes'),
('Tecnología del Concreto Asfáltico', 'Pedro Antonio Chocontá Pedroza', 'Por Definir'),
('Cemento Asfáltico', 'John Jairo Agudelo Ospina', 'Por Definir'),
('Geodesia para Ingenieros', 'Universidad Distrital Francisco José de Caldas', 'UD Editorial'),
('Fundamentos de Fotogrametría para Manejo de Coberturas Vegetales', 'Varios Autores', 'Por Definir'),
('Mecánica de Pavimentos', 'Rodolfo Enrique Sosa Gómez', 'Por Definir'),
('Diseño Racional de Pavimentos', 'Fredy Alberto Reyes Lizcano', 'Por Definir'),
('Topografía aplicada para ingenieros', 'Varios Autores', 'Por Definir'),

-- --- CIENCIAS EXACTAS, MATEMÁTICAS Y FÍSICA ---
('Cálculo Volumen 1', 'Larson / Hostetler / Edwards', 'McGraw-Hill'),
('Cálculo Volumen 2', 'Larson / Hostetler / Edwards', 'McGraw-Hill'),
('Estadística Aplicada', 'Ciro Martínez Bencardino', 'Ecoe Ediciones'),
('Ecuaciones Diferenciales Ordinarias', 'Luz Marina Moya / Edilberto Rojas', 'Escuela Colombiana de Ingeniería'),
('Cálculo Integral en una Variable', 'Varios Autores', 'Por Definir'),
('Probabilidad: Teoría y Práctica', 'Varios Autores', 'Por Definir'),
('Curso Matemáticas Básicas', 'Margarita Ospina Pulido', 'Colección Notas de Clase'),
('Física (Sexta Edición)', 'Jerry D. Wilson / Anthony J. Buffa / Bo Lou', 'Pearson'),
('Geometría analítica y vectorial', 'Julio Alberto Uribe Calad', 'Por Definir'),
('El Libro de la Física', 'Varios Autores', 'DK'),

-- --- DESARROLLO DE SOFTWARE Y SISTEMAS ---
('Python a Fondo', 'Pablo E. Fernández Casado', 'Marcombo'),
('Java Programación: Teoría y ejemplos', 'Mª Isabel Barquilla Galeano', 'Editorial Edu'),
('115 ejercicios resueltos de programación C++', 'Jofreus / Irypogu', 'Editorial Edu'),
('Programación Orientada a Objetos en JAVA', 'Francisco Blasco / Miguel Hernández / Luis E. Baquero', 'Editorial Edu'),
('C# Lo básico que debe saber: Introducción al Lenguaje C', 'Carlos Alberto Vanegas', 'Por Definir'),
('Bases de Datos', 'Varios Autores', 'Alfaomega'),
('Aprende SQL', 'Xavier Reyes Ochoa', 'Por Definir'),
('Construcción y Diseño de Páginas Web con HTML, CSS y JavaScript', 'Varios Autores', 'Ra-Ma'),
('Programación y manejo de datos con Java utilizando NetBeans IDE', 'Carlos Alberto Vanegas', 'Por Definir'),

-- --- ECONOMÍA, URBANISMO, LEGISLACIÓN Y CONTRATACIÓN ---
('Estatuto General de Contratación Pública', 'Varios Autores', 'Por Definir'),
('Función Notarial y Registral Práctica', 'Alfonso Montejo Fonseca', 'Por Definir'),
('El Impuesto Predial', 'Alvaro Camacho Montoya', 'ICDT'),
('Ingeniería Económica', 'Varios Autores', 'Por Definir'),
('Guía de Manejo Ambiental', 'Varios Autores', 'Por Definir'),
('Matemáticas Financieras aplicadas a los negocios', 'Omar Gualteros Villarreal', 'Por Definir'),
('Procedimientos en la propiedad horizontal', 'Martha E. Ramírez C.', 'Por Definir'),
('Avalúos de Inmuebles y Garantías', 'Óscar A. Borrero Ochoa', 'Ecoe Ediciones'),
('Plusvalías Urbanas', 'Samuel Jaramillo', 'Universidad de los Andes'),
('Economía Urbana y Plusvalía del Suelo', 'Varios Autores', 'Por Definir'),
('Proyectos: Formulación y criterios de evaluación', 'Varios Autores', 'Por Definir'),

-- --- LITERATURA, HISTORIA Y PEDAGOGÍA ---
('Antiguo Egipto (Atlas Ilustrado)', 'Varios Autores', 'Susaeta'),
('Atlas Ilustrado de la Antigua Roma', 'Varios Autores', 'Susaeta'),
('El Nacimiento de Grecia', 'Varios Autores', 'Por Definir'),
('Historia de la Humanidad', 'Varios Autores', 'Planeta / Seix Barral'),
('El Capital', 'Karl Marx', 'Por Definir'),
('El Idiota', 'Fiódor Dostoyevski', 'Penguin Clásicos'),
('Cuentos Completos', 'Edgar Allan Poe', 'Penguin Clásicos'),
('Narraciones Extraordinarias', 'Edgar Allan Poe', 'Editorial Albor'),
('Los Hermanos Karamazov', 'Fiódor Dostoyevski', 'Por Definir'),
('Mr. Mercedes', 'Stephen King', 'Plaza & Janés'),
('El Instituto', 'Stephen King', 'Plaza & Janés'),
('Cementerio de Animales', 'Stephen King', 'Plaza & Janés'),
('1001 Días que cambiaron el mundo', 'Peter Furtado / Fernando Casal', 'Grijalbo'),
('La Historia de la Tierra', 'Robert M. Hazen', 'Océano'),
('La cara oculta del petróleo', 'Eric Laurent', 'Por Definir'),
('El Código del Alma', 'James Hillman', 'Por Definir'),
('Piratas y Emperadores', 'Noam Chomsky', 'Por Definir'),
('Escritos sobre ética / Estados Unidos', 'Camilo García / Noam Chomsky', 'Por Definir'),
('Introducción a la Pedagogía de la Tecnología', 'Varios Autores', 'Por Definir');

-- =================================================================
-- FIN DEL SCRIPT UNIFICADO
-- =================================================================