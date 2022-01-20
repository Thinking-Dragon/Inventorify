SELECT  sku
        price_value,
        currency.symbol as price_currency,
        quantity,
        creation_date,
        last_modification_date
FROM InventoryItems item
JOIN Currencies currency ON item.price_currency_id = currency.id