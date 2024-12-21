import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AuthController } from '../presentation/auth/controller';
import { prisma } from '../data/postgres';
import { _logger, _generateToken, _validationMissingFields } from '../utils';

jest.mock('../data/postgres', () => ({
    prisma: {
        passenger: {
            findFirst: jest.fn(),
        },
    },
}));

jest.mock('../utils', () => ({
    _generateToken: jest.fn(),
    _validationMissingFields: jest.fn(),
    _logger: {
        error: jest.fn(),
    },
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}));

describe('AuthController', () => {
    let authController: AuthController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        authController = new AuthController();
        req = {
            body: {},
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('login', () => {
        it('Should return 400 if required fields are missing', async () => {
            (_validationMissingFields as jest.Mock).mockReturnValue(['identification', 'password']);

            await authController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Required fields are missing',
                data: ['identification', 'password'],
            });
        });

        it('Should return 404 if passenger is not found', async () => {
            req.body = { identification: '12345', password: 'testpassword' };
            (_validationMissingFields as jest.Mock).mockReturnValue([]);
            (prisma.passenger.findFirst as jest.Mock).mockResolvedValue(null);

            await authController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Passenger with identification 12345 not found',
            });
        });

        it('Should return 401 if password is incorrect', async () => {
            req.body = { identification: '12345', password: 'wrongpassword' };
            (_validationMissingFields as jest.Mock).mockReturnValue([]);
            (prisma.passenger.findFirst as jest.Mock).mockResolvedValue({
                identification: '12345',
                password: 'hashedpassword',
            });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await authController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' });
        });

        it('Should return a token if login is successful', async () => {
            req.body = { identification: '12345', password: 'correctpassword' };
            (_validationMissingFields as jest.Mock).mockReturnValue([]);
            (prisma.passenger.findFirst as jest.Mock).mockResolvedValue({
                identification: '12345',
                password: 'hashedpassword',
            });
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (_generateToken as jest.Mock).mockReturnValue('mocked-token');

            await authController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Token has been generated',
                token: 'mocked-token',
            });
        });

        it('Should return 500 if an error occurs during password comparison', async () => {
            req.body = { identification: '12345', password: 'correctpassword' };
            (_validationMissingFields as jest.Mock).mockReturnValue([]);
            (prisma.passenger.findFirst as jest.Mock).mockResolvedValue({
                identification: '12345',
                password: 'hashedpassword',
            });
            (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('Comparison error'));

            await authController.login(req as Request, res as Response);

            expect(_logger.error).toHaveBeenCalledWith(expect.stringContaining('Error comparing password:'), 'login');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error in token generation' });
        });
    });

    describe('hashPassword', () => {
        it('Should return a hashed password', async () => {
            (_validationMissingFields as jest.Mock).mockReturnValue([]);
            req.body = { password: 'plainpassword' };
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

            await authController.hashPassword(req as Request, res as Response);

            expect(bcrypt.hash).toHaveBeenCalledWith('plainpassword', 10);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ hashedPassword: 'hashedpassword' });
        });

        it('Should return 400 if required fields are missing', async () => {
            (_validationMissingFields as jest.Mock).mockReturnValue(['password']);

            await authController.hashPassword(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Required fields are missing',
                data: ['password'],
            });
        });

        it('Should handle errors during hashing', async () => {
            (_validationMissingFields as jest.Mock).mockReturnValue([]);
            req.body = { password: 'plainpassword' };
            (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing error'));

            await authController.hashPassword(req as Request, res as Response);

            expect(_logger.error).toHaveBeenCalledWith(expect.stringContaining('Error hashing password:'), 'hash');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error in hashing password' });
        });
    });
});
