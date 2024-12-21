import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
import { AuthRoutes } from './auth/routes';
import { FlightRoutes } from './flights/routes';

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/v1/flights', authenticateToken, FlightRoutes.routes);
        router.use('/api/v1/auth', AuthRoutes.routes);

        return router;
    }
}