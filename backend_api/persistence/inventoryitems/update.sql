UPDATE InventoryItems
SET sku = $sku
SET price_value = $price_value
SET price_currency_id = (
    SELECT id
    FROM Currencies
    WHERE symbol = $price_currency
)
SET quantity = $quantity
SET last_modification_date = GETDATE()
WHERE sku = $original_item_sku