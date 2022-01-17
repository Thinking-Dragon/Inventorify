import * as express from 'express';

class Controller {
    constructor(path: string = '/') {
        this.path = path;
        this.router = express.Router();
    }

    useApplication(application: express.Application): void {
        application.use(this.path, this.router);
    }

    useRouter(router: express.Router): void {
        router.use(this.path, this.router);
    }

    protected path: string;
    protected router: express.Router;
}

export default Controller;