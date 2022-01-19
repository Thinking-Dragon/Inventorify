SELECT  item.id                         as item_id,
        item.sku                        as item_sku,
        item.price_value                as price_value,
        currency.currency_name          as price_currency_name,
        currency.symbol                 as price_currency_symbol,
        item.quantity                   as item_quantity,
        supplier.supplier_name          as supplier_name,
        supplier_address.unit           as supplier_address_unit,
        supplier_address.civic_number   as supplier_address_civic_number,
        supplier_address.street         as supplier_address_street,
        supplier_address.city           as supplier_address_city,
        supplier_address.region         as supplier_address_region,
        supplier_address.country        as supplier_address_country,
        supplier.creation_date          as supplier_creation_date,
        supplier.deletion_date          as supplier_deletion_date,
        supplier.last_modification_date as supplier_last_modified_date,
        client.client_name              as client_name,
        client_address.unit             as client_address_unit,
        client_address.civic_number     as client_address_civic_number,
        client_address.street           as client_address_street,
        client_address.city             as client_address_city,
        client_address.region           as client_address_region,
        client_address.country          as client_address_country,
        client.creation_date            as client_creation_date,
        client.deletion_date            as client_deletion_date,
        client.last_modification_date   as client_last_modified_date,
        item.creation_date              as item_creation_date,
        item.deletion_date              as item_deletion_date,
        item.last_modification_date     as item_last_modified_date
FROM InventoryItems item
JOIN Currencies currency                ON item.price_currency_id = currency.id
JOIN Suppliers supplier                 ON item.supplier_id = supplier.id
JOIN PhysicalAddresses supplier_address ON supplier.address_id = supplier_address.id
JOIN Clients client                     ON item.client_id = client.id
JOIN PhysicalAddresses client_address   ON client.address_id = client_address.id