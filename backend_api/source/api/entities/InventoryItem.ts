import Client from "./Client";
import Currency from "./Currency";
import Supplier from "./Supplier";

type InventoryItem = {
    id: number,
    sku: string,
    priceValue: number,
    priceCurrency: Currency,
    quantity: number,
    supplier: Supplier,
    client: Client,
    creationDate: Date,
    deletionDate: Date,
    lastModificationDate: Date
}

export default InventoryItem;