import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import InventoryService from './InventoryService';

@injectable()
class SQLiteInventoryService implements InventoryService {
    getAllItems(): any[] {
        throw new Error('Method not implemented.');
    }
}

export default SQLiteInventoryService;

