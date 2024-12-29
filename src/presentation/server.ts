import express, { Router } from 'express';
import { envs } from "../config/envs";

interface Options {
    routes: Router;
}

export class Server {

    private app = express();
    private readonly routes: Router;

    constructor(options: Options){
        const {routes} = options
        this.routes = routes;

        //* Middlewares
        this.app.use(express.json());

        //* Routes
        this.app.use(this.routes);
    }

    getApp() {
        return this.app;
    }

    async start(){
        this.app.listen(envs.PORT || 8080, () => {
            console.log(`Server running on port ${envs.PORT || 8080}`);
        })
    }
}