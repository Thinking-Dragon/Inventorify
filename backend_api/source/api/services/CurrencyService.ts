import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import InventoryItem from '../entities/InventoryItem';
import RelationalDatabaseService from './database/RelationalDatabaseService';
import SERVICE_TYPES from './ServiceTypes';
import * as fs from 'fs';

@injectable()
class CurrencyService {
    private static readonly GET_ALL_SCRIPT_PATH: string = '../persistence/currencies/get_all.sql';
    private static readonly GET_ONE_SCRIPT_PATH: string = '../persistence/currencies/get_one.sql';
    private static readonly UPDATE_SCRIPT_PATH: string = '../persistence/currencies/update.sql';
    private static readonly ADD_SCRIPT_PATH: string = '../persistence/currencies/add.sql';

    constructor(@inject(SERVICE_TYPES.RelationalDatabaseService) databaseService: RelationalDatabaseService) {
        this._databaseService = databaseService;
    }

    async getAllItems(): Promise<Array<InventoryItem>> {
        let query: string = fs.readFileSync(CurrencyService.GET_ALL_SCRIPT_PATH).toString();

        const currencies: Array<any> = await this._databaseService.all(query);

        return currencies.filter(currency => this.formatCurrency(currency));
    }

    async getOneItem(symbol: string): Promise<InventoryItem> {
        let query: string = fs.readFileSync(CurrencyService.GET_ONE_SCRIPT_PATH).toString();

        const currency = await this._databaseService.get(query, {$currency_symbol: symbol});
        
        return this.formatCurrency(currency);
    }

    addItem(currency: any): Promise<void> {
        const query: string = fs.readFileSync(CurrencyService.ADD_SCRIPT_PATH).toString();

        return this._databaseService.run(query, {
            $currency_name: currency.currency_name,
            $currency_symbol: currency.symbol,
        });
    }

    updateItem(currency: any): Promise<void> {
        const query: string = fs.readFileSync(CurrencyService.UPDATE_SCRIPT_PATH).toString();
        
        return this._databaseService.run(query, {
            $original_currency_symbol: currency.original_symbol,
            $currency_name: currency.currency_name,
            $currency_symbol: currency.symbol
        });
    }

    private formatCurrency(currency: any): any {
        return {
            name: currency.currency_name,
            symbol: currency.symbol
        };
    }

    private _databaseService: RelationalDatabaseService;
}

export default CurrencyService;

