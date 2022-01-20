CREATE TABLE IF NOT EXISTS Currencies (
    id INTEGER PRIMARY KEY NOT NULL,
    currency_name VARCHAR(64) NOT NULL,
    symbol VARCHAR(3) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS InventoryItems (
    id INTEGER PRIMARY KEY NOT NULL,
    
    sku VARCHAR(32) NOT NULL UNIQUE,

    item_name VARCHAR(128) NOT NULL,
    item_description TEXT,
    
    price_value DECIMAL(15, 2) NOT NULL,
    price_currency_id INT NOT NULL,
    
    quantity INT NOT NULL,
    
    creation_date DATETIME NOT NULL,
    deletion_date DATETIME,
    last_modification_date DATETIME,

    FOREIGN KEY (price_currency_id) REFERENCES Currencies(id)
);