CREATE database appcarrito;
use appcarrito;

CREATE TABLE `appcarrito`.`rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_rol`));

CREATE TABLE `appcarrito`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `id_rol` INT NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `id_rol_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `id_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `appcarrito`.`rol` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `appcarrito`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(45) NOT NULL,
  `precio_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `appcarrito`.`imagen` (
  `id_imagen` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `url` VARCHAR(45) NULL,
  PRIMARY KEY (`id_imagen`),
  INDEX `id_producto_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `appcarrito`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `appcarrito`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_categoria`));

CREATE TABLE `appcarrito`.`sub_categoria` (
  `id_sub_categoria` INT NOT NULL AUTO_INCREMENT,
  `id_categoria` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_sub_categoria`),
  INDEX `id_categoria_idx` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `id_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `appcarrito`.`categoria` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `appcarrito`.`producto_subcategoria` (
  `id_producto_subcategoria` INT NOT NULL AUTO_INCREMENT,
  `id_productos` INT NOT NULL,
  `id_sub_categoria` INT NOT NULL,
  PRIMARY KEY (`id_producto_subcategoria`),
  INDEX `id_producto_idx` (`id_productos` ASC) VISIBLE,
  INDEX `id_sub_categoria_idx` (`id_sub_categoria` ASC) VISIBLE,
  CONSTRAINT `id_productos`
    FOREIGN KEY (`id_productos`)
    REFERENCES `appcarrito`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_sub_categoria`
    FOREIGN KEY (`id_sub_categoria`)
    REFERENCES `appcarrito`.`sub_categoria` (`id_sub_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `appcarrito`.`ticket` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_ticket`),
  INDEX `id_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `appcarrito`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `appcarrito`.`venta` (
  `id_venta` INT NOT NULL AUTO_INCREMENT,
  `id_ticket` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`id_venta`),
  INDEX `id_ticket_idx` (`id_ticket` ASC) VISIBLE,
  INDEX `id_producto_venta_idx` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `id_ticket`
    FOREIGN KEY (`id_ticket`)
    REFERENCES `appcarrito`.`ticket` (`id_ticket`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_producto_venta`
    FOREIGN KEY (`id_producto`)
    REFERENCES `appcarrito`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `appcarrito`.`usuario_direccion` (
  `id_usuario_direccion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NULL,
  `calle` VARCHAR(45) NULL,
  `numero` VARCHAR(45) NULL,
  `colonia` VARCHAR(45) NULL,
  `municipio` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  `pais` VARCHAR(45) NULL,
  `codigo_postal` VARCHAR(5) NULL,
  PRIMARY KEY (`id_usuario_direccion`),
  INDEX `id_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `id_usuario_direccion`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `appcarrito`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `appcarrito`.`productos`
ADD COLUMN `desc` VARCHAR(255) NOT NULL AFTER `cantidad`;

insert into rol (id_rol,nombre_rol) values (1,'administrador');
insert into rol (id_rol,nombre_rol) values (2,'usuario');
insert into rol (id_rol,nombre_rol) values (3,'usuario');

insert into usuario (id_usuario,nombre,id_rol,password,correo)  values (1,'Erick Alejandro Yañez Aguilar',1,'201820910','erickaguilar2d@gmail.com');
insert into usuario (id_usuario,nombre,id_rol,password,correo)  values (2,'Grisel Berenice Valencia Aguilar',2,'12345678','grisel014@gmail.com');
insert into usuario (id_usuario,nombre,id_rol,password,correo)  values (3,'Marcos Lopez Gonzales',3,'87654321','marclopez@gmail.com');

insert into usuario_direccion (id_usuario_direccion,id_usuario,calle,numero,colonia,municipio,estado,pais,codigo_postal) values (1,1,'tollocan','455','florida','ecatepec','Mexico','Mexico','55120');
insert into usuario_direccion (id_usuario_direccion,id_usuario,calle,numero,colonia,municipio,estado,pais,codigo_postal) values (2,2,'penachos','145','dominguez','ecatepec','Mexico','Mexico','55152');
insert into usuario_direccion (id_usuario_direccion,id_usuario,calle,numero,colonia,municipio,estado,pais,codigo_postal) values (3,3,'alemania','253','lopez','ecatepec','Mexico','Mexico','55141');

SELECT P.id, P.nombre_producto, P.precio_producto, P.cantidad, P.desc, SC.nombre, C.nombre, IM.url
FROM producto_subcategoria PSC
INNER JOIN productos P ON PSC.id_productos = P.id
INNER JOIN sub_categoria SC ON PSC.id_sub_categoria = SC.id_sub_categoria
INNER JOIN categoria C ON SC.id_categoria = C.id_categoria INNER JOIN imagen IM ON IM.id_producto = P.id;

delimiter $
CREATE PROCEDURE insertarDatos(IN nom_producto varchar (45), IN precio_p int, IN cant int, IN descripcion varchar (45), IN id_sub_c int, IN urlI varchar(45))
BEGIN
	 DECLARE valorMaximo int;
	 INSERT INTO `appcarrito`.`productos`(`nombre_producto`, `precio_producto`, `cantidad`, `desc`) VALUES (nom_producto, precio_p, cant, descripcion);

     SELECT @valorMaximo := max(id) FROM productos;
     
     INSERT INTO `appcarrito`.`producto_subcategoria`(`id_productos`, `id_sub_categoria`) VALUES (@valorMaximo, id_sub_c);
     INSERT INTO `appcarrito`.`imagen`(`id_producto`, `url`) VALUES (@valorMaximo, urlI);
END $

delimiter $
CREATE PROCEDURE modificarDatos(IN _id_p int, IN nom_producto varchar (45), IN precio_p int, IN cant int, IN descripcion varchar (45), IN id_sub_c int, IN urlI varchar(45))
BEGIN

	 UPDATE `appcarrito`.`productos` 
     SET  
			`nombre_producto` = nom_producto,
            `precio_producto` = precio_p,
            `cantidad` = cant,
            `desc`= descripcion
             WHERE `id` = _id_p;
     
     UPDATE `appcarrito`.`producto_subcategoria` 
     SET 
			`id_productos` =_id_p,
            `id_sub_categoria` = id_sub_c
            WHERE `id_productos` = _id_p;

     UPDATE `appcarrito`.`imagen`
     SET
		 `id_producto` = _id_p,
		 `url` = urlI
         WHERE `id_producto` = _id_p;
END $

delimiter $
CREATE PROCEDURE eliminarDatos(IN _id_p int)
BEGIN
	 DELETE FROM `appcarrito`.`producto_subcategoria` WHERE `id_productos` = _id_p;
    
     DELETE FROM `appcarrito`.`imagen` WHERE `id_producto` = _id_p;
     
	 DELETE FROM `appcarrito`.`productos` WHERE `id` = _id_p;
END $


SELECT P.id, P.nombre_producto, P.precio_producto, P.cantidad, P.desc, SC.nombre, C.nombre, IM.url
FROM producto_subcategoria PSC
INNER JOIN productos P ON PSC.id_productos = P.id
INNER JOIN sub_categoria SC ON PSC.id_sub_categoria = SC.id_sub_categoria
INNER JOIN categoria C ON SC.id_categoria = C.id_categoria INNER JOIN imagen IM ON IM.id_producto = P.id;

SELECT id_categoria, nombre FROM categoria;
SELECT SC.id_categoria, SC.nombre FROM sub_categoria SC INNER JOIN categoria C ON SC.id_categoria = C.id_categoria;