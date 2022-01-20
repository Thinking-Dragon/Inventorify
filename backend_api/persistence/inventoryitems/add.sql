INSERT INTO InventoryItems (
    sku,
    price_value,
    price_currency_id,
    quantity,
    creation_date
)
VALUES (
    $sku,
    $price_value,
    (
        SELECT id
        FROM Currencies
        WHERE symbol = $price_currency
    ),
    $quantity,
    datetime('now')
)