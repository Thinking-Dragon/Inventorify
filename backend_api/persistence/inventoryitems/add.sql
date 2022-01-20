INSERT INTO InventoryItems (
    sku,
    item_name,
    item_description,
    price_value,
    price_currency_id,
    quantity,
    creation_date
)
VALUES (
    $sku,
    $item_name,
    $item_description,
    $price_value,
    (
        SELECT id
        FROM Currencies
        WHERE symbol = $price_currency
    ),
    $quantity,
    datetime('now')
)