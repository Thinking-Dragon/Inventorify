import PhysicalAddress from "./PhysicalAddress";

type Client = {
    id: number,
    clientName: number,
    address: PhysicalAddress,
    creationDate: Date,
    deletionDate: Date,
    lastModificationDate: Date
}

export default Client;