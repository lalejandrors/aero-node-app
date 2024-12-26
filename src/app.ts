import { AppRoutes } from "./presentation/routes";
import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT || 8080,
        routes: AppRoutes.routes,
    });
    server.start()
}