
function decorateFlatItem(jsonObject: any): any {
    return {
        id: jsonObject.id,
        sku: jsonObject.sku,
        price_value: jsonObject.price_value,
        price_currency: {
            href: `/api/currencies/${jsonObject.price_currency}`
        },
        quantity: jsonObject.quantity,
        creation_date: jsonObject.creation_date,
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
        creation_date: jsonObject.item_creation_date,
        last_modified_date: jsonObject.item_last_modified_date
    };
}

export {
    decorateFlatItem,
    inflateFlatItem
};