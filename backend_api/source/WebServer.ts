import * as express_module from 'express';
import express from 'express';
import Controller from './api/controllers/Controller';
import cors from 'cors';
import bodyParser from 'body-parser';

class WebServer {
    constructor(controllers: Array<Controller>, port: number) {
        this.application = express();
        this.port = port;

        this.bindMiddlewares();
        this.bindControllers(controllers);
    }

    public listen(): void {
        this.application.listen(this.port, () => console.log(`Listening on port ${this.port}`));
    }

    private bindMiddlewares(): void {
        this.application.use(cors());
        this.application.use(bodyParser.json());
    }

    private bindControllers(controllers: Array<Controller>) {
        controllers.forEach(controller => controller.useApplication(this.application));
    }

    private application: express_module.Application;
    private port: number;
}

export default WebServer;