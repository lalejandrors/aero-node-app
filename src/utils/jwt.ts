import jwt from 'jsonwebtoken';
import { envs } from "../config/envs";

export const _generateToken = (payload: {identification: string}) => {
    return jwt.sign(payload, envs.JWT_SECRET, {expiresIn: envs.JWT_EXPIRES_IN});
}

export const _verifyToken = (token: string) => {
    return jwt.verify(token, envs.JWT_SECRET);
}