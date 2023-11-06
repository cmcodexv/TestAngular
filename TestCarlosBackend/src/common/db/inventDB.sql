-- Adminer 4.8.1 MySQL 8.0.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `inventDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventDB`;

DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `company` (`id`, `name`, `active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(1,	'Invent',	1,	NULL,	NULL,	NULL,	NULL),
(2,	'Correos',	1,	NULL,	NULL,	NULL,	NULL),
(3,	'Seur',	1,	NULL,	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `company_zip`;
CREATE TABLE `company_zip` (
  `company_id` int NOT NULL,
  `zip_code_id` int NOT NULL,
  `created_at` date NOT NULL,
  UNIQUE KEY `company_zip_ibfk_2` (`zip_code_id`),
  KEY `company_zip_ibfk_1` (`company_id`),
  CONSTRAINT `pokemonTipo_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `company_zip` (`company_id`, `zip_code_id`, `created_at`) VALUES
(2,	15,	'2023-10-12'),
(2,	16,	'2023-10-12'),
(2,	17,	'2023-10-12'),
(2,	18,	'2023-10-12'),
(2,	19,	'2023-10-12'),
(3,	20,	'2023-10-12'),
(3,	21,	'2023-10-12'),
(3,	22,	'2023-10-12'),
(3,	23,	'2023-10-12'),
(3,	24,	'2023-10-12'),
(3,	25,	'2023-10-12');

DROP TABLE IF EXISTS `package_type`;
CREATE TABLE `package_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `interval_kg` varchar(50) NOT NULL,
  `price_calculation` varchar(50) NOT NULL,
  `active` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `package_type` (`id`, `description`, `interval_kg`, `price_calculation`, `active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(1,	'Paquete ultra ligero',	'0 < kg ≤ 0.1',	'Precio = kg * 5',	1,	'2023-10-12 14:48:07',	1,	NULL,	NULL),
(2,	'Paquete ligero',	'0.1 < kg ≤ 0.3',	'Precio = kg * 5 + 1',	1,	'2023-10-12 14:48:58',	1,	NULL,	NULL),
(3,	'Paquete estándar',	'0.3 < kg ≤ 5',	'Precio = kg * 10',	1,	'2023-10-12 14:50:11',	1,	NULL,	NULL),
(4,	'Paquete pesado',	'5 < kg ≤ 10',	'Precio = kg * 5 + kg + 75',	1,	'2023-10-12 14:51:03',	1,	NULL,	NULL),
(5,	'Gran volumen',	'10 < kg ≤ ∞',	'Precio = (kg − 10) × 7.5 + 130 + kg',	1,	'2023-10-12 14:51:55',	1,	NULL,	NULL);

DROP TABLE IF EXISTS `shipping`;
CREATE TABLE `shipping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(100) NOT NULL,
  `zip_code` int NOT NULL,
  `remitent` varchar(50) NOT NULL,
  `addressee` varchar(50) NOT NULL,
  `weight` decimal(7,2) NOT NULL,
  `company_id` int DEFAULT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `shipping` (`id`, `address`, `zip_code`, `remitent`, `addressee`, `weight`, `company_id`, `price`, `active`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(1,	'PruebaPrecio ultra ligero',	16,	'Juan Prueba',	'Carlos Prueba',	0.10,	2,	0.50,	1,	'2023-10-12 00:00:00',	1,	NULL,	NULL),
(2,	'PruebaPrecio ligero',	23,	'Juan Prueba',	'Carlos Prueba',	0.20,	3,	2.00,	1,	'2023-10-12 00:00:00',	1,	NULL,	NULL),
(3,	'PruebaPrecio estándar',	45,	'Juan Prueba',	'Carlos Prueba',	4.00,	1,	40.00,	1,	'2023-10-12 00:00:00',	1,	NULL,	NULL),
(4,	'PruebaPrecio pesado',	15,	'Juan Prueba',	'Carlos Prueba',	8.00,	2,	123.00,	1,	'2023-10-12 00:00:00',	1,	NULL,	NULL),
(5,	'PruebaPrecio gran volumen',	25,	'Juan Prueba',	'Carlos Prueba',	12.00,	3,	157.00,	1,	'2023-10-12 00:00:00',	1,	NULL,	NULL),
(6,	'Postman st',	24,	'Juan Ejemplo',	'Juan Remitente',	6.70,	3,	115.20,	1,	'2023-10-12 19:01:14',	1,	NULL,	NULL);

DELIMITER ;;

CREATE TRIGGER `update_company_price` BEFORE INSERT ON `shipping` FOR EACH ROW
BEGIN
   -- variable para almacenar el company_id
    DECLARE new_company_id INT;

    -- Obtener el company_id
    SELECT cz.company_id INTO new_company_id
    FROM company_zip cz
    WHERE NEW.zip_code = cz.zip_code_id;
    -- validar id company
    IF new_company_id > 1 THEN
         -- Asignar el company_id a la columna "company_id" en la fila a insertar
    SET NEW.company_id = new_company_id;
    ELSE
    -- Asignar el company_id a la columna "company_id" de la company por defecto
    SET NEW.company_id = 1;
    END IF; 
    -- precio
    IF NEW.weight <= 0.10 THEN SET NEW.price = NEW.weight * 5;
    ELSEIF NEW.weight <= 0.30 THEN SET NEW.price = NEW.weight * 5 + 1;
    ELSEIF NEW.weight <= 5 THEN SET NEW.price = NEW.weight * 10;
    ELSEIF NEW.weight <= 10 THEN SET NEW.price = NEW.weight * 5 +  NEW.weight + 75;
    ELSE  SET NEW.price = (NEW.weight - 10) * 7.5 + 130 + NEW.weight;
    END IF;



END;;

DELIMITER ;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) NOT NULL,
  `active` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `name`, `surname`, `email`, `role`, `password`, `active`, `created_at`, `updated_at`) VALUES
(1,	'Carlos',	'Maradiaga',	'admin@invent.com',	'admin',	'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=',	1,	'2023-10-12 12:03:32',	NULL),
(2,	'Jean',	'Morales',	'morales@gmail.com',	'admin',	'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=',	1,	'2023-10-12 16:10:33',	NULL);

-- 2023-10-16 07:32:46
