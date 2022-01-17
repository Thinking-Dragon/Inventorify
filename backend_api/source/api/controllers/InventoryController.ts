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

    getInventoryItems(request: express.Request, response: express.Response): void {
        const inventorItems = this._inventoryService.getAllItems();
        response.json(inventorItems);
    }

    private _inventoryService: InventoryService;
}

export default InventoryController;