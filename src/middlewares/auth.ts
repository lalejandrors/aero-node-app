import { Request, Response, NextFunction } from 'express';
import { _verifyToken } from '../utils/jwt';

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
        console.error("Error verifying token:", error);
        res.status(403).json({message: 'Invalid or expired token'});
    }
}
