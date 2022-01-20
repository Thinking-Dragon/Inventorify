SELECT  id,
        sku,
        price_value,
        price_currency_id,
        quantity,
        supplier_id,
        client_id,
        creation_date,
        deletion_date,
        last_modification_date
FROM InventoryItems
WHERE sku = $item_sku