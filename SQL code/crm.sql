SELECT * FROM  product
SELECT * FROM  usuario


ALTER TABLE product  
ADD COLUMN status BOOLEAN;

INSERT INTO product (nameproduct,price,description,discount,status) VALUES ('archivo rodante',10000000,' Archivo rodante con especificaciones 3 metros ancho x 2,5 metros de alto x 3 metros de produndidad color gris metalico.','8%',True);

DELETE  FROM product 

TRUNCATE TABLE product RESTART IDENTITY