import * as express from 'express';
import Controller from "./controller";

class InventoryController extends Controller {
    constructor(path: string) {
        super(path);
        this.router.get('/inventoryitems', this.getInventories);
    }

    getInventories(request: express.Request, response: express.Response): void {
        response.send('Inventories list');
    }
}

export default InventoryController;