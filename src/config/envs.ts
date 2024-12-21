import 'dotenv/config';
import { get } from 'env-var'; 

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').required().asString(),
    REQUIRED_FIELDS_GET_FLIGHTS: get('REQUIRED_FIELDS_GET_FLIGHTS').required().asString(),
    REQUIRED_FIELDS_LOGIN: get('REQUIRED_FIELDS_LOGIN').required().asString(),
    REQUIRED_FIELDS_HASH: get('REQUIRED_FIELDS_HASH').required().asString(),
    NODE_ENV: get('NODE_ENV').required().asString()
}