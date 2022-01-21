UPDATE InventoryItems
SET deletion_date = datetime('now')
WHERE sku = $sku