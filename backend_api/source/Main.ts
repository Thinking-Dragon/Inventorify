import Controller from './api/controllers/Controller';
import InventoryController from './api/controllers/InventoryController';
import SQLiteDatabaseService from './api/services/database/SQLiteDatabaseService';
import InventoryService from './api/services/InventoryService';
import SERVICE_TYPES from './api/services/ServiceTypes';
import { dependencyInjectionContainer } from './inversify.config';
import WebServer from './WebServer';

const PORT: number = 3000;
const ROOT_PATH: string = '/api';
const SCHEMA_CREATION_SCRIPT_PATH: string = '../persistence/create_schema.sql';

// If database does not exist, create it with from schema.
const dbService = dependencyInjectionContainer.get<SQLiteDatabaseService>(SERVICE_TYPES.RelationalDatabaseService);
dbService.runScript(SCHEMA_CREATION_SCRIPT_PATH);

// Start api server
const inventoryService = dependencyInjectionContainer.get<InventoryService>(SERVICE_TYPES.InventoryService);

const controllers: Array<Controller> = [
    new InventoryController(ROOT_PATH, inventoryService)
];
        
const server = new WebServer(controllers, PORT);
        
server.listen();
