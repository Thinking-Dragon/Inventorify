import { Container } from 'inversify';
import SERVICE_TYPES from './api/services/ServiceTypes';
import InventoryService from './api/services/InventoryService';
import RelationalDatabaseService from './api/services/database/RelationalDatabaseService';
import SQLiteDatabaseService from './api/services/database/SQLiteDatabaseService';

const dependencyInjectionContainer = new Container();
dependencyInjectionContainer.bind<InventoryService>(SERVICE_TYPES.InventoryService).to(InventoryService);
dependencyInjectionContainer.bind<RelationalDatabaseService>(SERVICE_TYPES.RelationalDatabaseService).to(SQLiteDatabaseService);

export { dependencyInjectionContainer }