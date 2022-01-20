import Controller from './api/controllers/Controller';
import InventoryController from './api/controllers/InventoryController';
import CurrencyController from './api/controllers/CurrencyController';
import CurrencyService from './api/services/CurrencyService';
import InventoryService from './api/services/InventoryService';
import SQLiteDatabaseService from './api/services/database/SQLiteDatabaseService';
import SERVICE_TYPES from './api/services/ServiceTypes';
import { dependencyInjectionContainer } from './inversify.config';
import WebServer from './WebServer';

const PORT: number = 3000;
const ROOT_PATH: string = '/api';
const SCHEMA_CREATION_SCRIPT_PATH: string = '../persistence/create_schema.sql';
const CURRENCY_GENERATION_SCRIPT_PATH: string = '../persistence/generate_currencies.sql';

// If database does not exist, create it with from schema and insert currencies into it.
const dbService = dependencyInjectionContainer.get<SQLiteDatabaseService>(SERVICE_TYPES.RelationalDatabaseService);
(async () => {
    await dbService.runScript(SCHEMA_CREATION_SCRIPT_PATH);
    await dbService.runScript(CURRENCY_GENERATION_SCRIPT_PATH);
})();

// Start api server
const inventoryService = dependencyInjectionContainer.get<InventoryService>(SERVICE_TYPES.InventoryService);
const currencyService = dependencyInjectionContainer.get<CurrencyService>(SERVICE_TYPES.CurrencyService);

const controllers: Array<Controller> = [
    new InventoryController(ROOT_PATH, inventoryService),
    new CurrencyController(ROOT_PATH, currencyService)
];

const server = new WebServer(controllers, PORT);
        
server.listen();
