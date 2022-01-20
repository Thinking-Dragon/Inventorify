import * as express from 'express';
import 'reflect-metadata';
import InventoryService from '../services/InventoryService';
import Controller from "./controller";

class InventoryController extends Controller {
    constructor(path: string, inventoryService: InventoryService) {
        super(path);
        this._inventoryService = inventoryService;
        this.router.get('/inventoryitems', (request, response) => this.getInventoryItems(request, response));
    }

    async getInventoryItems(request: express.Request, response: express.Response): Promise<void> {
        const inventoryItems = await this._inventoryService.getAllItems(request.query._extend === 'true');
        response.json(inventoryItems);
    }

    private _inventoryService: InventoryService;
}

export default InventoryController;