import { Router } from 'express';
import { FlightRoutes } from './flights/routes';
import { AuthRoutes } from './auth/routes';
import { authenticateToken } from '../middlewares/auth';

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/v1/flights', authenticateToken, FlightRoutes.routes);
        router.use('/api/v1/auth', AuthRoutes.routes);

        return router;
    }
}