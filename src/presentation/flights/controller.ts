import { Request, Response } from 'express';
import { prisma } from '../../data/postgres'
import { _validationMissingFields } from '../../utils/validations';

export class FlightController {
    constructor(){}

    public getFlights = async(req: Request, res: Response) => {
        const missingFields = _validationMissingFields(req, 'identification');
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
            console.error("Error searching flights", error);
            return res.status(500).json({error: 'Internal Server Error'});
        }

        (flights.length > 0)
            ? res.json(flights)
            : res.status(404).json({error: `Flights data with the client identification ${identification} was not found`});
    }
}