import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { _generateToken } from '../../utils/jwt';
import { prisma } from '../../data/postgres'
import { _validationMissingFields } from '../../utils/validations';

export class AuthController {
    constructor(){}

    public login = async(req: Request, res: Response) => {
        const missingFields = _validationMissingFields(req, 'identification,password');
        if(missingFields.length > 0){
            return res.status(400).json({error: 'Required fields are missing', data: missingFields});
        }
        
        const {identification, password} = req.body;

        const passenger = await prisma.passenger.findFirst({
            where: {identification}
        });
        if ( !passenger ) return res.status( 404 ).json( { error: `Passenger with identification ${ identification } not found` } );

        try {
            const passwordMatch = await bcrypt.compare(password, passenger.password);
            if (!passwordMatch) return res.status( 401 ).json( { error: 'Invalid password' } );

            const token = _generateToken({identification: passenger.identification});
            res.status(201).json({message: 'Token has been generated', token: token});
        } catch (error) {
            console.error("Error comparing password:", error);
            return res.status(500).json({error: 'Error in token generation'});
        }
    }

    public hashPassword = async(req: Request, res: Response) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        res.status(201).json({ hashedPassword });
    }
}