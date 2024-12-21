import { Request, Response } from 'express';
import { FlightController } from '../presentation/flights/controller';
import { prisma } from '../data/postgres';
import { _logger, _validationMissingFields } from '../utils';

jest.mock('../data/postgres', () => ({
  prisma: {
    flight: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock('../utils', () => ({
  _validationMissingFields: jest.fn(),
  _logger: {
    error: jest.fn(),
  },
}));

describe('FlightController', () => {
  let flightController: FlightController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    flightController = new FlightController();
    req = {
      body: {
        identification: '12345',
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('Should return 400 if required fields are missing', async () => {
    (_validationMissingFields as jest.Mock).mockReturnValue(['identification']);

    await flightController.getFlights(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Required fields are missing',
      data: ['identification'],
    });
  });

  it('Should return flights if found', async () => {
    (_validationMissingFields as jest.Mock).mockReturnValue([]);
    const mockFlights = [
      {
        number: 'AF837',
        airline: 'Avianca',
        departure_datetime: '2021-12-17T10:00:00Z',
        departure_city: 'Tokio',
        arrival_city: 'Seul',
        seat: '14A',
        created_at: '2021-12-01T12:00:00Z',
        passenger: {
          identification: '12345',
          name: 'Alex',
          surname: 'Comax',
        },
      },
    ];
    (prisma.flight.findMany as jest.Mock).mockResolvedValue(mockFlights);

    await flightController.getFlights(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(mockFlights);
  });

  it('Should return 404 if no flights are found', async () => {
    (_validationMissingFields as jest.Mock).mockReturnValue([]);
    (prisma.flight.findMany as jest.Mock).mockResolvedValue([]);

    await flightController.getFlights(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Flights data with the client identification 12345 was not found',
    });
  });

  it('Should return 500 if an error occurs during database query', async () => {
    (prisma.flight.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

    await flightController.getFlights(req as Request, res as Response);

    expect(_logger.error).toHaveBeenCalledWith(expect.stringContaining('Error searching flights:'), 'flights');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error in searching flights' });
  });
});
