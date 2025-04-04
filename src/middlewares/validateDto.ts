import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { constants } from "http2";

export const validateDto = (dtoClass: any) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const input = plainToInstance(dtoClass, req.body);
        const errors = await validate(input, { whitelist: true, forbidNonWhitelisted: true });

        if (errors.length > 0) {
            const errorRs = {
                statusCode: constants.HTTP_STATUS_BAD_REQUEST,
                description: 'Invalid request body' 
            }
            throw new Error(JSON.stringify(errorRs));
        }
        req.body = input;
        next();
    };
};