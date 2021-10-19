colores-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Nicotine
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Nicotine
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Nicotine` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema notas_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema notas_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `notas_db` DEFAULT CHARACTER SET utf8 ;
USE `Nicotine` ;

-- -----------------------------------------------------
-- Table `Nicotine`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nicotine`.`roles` (
  `id_roles` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_roles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nicotine`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nicotine`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `rol` INT NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `birthday` DATE NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuarios_roles_idx` (`rol` ASC) ,
  CONSTRAINT `fk_usuarios_roles`
    FOREIGN KEY (`rol`)
    REFERENCES `Nicotine`.`roles` (`id_roles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nicotine`.`colores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nicotine`.`colores` (
  `id_ color` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_ color`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nicotine`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nicotine`.`category` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nicotine`.`size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nicotine`.`size` (
  `id_size` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id_size`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nicotine`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nicotine`.`productos` (
  `id_productos` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `color` INT NOT NULL,
  `size` INT NOT NULL,
  `category` INT NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `price` DOUBLE NOT NULL,
  PRIMARY KEY (`id_productos`),
  INDEX `fk_productos_colores1_idx` (`color` ASC) ,
  INDEX `fk_productos_category1_idx` (`category` ASC) ,
  INDEX `fk_productos_size1_idx` (`size` ASC) ,
  CONSTRAINT `fk_productos_colores1`
    FOREIGN KEY (`color`)
    REFERENCES `Nicotine`.`colores` (`id_ color`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_category1`
    FOREIGN KEY (`category`)
    REFERENCES `Nicotine`.`category` (`id_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_size1`
    FOREIGN KEY (`size`)
    REFERENCES `Nicotine`.`size` (`id_size`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nicotine`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nicotine`.`carrito` (
  `id_carrito` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `total` DOUBLE NOT NULL,
  PRIMARY KEY (`id_carrito`),
  INDEX `id_usuario_idx` (`id_usuario` ASC) ,
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Nicotine`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Nicotine`.`detalle_carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Nicotine`.`detalle_carrito` (
  `id_detalle_carrito` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `id_carrito` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`id_detalle_carrito`),
  INDEX `id_producto_idx` (`id_producto` ASC) ,
  INDEX `id_carrito_idx` (`id_carrito` ASC) ,
  CONSTRAINT `id_carrito`
    FOREIGN KEY (`id_carrito`)
    REFERENCES `Nicotine`.`carrito` (`id_carrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `Nicotine`.`productos` (`id_productos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `notas_db` ;

-- -----------------------------------------------------
-- Table `notas_db`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `notas_db`.`categorias` (
  `id_categoria` INT(11) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `notas_db`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `notas_db`.`usuarios` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(32) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `notas_db`.`notas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `notas_db`.`notas` (
  `id_nota` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(250) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  `delete` TINYINT(4) NOT NULL,
  `usuarios_id_usuario` INT(11) NOT NULL,
  PRIMARY KEY (`id_nota`),
  INDEX `fk_notas_usuarios1_idx` (`usuarios_id_usuario` ASC) ,
  CONSTRAINT `fk_notas_usuarios1`
    FOREIGN KEY (`usuarios_id_usuario`)
    REFERENCES `notas_db`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `notas_db`.`categorias_notas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `notas_db`.`categorias_notas` (
  `cat_nota_id` INT(11) NOT NULL AUTO_INCREMENT,
  `notas_id_nota` INT(11) NOT NULL,
  `categorias_id_categoria` INT(11) NOT NULL,
  PRIMARY KEY (`cat_nota_id`, `notas_id_nota`, `categorias_id_categoria`),
  INDEX `fk_categorias_notas_notas1_idx` (`notas_id_nota` ASC) ,
  INDEX `fk_categorias_notas_categorias1_idx` (`categorias_id_categoria` ASC) ,
  CONSTRAINT `fk_categorias_notas_categorias1`
    FOREIGN KEY (`categorias_id_categoria`)
    REFERENCES `notas_db`.`categorias` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categorias_notas_notas1`
    FOREIGN KEY (`notas_id_nota`)
    REFERENCES `notas_db`.`notas` (`id_nota`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
