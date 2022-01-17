CREATE TABLE IF NOT EXISTS PhysicalAddresses (
    id INT NOT NULL PRIMARY KEY,
    unit INT,
    civic_number INT NOT NULL,
    street VARCHAR(128) NOT NULL,
    city VARCHAR(64) NOT NULL,
    region VARCHAR(64) NOT NULL,
    country VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS Currencies (
    id INT NOT NULL PRIMARY KEY,
    currency_name VARCHAR(64) NOT NULL,
    symbol VARCHAR(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS Suppliers (
    id INT NOT NULL PRIMARY KEY,
    supplier_name VARCHAR(128) NOT NULL,
    address_id INT NOT NULL,
    
    creation_date DATETIME NOT NULL,
    deletion_date DATETIME,
    last_modification_date DATETIME,

    FOREIGN KEY (address_id) REFERENCES PhysicalAddresses(id)
);

CREATE TABLE IF NOT EXISTS Clients (
    id INT NOT NULL PRIMARY KEY,
    client_name VARCHAR(128) NOT NULL,
    address_id INT NOT NULL,
    
    creation_date DATETIME NOT NULL,
    deletion_date DATETIME,
    last_modification_date DATETIME,

    FOREIGN KEY (address_id) REFERENCES PhysicalAddresses(id)
);

CREATE TABLE IF NOT EXISTS InventoryItems (
    id INT NOT NULL PRIMARY KEY,
    
    sku VARCHAR(32) NOT NULL,
    
    price_value DECIMAL(15, 2) NOT NULL,
    price_currency_id INT NOT NULL,
    
    quantity INT NOT NULL,
    
    supplier_id INT NOT NULL,
    client_id INT NOT NULL,
    
    creation_date DATETIME NOT NULL,
    deletion_date DATETIME,
    last_modification_date DATETIME,

    FOREIGN KEY (price_currency_id) REFERENCES Currencies(id),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(id),
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);