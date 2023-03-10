SELECT * FROM staff
SELECT * FROM envio_p           
SELECT * FROM localization      
SELECT * FROM personaldats
SELECT * FROM usuario
SELECT * FROM sent_quotation
SELECT * FROM quotation         
SELECT * FROM product
SELECT * FROM quotation_product 
SELECT * FROM client

INSERT INTO localization (department,city,address) VALUES ('cundinamarca','bogota','calle 57 # 46-70 ')


--1)--CLIENTE--
CREATE TABLE IF NOT EXISTS client(
	id_client SMALLSERIAL PRIMARY KEY,
	firstname VARCHAR (35),
	lastname VARCHAR (35),
	cc VARCHAR (12),
	numbercelphone VARCHAR (16),
	mail VARCHAR (50),
	statusc BOOLEAN,
	relation_staff INTEGER
);
--FK CLIENTE/STAFF--
ALTER TABLE  client
ADD CONSTRAINT rela_staff
FOREIGN KEY (relation_staff)
REFERENCES  staff (id_staff)

--AGREGAR CLIENTE--
INSERT INTO client (firstname,lastname,cc,numbercelphone,mail,statusc,relation_staff) VALUES ('Diego','Lopez','89607483','3128407327','dl@gmail.com',true,1)

--Eliminar usuario
delete from usuario
  where id_users=4;
  
INSERT INTO usuario (email,pass,statusu,tipo)  VALUES ('Norma@gmail.com','$2a$10$Lo14Mff6ZqzradOSyhW/6uWEBZ0pbwyIgA6iqUkmXxT5I9vhHTA6i',false,true),('Dranvius12@hotmail.com','$2a$10$Lo14Mff6ZqzradOSyhW/6uWEBZ0pbwyIgA6iqUkmXxT5I9vhHTA6i',false,true),('1alexis.linares@gmail.com','$2a$10$Lo14Mff6ZqzradOSyhW/6uWEBZ0pbwyIgA6iqUkmXxT5I9vhHTA6i',true,true);
INSERT INTO personaldats (firstname,lastname,cc,numbercelphone)  VALUES ('Norma','Guerra','1023955','32056'),('Sergio','Linares','1023974646','3202813850'),('Alexis','Linares','24545','31511111111');


SELECT * FROM usuario INNER JOIN personaldats ON usuario.id_users = personaldats.id_personalid; 

TRUNCATE TABLE usuario,personaldats RESTART IDENTITY;
TRUNCATE TABLE quotation,quotation_product RESTART IDENTITY;

--INNER DE TABLA INTERMEDIA COTI/PRODUCT CON TABLA COTIZACION Y PRODUCTO--
SELECT * FROM  quotation_product INNER JOIN quotation ON quotation.id_quotation = quotation_product.rela_cotiqp INNER JOIN product ON product.id_product = quotation_product.rela_prodqp ORDER BY quotation_product.id_quo_pro;


ALTER TABLE quotation_product RENAME COLUMN address TO cantidad;

ALTER TABLE quotation_product ALTER COLUMN cantidad SET DATA TYPE VARCHAR(3);

SELECT * FROM product INNER JOIN quotation_product ON

--2)--ENVIO--
CREATE TABLE IF NOT EXISTS envio_p(
	id_envioproduct SMALLSERIAL PRIMARY KEY,
	relation_client INTEGER
);
--FK ENVIO/CLIENTES--
ALTER TABLE  envio_p
ADD CONSTRAINT rela_envio
FOREIGN KEY (relation_client)
REFERENCES  client (id_client)

--AGREGAR ENVIO--
INSERT INTO envio_p(relation_client) VALUES (1)

--INNER JOIN CLIENT/ENVIO--

SELECT * FROM  client INNER JOIN envio_p ON envio_p.relation_client = client.id_client

SELECT * FROM usuario INNER JOIN personaldats ON personaldats.id_personalid = usuario.id_users 


--3)--COTIZACION---
CREATE TABLE IF NOT EXISTS quotation(
	id_quotation SMALLSERIAL PRIMARY KEY,
	valor_total VARCHAR (15),
	cliente_coti INTEGER
);
--FK ENVIO/CLIENTES--
ALTER TABLE  quotation
ADD CONSTRAINT rela_client_coti
FOREIGN KEY (cliente_coti)
REFERENCES  client (id_client)

--AGREGAR COTIZACION--
INSERT INTO quotation(valor_total,cliente_coti) VALUES ('15000000',1)

--INNER JOIN CLIENT/ENVIO--

SELECT * FROM  client INNER JOIN quotation ON quotation.cliente_coti = client.id_client


--4)-- TABLA INTERMEDIA COTIZACION /PRODUCTO--

INSERT INTO quotation_product (rela_cotiqp,rela_prodqp,address) VALUES (2,2,'calle 57 # 46-70 ')
CREATE TABLE IF NOT EXISTS quotation_product(
	id_quo_pro SMALLSERIAL  PRIMARY KEY,
	rela_cotiqp INTEGER,
	rela_prodqp INTEGER,
	address VARCHAR (60)
	);
	
--FK COTIZACION/PQ--
ALTER TABLE  quotation_product
ADD CONSTRAINT rela_quota_qp
FOREIGN KEY (rela_cotiqp)
REFERENCES  quotation (id_quotation)

--FK PRODUCTO/PQ--
ALTER TABLE  quotation_product
ADD CONSTRAINT rela_product_qp
FOREIGN KEY (rela_prodqp)
REFERENCES  product (id_product)



--5)--LOCALIZACION--

CREATE TABLE IF NOT EXISTS localization(
	id_local_clien SMALLSERIAL  PRIMARY KEY,
	department VARCHAR (30),
	city VARCHAR (30),
	address VARCHAR (60)
	);

--FK PRODUCTO/PQ--
ALTER TABLE  localization
ADD CONSTRAINT rela_local
FOREIGN KEY (id_local_clien)
REFERENCES  client(id_client)





