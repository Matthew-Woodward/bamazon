DROP DATABASE if exists bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10),
    primary key (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("sprockets","widgets",3.99,500), 
("clackers", "widgets", 4.99, 150), 
("thingies", "doohickies", 1.99, 250), 
("stuffs", "doohickies", 9.99, 1000),
("pies", "foods", 5.99, 300),
("tacos", "foods", 0.99, 200),
("dinosaurs", "toys", 19.99, 75),
("yo-yo's", "toys", 1.49, 275),
("whoopie cushions", "gags", 1.99, 1000),
("rubber dog poop", "gags", .99, 1500);


