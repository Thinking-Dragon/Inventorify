import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import InventoryItem from '../entities/InventoryItem';
import RelationalDatabaseService from './database/RelationalDatabaseService';
import SERVICE_TYPES from './ServiceTypes';
import * as fs from 'fs';
import * as ItemInflater from '../inflaters/InventoryItemInflater';

@injectable()
class InventoryService {
    private static readonly GET_ALL_INVENTORY_ITEMS_EXTENDED_SCRIPT: string = '../persistence/get_all_inventory_items_extended.sql';
    private static readonly GET_ALL_INVENTORY_ITEMS_SCRIPT: string = '../persistence/get_all_inventory_items.sql';
    private static readonly GET_ONE_INVENTORY_ITEM_EXTENDED_SCRIPT: string = '../persistence/get_one_inventory_item_extended.sql';
    private static readonly GET_ONE_INVENTORY_ITEM_SCRIPT: string = '../persistence/get_one_inventory_item.sql';

    constructor(@inject(SERVICE_TYPES.RelationalDatabaseService) databaseService: RelationalDatabaseService) {
        this._databaseService = databaseService;
    }

    async getAllItems(extend: boolean = false): Promise<Array<InventoryItem>> {
        let query: string;
        
        if(extend) query = fs.readFileSync(InventoryService.GET_ALL_INVENTORY_ITEMS_EXTENDED_SCRIPT).toString();
        else query = fs.readFileSync(InventoryService.GET_ALL_INVENTORY_ITEMS_SCRIPT).toString();

        const queryResult = await this._databaseService.all(query);

        const rows: Array<InventoryItem> = [];
        for(const row of queryResult) {
            if(extend) rows.push(ItemInflater.inflateFlatItem(row));
            else rows.push(ItemInflater.decorateFlatItem(row));
        }

        return rows;
    }

    async getOneItem(sku: string, extend: boolean = false): Promise<InventoryItem> {
        let query: string;
        
        if(extend) query = fs.readFileSync(InventoryService.GET_ONE_INVENTORY_ITEM_EXTENDED_SCRIPT).toString();
        else query = fs.readFileSync(InventoryService.GET_ONE_INVENTORY_ITEM_SCRIPT).toString();

        const queryResult = await this._databaseService.get(query, {$item_sku: sku});
        const row = extend ? ItemInflater.inflateFlatItem(queryResult) : ItemInflater.decorateFlatItem(queryResult);

        return row;
    }

    async addItem(item: any): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async modifyItem(item: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    

    private _databaseService: RelationalDatabaseService;
}

export default InventoryService;

