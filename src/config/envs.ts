import 'dotenv/config';
import { get } from 'env-var'; 

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').required().asString()
}