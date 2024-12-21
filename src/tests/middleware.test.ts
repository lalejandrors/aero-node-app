import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/auth';
import { _logger, _verifyToken } from '../utils';

jest.mock('../utils/jwt', () => ({
    _verifyToken: jest.fn(),
    _logger: {
        error: jest.fn(),
    },
}));

describe('AuthenticateToken Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            json: jest.fn(),  
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    it('Should return 401 if no token is provided', () => {
        authenticateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. Token not found' });
        expect(next).not.toHaveBeenCalled();
    });

    it('Should return 403 if the token is invalid', () => {
        if (req.headers) {
            req.headers['authorization'] = 'Bearer invalidtoken';
        }
        (_verifyToken as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        authenticateToken(req as Request, res as Response, next);

        expect(_logger.error).toHaveBeenCalledWith(expect.stringContaining('Error verifying token:'), 'auth');
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
        expect(next).not.toHaveBeenCalled();
    });

    it('Should call next and attach user payload if token is valid', () => {
        if (req.headers) {
            req.headers['authorization'] = 'Bearer validtoken';
        }
        const mockPayload = { identification: '123456', iat: 3453213, exp: 7632456 };
        (_verifyToken as jest.Mock).mockReturnValue(mockPayload);

        authenticateToken(req as Request, res as Response, next);

        expect(_verifyToken).toHaveBeenCalledWith('validtoken');
        expect((req as any).user).toEqual(mockPayload);
        expect(next).toHaveBeenCalled();
    });
});
