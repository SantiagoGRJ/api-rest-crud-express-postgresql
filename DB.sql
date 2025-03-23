CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
description TEXT NOT  NULL UNIQUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
description TEXT NOT NULL UNIQUE,
url_img VARCHAR(255) NULL UNIQUE,
price NUMERIC(10,2) NOT NULL,
stock INTEGER NOT NULL,
category UUID,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (category) REFERENCES categories(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE categories;
DROP TABLE products;

SELECT * FROM categories; 
SELECT * FROM products;


WITH ins AS (
    INSERT INTO categories (name, description) VALUES
        ('Electronics', 'Devices and gadgets such as phones, laptops, and accessories'),
        ('Clothing', 'Apparel for men, women, and children'),
        ('Home & Kitchen', 'Furniture, appliances, and tools for your home'),
        ('Books', 'Physical and digital books on a variety of topics'),
        ('Sports & Outdoors', 'Equipment and clothing for various outdoor activities')
    RETURNING id, name
)
SELECT * FROM ins;


WITH category_ids AS (
    SELECT id, name
    FROM categories
)
INSERT INTO products (name, description,  price, stock, category) VALUES
    ('Smartphone', 'Latest model smartphone with a large screen and high-quality camera', 699.99, 50, (SELECT id FROM category_ids WHERE name = 'Electronics')),
    ('Laptop', 'Powerful laptop with a fast processor and long battery life', 999.99, 30, (SELECT id FROM category_ids WHERE name = 'Electronics')),
    ('T-shirt', 'Comfortable cotton T-shirt in multiple colors and sizes', 19.99, 100, (SELECT id FROM category_ids WHERE name = 'Clothing')),
    ('Jeans', 'Denim jeans for men and women, available in different sizes', 49.99, 75, (SELECT id FROM category_ids WHERE name = 'Clothing')),
    ('Blender', 'High-speed blender for smoothies, soups, and sauces', 89.99, 40, (SELECT id FROM category_ids WHERE name = 'Home & Kitchen')),
    ('Cookware Set', 'Stainless steel cookware set for home chefs', 199.99, 20, (SELECT id FROM category_ids WHERE name = 'Home & Kitchen')),
    ('Harry Potter and the Sorcerers Stone', 'The first book in the Harry Potter series', 12.99, 200, (SELECT id FROM category_ids WHERE name = 'Books')),
    ('The Great Outdoors Tent', 'Durable 4-person tent for camping and outdoor adventures', 149.99, 15, (SELECT id FROM category_ids WHERE name = 'Sports & Outdoors')),
    ('Cycling Gloves', 'Comfortable gloves designed for cyclists', 24.99, 60, (SELECT id FROM category_ids WHERE name = 'Sports & Outdoors'));

SELECT * FROM products;

CREATE TABLE IF NOT EXISTS roles (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO roles (name) VALUES('admin'),('user');

SELECT * FROM roles;

CREATE TABLE IF NOT EXISTS users (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(60) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
id_role UUID,
FOREIGN KEY (id_role) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


