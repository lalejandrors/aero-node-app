import { Request, Response } from 'express';
import { envs } from "../../config/envs";
import { prisma } from '../../data/postgres'
import { _logger, _validationMissingFields } from '../../utils';

export class FlightController {
    constructor(){}

    public getFlights = async(req: Request, res: Response) => {
        const missingFields = _validationMissingFields(req, envs.REQUIRED_FIELDS_GET_FLIGHTS);
        if(missingFields.length > 0){
            return res.status(400).json({error: 'Required fields are missing', data: missingFields});
        }

        const { identification } = req.body;
        let flights;

        try {
            flights = await prisma.flight.findMany({
                where: {
                    passenger: {
                        identification: `${identification}`,
                    },
                },
                select: {
                    number: true,
                    airline: true,
                    departure_datetime: true,
                    departure_city: true,
                    arrival_city: true,
                    seat: true,
                    created_at: true,
                    passenger: {
                        select: {
                            identification: true,
                            name: true,
                            surname: true,
                        },
                    },
                },
                orderBy: {
                    id: 'desc',
                },
            });
        } catch (error) {
            _logger.error(`Error searching flights: ${error}`, 'flights');

            return res.status(500).json({error: 'Error in searching flights'});
        }

        return (flights.length > 0)
            ? res.json(flights)
            : res.status(404).json({error: `Flights data with the client identification ${identification} was not found`});
    }
}