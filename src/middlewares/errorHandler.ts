import { Request, NextFunction, Response } from "express";
import { constants } from "http2";
import { QueryFailedError } from "typeorm";

export const errorHandler = (err: any, _req:Request, response: Response, _next: NextFunction)=>{
    let customErr = err;
    try {
        customErr = JSON.parse(customErr.message);
    } catch{}
    if (customErr?.description) {
        response.status(customErr.statusCode).send(customErr);
    }else{
        if (err instanceof QueryFailedError) {
            customErr.message = 'Error saving data in BD';
        }
        response.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
            statusCode: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            description: customErr.message
        })
    }
}