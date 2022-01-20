import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import InventoryItem from '../entities/InventoryItem';
import RelationalDatabaseService from './database/RelationalDatabaseService';
import SERVICE_TYPES from './ServiceTypes';
import * as fs from 'fs';
import * as ItemInflater from '../inflaters/InventoryItemInflater';

@injectable()
class InventoryService {
    private static readonly GET_ALL_EXTENDED_SCRIPT_PATH: string = '../persistence/inventoryitems/get_all_extended.sql';
    private static readonly GET_ALL_SCRIPT_PATH: string = '../persistence/inventoryitems/get_all.sql';
    private static readonly GET_ONE_EXTENDED_SCRIPT_PATH: string = '../persistence/inventoryitems/get_one_extended.sql';
    private static readonly GET_ONE_SCRIPT_PATH: string = '../persistence/inventoryitems/get_one.sql';
    private static readonly UPDATE_SCRIPT_PATH: string = '../persistence/inventoryitems/update.sql';
    private static readonly ADD_SCRIPT_PATH: string = '../persistence/inventoryitems/add.sql';

    constructor(@inject(SERVICE_TYPES.RelationalDatabaseService) databaseService: RelationalDatabaseService) {
        this._databaseService = databaseService;
    }

    async getAllItems(extend: boolean = false): Promise<Array<InventoryItem>> {
        let query: string;
        
        if(extend) query = fs.readFileSync(InventoryService.GET_ALL_EXTENDED_SCRIPT_PATH).toString();
        else query = fs.readFileSync(InventoryService.GET_ALL_SCRIPT_PATH).toString();

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
        
        if(extend) query = fs.readFileSync(InventoryService.GET_ONE_EXTENDED_SCRIPT_PATH).toString();
        else query = fs.readFileSync(InventoryService.GET_ONE_SCRIPT_PATH).toString();

        const queryResult = await this._databaseService.get(query, {$item_sku: sku});
        const row = extend ? ItemInflater.inflateFlatItem(queryResult) : ItemInflater.decorateFlatItem(queryResult);

        return row;
    }

    async addItem(item: any): Promise<void> {
        const query: string = fs.readFileSync(InventoryService.ADD_SCRIPT_PATH).toString();
        
        this._databaseService.run(query, {
            $sku: item.sku,
            $item_name: item.name,
            $item_description: item.description,
            $price_value: item.price_value,
            $price_currency: item.price_currency,
            $quantity: item.quantity
        });
    }

    async updateItem(item: any): Promise<void> {
        const query: string = fs.readFileSync(InventoryService.UPDATE_SCRIPT_PATH).toString();
        
        this._databaseService.run(query, {
            $original_item_sku: item.original_sku,
            $sku: item.sku,
            $item_name: item.name,
            $item_description: item.description,
            $price_value: item.price_value,
            $price_currency: item.price_currency,
            $quantity: item.quantity
        });
    }
    

    private _databaseService: RelationalDatabaseService;
}

export default InventoryService;

