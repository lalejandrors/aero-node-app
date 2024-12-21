import { Request, Response, NextFunction } from 'express';
import { _logger, _verifyToken } from '../utils';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: 'Access denied. Token not found'});
    }

    try {
        const payload = _verifyToken(token);
        (req as any).user = payload;
        next();
    } catch (error) {
        _logger.error(`Error verifying token: ${error}`, 'auth');

        return res.status(403).json({message: 'Invalid or expired token'});
    }
}
