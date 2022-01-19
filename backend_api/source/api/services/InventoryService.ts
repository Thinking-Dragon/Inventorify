import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import InventoryItem from '../entities/InventoryItem';
import RelationalDatabaseService from './database/RelationalDatabaseService';
import SERVICE_TYPES from './ServiceTypes';

@injectable()
class InventoryService {
    constructor(@inject(SERVICE_TYPES.RelationalDatabaseService) databaseService: RelationalDatabaseService) {
        this._databaseService = databaseService;
    }

    async getAllItems(): Promise<Array<InventoryItem>> {
        const query: string = `
            SELECT *
            FROM InventoryItems
        `;
        return await this._databaseService.all(query);
    }

    getOneItem(id: number): InventoryItem {
        throw new Error('Method not implemented.');
    }

    addItem(item: InventoryItem): InventoryItem {
        throw new Error('Method not implemented.');
    }

    modifyItem(item: InventoryItem): InventoryItem {
        throw new Error('Method not implemented.');
    }

    private _databaseService: RelationalDatabaseService;
}

export default InventoryService;

