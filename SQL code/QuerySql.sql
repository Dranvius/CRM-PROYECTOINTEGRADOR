DROP TABLE usuarios;

CREATE TABLE usuario(
	id SERIAL,
	nombre VARCHAR(50),
	apellido VARCHAR(50),
	usuario VARCHAR(20),
	contrasena VARCHAR(20)
	
);

INSERT INTO usuarios (nombre,apellido,usuario,contrasena) VALUES('Sergio','Linares','Dranvius','123'),('Alexis','Linares','AlexMaster','1234'),('Sebastian','Ramos','Ascent','12345')

SELECT * FROM usuarios