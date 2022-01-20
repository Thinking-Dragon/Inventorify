UPDATE InventoryItems SET
    sku = $sku,
    price_value = $price_value,
    price_currency_id = (
        SELECT id
        FROM Currencies
        WHERE symbol = $price_currency
    ),
    quantity = $quantity,
    last_modification_date = datetime('now')
WHERE sku = $original_item_sku