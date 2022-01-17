import * as express_module from 'express';
import express from 'express';
import Controller from './api/controllers/Controller';

class WebServer {
    constructor(controllers: Array<Controller>, port: number) {
        this.application = express();
        this.port = port;

        this.application.get('/', (_, r) => r.send('!'));

        this.initializeControllers(controllers);
    }

    public listen(): void {
        this.application.listen(this.port, () => console.log(`Listening on port ${this.port}`));
    }

    private initializeControllers(controllers: Array<Controller>) {
        controllers.forEach(controller => controller.useApplication(this.application));
    }

    private application: express_module.Application;
    private port: number;
}

export default WebServer;