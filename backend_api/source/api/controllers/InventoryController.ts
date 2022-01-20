import * as express from 'express';
import 'reflect-metadata';
import InventoryItem from '../entities/InventoryItem';
import InventoryService from '../services/InventoryService';
import Controller from "./controller";

class InventoryController extends Controller {
    constructor(path: string, inventoryService: InventoryService) {
        super(path);
        this._inventoryService = inventoryService;
        this.router.get('/inventory-items', (request, response) => this.getInventoryItems(request, response));
        this.router.get('/inventory-items/:sku', (request, response) => this.getInventoryItem(request, response));
        this.router.post('/inventory-items', (request, response) => this.addInventoryItem(request, response));
    }

    async getInventoryItems(request: express.Request, response: express.Response): Promise<void> {
        const shouldExtend = request.query._extend === 'true';
        const inventoryItems = await this._inventoryService.getAllItems(shouldExtend);
        response.json(inventoryItems);
    }

    async getInventoryItem(request: express.Request, response: express.Response): Promise<void> {
        const shouldExtend = request.query._extend === 'true';
        const inventoryItem = await this._inventoryService.getOneItem(request.params.sku, shouldExtend);
        response.json(inventoryItem);
    }

    async addInventoryItem(request: express.Request, response: express.Response): Promise<void> {
        let item = {
            sku: request.body.sku,
            priceValue: request.body.price_value,
            priceCurrency: request.body.price_currency,
            quantity: request.body.quantity,
            supplier: request.body.supplier,
            client: request.body.client,
            lastModificationDate: request.body.last_modification_date
        }

        await this._inventoryService.modifyItem(item);

        response.json(this._inventoryService.getOneItem(item.sku));
    }

    private _inventoryService: InventoryService;
}

export default InventoryController;