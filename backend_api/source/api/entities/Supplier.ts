import PhysicalAddress from "./PhysicalAddress";

type Supplier = {
    id: number,
    supplier_name: string,
    address: PhysicalAddress,
    creationDate: Date,
    deletionDate: Date,
    lastModificationDate: Date
}

export default Supplier;