UPDATE InventoryItems SET
    sku = $sku,
    item_name = $item_name,
    item_description = $item_description,
    price_value = $price_value,
    price_currency_id = (
        SELECT id
        FROM Currencies
        WHERE symbol = $price_currency
    ),
    quantity = $quantity,
    last_modification_date = datetime('now')
WHERE sku = $original_item_sku