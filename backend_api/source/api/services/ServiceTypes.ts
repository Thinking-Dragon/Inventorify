const SERVICE_TYPES = {
    InventoryService: Symbol.for("InventoryService"),
    CurrencyService: Symbol.for("CurrencyService"),
    RelationalDatabaseService: Symbol.for("RelationalDatabaseService")
};

export default SERVICE_TYPES;