DROP TABLE usuarios;

CREATE TABLE usuario(
	id SERIAL,
	nick VARCHAR(30),
	contrasena VARCHAR(30),
	tipo BOOLEAN
	estado BOOLEAN
	
);

CREATE TABLE admi
	id SERIAL,
	userCreado VARCHAR(30),
	coticreado serial


);
CREATE TABLE gestor(
	id SERIAL,
	cotizacionCreado VARCHAR(10),

);

CREATE TABLE personaldats(

	id SERIAL,
	nombre VARCHAR(30),
	apellido VARCHAR(30),
	cedula VARCHAR(30),
	cel VARCHAR(10)
);
CREATE TABLE cliente(
	id serial,
	nombre VARCHAR(30),
	apellido VARCHAR(30),
	cedula VARCHAR(10),
	
);

CREATE TABLE dirrecion(
	id SERIAL,
	departamento VARCHAR(30)
	ciudad VARCHAR(30),
	
);

CREATE TABLE producto(
	id SERIAL,
	nombre VARCHAR(30),
	precio INTEGER,
	descripcion VARCHAR(200),
	descuento varchar(3)

);

CREATE TABLE envio(
	id SERIAL,
	precioE INTEGER
);

CREATE TABLE enviado(
	id SERIAL,
	correo VARCHAR(30)
);

CREATE TABLE cotizacion(
	id SERIAL,
	

);
