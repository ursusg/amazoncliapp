create table products (
	id integer(10) auto_increment not nu,
    product_name varchar(50) not null,
    department_name varchar(50) not null,
    price float not null,
    stock_quantity integer not null,
    primary key (id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("iPhone-X-64gb", "Phones", 999.99, 3);

insert into products(product_name, department_name, price, stock_quantity)
values ("Nintendo Switch", "Gaming", 299.99, 20);

insert into products(product_name, department_name, price, stock_quantity)
values ("Hershey Chocolate Bar", "Candy/Sweets", 1.99, 200);

insert into products(product_name, department_name, price, stock_quantity)
values ("Bamazon Fecho", "Electronics", 39.99, 50);

insert into products(product_name, department_name, price, stock_quantity)
values ("Chunky Sandals", "Footware", 9.52, 3000);

insert into products(product_name, department_name, price, stock_quantity)
values ("Diarrhea Times", "Magazine", 2.99, 50000);

insert into products(product_name, department_name, price, stock_quantity)
values ("Inflatable Socks", "Footware", 4.75, 43);

insert into products(product_name, department_name, price, stock_quantity)
values ("Elfo Plush Doll", "Toys", 15.62, 9);

insert into products(product_name, department_name, price, stock_quantity)
values ("Crumb Compressor", "Cooking", 82.99, 1);

insert into products(product_name, department_name, price, stock_quantity)
values ("Salmon Sam's Salty Sea Sword", "Miscellaneous", 25000.00, 1);

select * from products;