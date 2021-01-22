

CREATE DEFINER=`admin`@`%` PROCEDURE `dbarce`.`registrar_pelicula`(IN pplaneta_id INT,IN ppelicula varchar(50))
BEGIN
	INSERT INTO dbarce.pelicula
	(planeta_id, pelicula)
	VALUES(pplaneta_id,ppelicula);
END;

CREATE DEFINER=`admin`@`%` PROCEDURE `dbarce`.`registrar_planeta`(IN pclima varchar(50),
IN pdiametro INT,
IN pgravedad varchar(50),
IN pnombre varchar(50),
IN pperiodo_orbital INT,
IN ppoblacion varchar(50),
IN pperiodo_rotacion INT,
IN psuperficie_agua INT,
IN pterreno varchar(50),
IN purl varchar(50),
IN pcreado varchar(100),
IN peditado varchar(100))
BEGIN
	declare p_planeta_id int;
	set p_planeta_id = 0;

	INSERT INTO dbarce.planetas
	(diametro, gravedad, nombre, periodo_orbital, poblacion, periodo_rotacion, superficie_agua, terreno, url, creado, editado)
	VALUES (pdiametro,pgravedad,pnombre,pperiodo_orbital,ppoblacion,pperiodo_rotacion,psuperficie_agua,pterreno,purl,pcreado,peditado);

	set p_planeta_id = last_insert_id();

	select p_planeta_id planeta_id;
END;

CREATE DEFINER=`admin`@`%` PROCEDURE `dbarce`.`registrar_residente`(IN pplaneta_id INT,IN presidente varchar(50))
BEGIN
	INSERT INTO dbarce.residente
	(planeta_id, residente)
	VALUES(pplaneta_id,presidente);
END;

CREATE DEFINER=`admin`@`%` PROCEDURE `dbarce`.`traer_planeta`(IN pnombre varchar(50))
BEGIN
	IF pnombre IS NULL OR pnombre = '' THEN
		SELECT
		pl.diametro diametro,
		pl.gravedad gravedad,
		pl.nombre nombre,
		pl.periodo_orbital periodo_orbital,
		pl.poblacion poblacion,
		pl.periodo_rotacion periodo_rotacion,
		pl.superficie_agua superficie_agua,
		pl.terreno terreno,
		pl.url url,
		rs.residente residente
		FROM dbarce.planetas pl INNER JOIN dbarce.residente rs
		on pl.planeta_id = rs.planeta_id;
	ELSE
		SELECT
		pl.diametro diametro,
		pl.gravedad gravedad,
		pl.nombre nombre,
		pl.periodo_orbital periodo_orbital,
		pl.poblacion poblacion,
		pl.periodo_rotacion periodo_rotacion,
		pl.superficie_agua superficie_agua,
		pl.terreno terreno,
		pl.url url,
		rs.residente residente
		FROM dbarce.planetas pl INNER JOIN dbarce.residente rs
		on pl.planeta_id = rs.planeta_id
		WHERE UPPER(pl.nombre) = UPPER(pnombre);
	END IF;
END;

CREATE TABLE `planetas` (
  `diametro` int DEFAULT NULL,
  `gravedad` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `periodo_orbital` int DEFAULT NULL,
  `poblacion` varchar(100) DEFAULT NULL,
  `periodo_rotacion` int DEFAULT NULL,
  `superficie_agua` int DEFAULT NULL,
  `terreno` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `planeta_id` int NOT NULL AUTO_INCREMENT,
  `creado` varchar(100) DEFAULT NULL,
  `editado` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`planeta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

CREATE TABLE `pelicula` (
  `planeta_id` int NOT NULL,
  `pelicula` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `residente` (
  `planeta_id` varchar(100) NOT NULL,
  `residente` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;





