import * as express from 'express';
import 'reflect-metadata';
import CurrencyService from '../services/CurrencyService';
import Controller from "./controller";

class CurrencyController extends Controller {
    constructor(path: string, currencyService: CurrencyService) {
        super(path);
        this._currencyService = currencyService;
        this.router.get('/currencies', (request, response) => this.getCurrencies(request, response));
        this.router.post('/currencies', (request, response) => this.addCurrency(request, response));
        this.router.get('/currencies/:symbol', (request, response) => this.getCurrency(request, response));
        this.router.put('/currencies/:symbol', (request, response) => this.updateCurrency(request, response));
    }

    async getCurrencies(request: express.Request, response: express.Response): Promise<void> {
        const currencies = await this._currencyService.getAllItems();
        response.json(currencies);
    }

    async getCurrency(request: express.Request, response: express.Response): Promise<void> {
        const currency = await this._currencyService.getOneItem(request.params.symbol);
        response.json(currency);
    }

    async addCurrency(request: express.Request, response: express.Response): Promise<void> {
        let currency = {
            currency_name: request.body.name,
            symbol: request.body.symbol
        };

        await this._currencyService.addItem(currency);

        response.json(this._currencyService.getOneItem(currency.symbol));
    }

    async updateCurrency(request: express.Request, response: express.Response): Promise<void> {
        let currency = {
            original_symbol: request.params.symbol,
            currency_name: request.body.name,
            symbol: request.body.symbol
        };

        await this._currencyService.updateItem(currency);

        response.json(this._currencyService.getOneItem(currency.symbol));
    }

    private _currencyService: CurrencyService;
}

export default CurrencyController;