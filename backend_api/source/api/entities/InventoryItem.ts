import Currency from "./Currency";

type InventoryItem = {
    id: number,
    sku: string,
    priceValue: number,
    priceCurrency: Currency,
    quantity: number,
    creationDate: Date,
    deletionDate: Date,
    lastModificationDate: Date
}

export default InventoryItem;