import bcrypt from 'bcrypt';
import { envs } from "../../config/envs";
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres'
import { _logger, _generateToken, _validationMissingFields } from '../../utils';

export class AuthController {
    constructor(){}

    public login = async(req: Request, res: Response) => {
        const missingFields = _validationMissingFields(req, envs.REQUIRED_FIELDS_LOGIN);
        if(missingFields.length > 0){
            return res.status(400).json({error: 'Required fields are missing', data: missingFields});
        }
        
        const {identification, password} = req.body;

        try {
            const passenger = await prisma.passenger.findFirst({
                where: {identification}
            });
            if ( !passenger ) return res.status( 404 ).json( { error: `Passenger with identification ${ identification } not found` } );

            const passwordMatch = await bcrypt.compare(password, passenger.password);
            if (!passwordMatch) return res.status( 401 ).json( { error: 'Invalid password' } );

            const token = _generateToken({identification: passenger.identification});
            return res.status(201).json({message: 'Token has been generated', token: token});
        } catch (error) {
            _logger.error(`Error comparing password: ${error}`, 'login');

            return res.status(500).json({error: 'Error in token generation'});
        }
    }

    public hashPassword = async(req: Request, res: Response) => {
        const missingFields = _validationMissingFields(req, envs.REQUIRED_FIELDS_HASH);
        if(missingFields.length > 0){
            return res.status(400).json({error: 'Required fields are missing', data: missingFields});
        }

        const saltRounds = 10;
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            return res.status(201).json({ hashedPassword });
        } catch (error) {
            _logger.error(`Error hashing password: ${error}`, 'hash');

            return res.status(500).json({error: 'Error in hashing password'});
        }
    }
}