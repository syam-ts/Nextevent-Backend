import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { 
            _id?: string,
             role: 'organizer' | 'guest' | 'admin'
            } 
        cookies: {refreshToken?: string}
        query: {page?: number}
    } 
}