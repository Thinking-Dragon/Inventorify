import Controller from './api/controllers/Controller';
import InventoryController from './api/controllers/InventoryController';
import WebServer from './WebServer';

const PORT = 3000;
const ROOT_PATH = '/api';

const controllers: Array<Controller> = [
    new InventoryController(ROOT_PATH)
];

const server = new WebServer(controllers, PORT);

server.listen();