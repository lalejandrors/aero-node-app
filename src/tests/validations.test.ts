import { Request } from 'express';
import { _validationMissingFields } from '../utils';

describe('_validationMissingFields', () => {
    let req: Partial<Request>;

    beforeEach(() => {
        req = {
            body: {},
        };
    });

    it('Should return an empty array if no fields are missing', () => {
        req.body = { identification: '1098234', password: 'abc123' };
        const requiredFields = 'identification,password';

        const result = _validationMissingFields(req as Request, requiredFields);

        expect(result).toEqual([]);
    });

    it('Should return an array of missing fields if some are missing', () => {
        req.body = { identification: '1098234' };
        const requiredFields = 'identification,password';

        const result = _validationMissingFields(req as Request, requiredFields);

        expect(result).toEqual(['password']);
    });

    it('Should return all required fields if none are present in the request body', () => {
        req.body = {};
        const requiredFields = 'identification,password';

        const result = _validationMissingFields(req as Request, requiredFields);

        expect(result).toEqual(['identification', 'password']);
    });

    it('Should return an empty array if the required string is empty', () => {
        req.body = { identification: '1098234', password: 'abc123' };
        const requiredFields = '';

        const result = _validationMissingFields(req as Request, requiredFields);

        expect(result).toEqual([]);
    });
});
