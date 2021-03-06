SELECT  sku,
        item_name,
        item_description,
        price_value,
        currency.symbol as price_currency,
        quantity,
        creation_date,
        last_modification_date
FROM InventoryItems item
JOIN Currencies currency ON item.price_currency_id = currency.id
WHERE deletion_date IS NULL