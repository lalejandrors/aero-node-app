import { Router } from 'express';
import { FlightController } from './controller';

export class FlightRoutes {

    static get routes(): Router {
        const router = Router();
        const flightController = new FlightController();

        router.get('/', flightController.getFlights);

        return router;
    }
}