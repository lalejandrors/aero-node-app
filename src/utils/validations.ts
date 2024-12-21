import { Request } from 'express';

export const _validationMissingFields = (req: Request, required: String): string[] => {
    if(required === ''){
        return [];
    }
    const requiredFields = required.split(',');
    const missingFields = requiredFields.filter(field => !(field in req.body));

    return (missingFields.length > 0) ? missingFields : [];
}