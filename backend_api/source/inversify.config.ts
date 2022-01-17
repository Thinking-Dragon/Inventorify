import { Container } from 'inversify';
import SERVICE_TYPES from './api/services/ServiceTypes';
import InventoryService from './api/services/InventoryService';
import SQLiteInventoryService from './api/services/SQLiteInventoryService';

const dependencyInjectionContainer = new Container();
dependencyInjectionContainer.bind<InventoryService>(SERVICE_TYPES.InventoryService).to(SQLiteInventoryService);

export { dependencyInjectionContainer }