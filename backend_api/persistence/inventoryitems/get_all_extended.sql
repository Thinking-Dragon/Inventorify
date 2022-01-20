SELECT  item.sku                        as item_sku,
        item.item_name                  as item_name,
        item.item_description           as item_description,
        item.price_value                as price_value,
        currency.currency_name          as price_currency_name,
        currency.symbol                 as price_currency_symbol,
        item.quantity                   as item_quantity,
        item.creation_date              as item_creation_date,
        item.last_modification_date     as item_last_modified_date
FROM InventoryItems item
JOIN Currencies currency                ON item.price_currency_id = currency.id