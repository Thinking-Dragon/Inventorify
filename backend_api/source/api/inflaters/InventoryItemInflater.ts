
function decorateFlatItem(jsonObject: any): any {
    return {
        id: jsonObject.id,
        sku: jsonObject.sku,
        price_value: jsonObject.price_value,
        price_currency: {
            href: `/api/currencies/${jsonObject.price_currency_id}`
        },
        quantity: jsonObject.quantity,
        supplier: {
            href: `/api/suppliers/${jsonObject.supplier_id}`
        },
        client: {
            href: `/api/clients/${jsonObject.client_id}`
        },
        creation_date: jsonObject.creation_date,
        deletion_date: jsonObject.deletion_date,
        last_modification_date: jsonObject.last_modification_date
    };
}

function inflateFlatItem(jsonObject: any): any {
    return {
        id: jsonObject.item_id,
        sku: jsonObject.item_sku,
        price: {
            value: jsonObject.price_value,
            currency: {
                name: jsonObject.price_currency_name,
                symbol: jsonObject.price_currency_symbol
            }
        },
        quantity: jsonObject.item_quantity,
        supplier: {
            name: jsonObject.supplier_name,
            address: {
                unit: jsonObject.supplier_address_unit,
                civic_number: jsonObject.supplier_address_civic_number,
                street: jsonObject.supplier_address_street,
                city: jsonObject.supplier_address_city,
                region: jsonObject.supplier_address_region,
                country: jsonObject.supplier_address_country
            },
            creation_date: jsonObject.supplier_creation_date,
            deletion_date: jsonObject.supplier_deletion_date,
            last_modified_date: jsonObject.supplier_last_modified_date,
        },
        client: {
            name: jsonObject.client_name,
            address: {
                unit: jsonObject.client_address_unit,
                civic_number: jsonObject.client_address_civic_number,
                street: jsonObject.client_address_street,
                city: jsonObject.client_address_city,
                region: jsonObject.client_address_region,
                country: jsonObject.client_address_country
            },
            creation_date: jsonObject.client_creation_date,
            deletion_date: jsonObject.client_deletion_date,
            last_modified_date: jsonObject.client_last_modified_date,
        },
        creation_date: jsonObject.item_creation_date,
        deletion_date: jsonObject.item_deletion_date,
        last_modified_date: jsonObject.item_last_modified_date
    };
}

export {
    decorateFlatItem,
    inflateFlatItem
};