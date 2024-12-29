import serverless from "serverless-http";
import { AppRoutes } from "./presentation/routes";
import { envs } from "./config/envs";
import { Server } from "./presentation/server";

let server: ReturnType<typeof serverless> | undefined;

const initializeServer = () => {
    const appServer = new Server({
        routes: AppRoutes.routes
    });

    return appServer.getApp();
}

export const handler = async(event: any, context: any) => {
    if(!server){
        const app = initializeServer();
        server = serverless(app);
    }

    return server(event, context);
}

if (envs.NODE_ENV !== 'production') {
    const localServer = new Server({
        routes: AppRoutes.routes
    });

    localServer.start();
}