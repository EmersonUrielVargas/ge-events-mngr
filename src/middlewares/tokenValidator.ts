import { SECRET_KEY } from "@config";
import { Constants } from "@utilities/constants";
import { Request, NextFunction, Response } from "express";
import { constants } from "http2";
import jwt from "jsonwebtoken";

export const tokenValidator = (req:Request, res: Response, next: NextFunction)=>{
    const authHeader = req.get(Constants.headerToken);
    const authError = {
        statusCode: constants.HTTP_STATUS_UNAUTHORIZED,
        description: 'Authentication information not found' 
    }
    try {
        if (authHeader) {
            const token = authHeader.split(' ');
            if (token && token[0].toLowerCase() === 'bearer') {
                const decodeToken = jwt.verify(token[1], SECRET_KEY);
                res.locals.user = decodeToken;
            }
        }else{
            throw new Error(JSON.stringify(authError));
        }
        next();
    } catch(error) {
        return next(new Error(JSON.stringify((authError))));
    }
}