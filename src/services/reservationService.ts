import { NextFunction, Request, Response } from "express";
import { ReservationRepository } from "@repository/reservationRepository";
import { constants } from "http2";
import { Reservation } from "@entities/Reservations";

export class ReservationService {

    private reservationRepository = ReservationRepository;
    
    async getAll(_request:Request, response: Response, next: NextFunction){
        try{
            const eventsList = await this.reservationRepository.getAll();
            if (eventsList.length === 0) {
                const errorRs = {
                    statusCode: constants.HTTP_STATUS_NO_CONTENT,
                    description: 'There are no reservations' 
                }
                throw new Error(JSON.stringify(errorRs));
            }else{
                return response.status(constants.HTTP_STATUS_OK).send(eventsList)
            }
        }catch(error){
            return next(error);
        }
    }
    
    async getOne(request:Request, response: Response, next: NextFunction){
        try{
            const { userId, eventId } = request.params;
            const reservation = await this.reservationRepository.findOneReservation(Number(userId), Number(eventId));
            if (reservation) {
                return response.status(constants.HTTP_STATUS_OK).send(reservation)
            }else{
                const errorRs = {
                    statusCode: constants.HTTP_STATUS_NO_CONTENT,
                    description: 'There are no reservations' 
                }
                throw new Error(JSON.stringify(errorRs));
            }
        }catch(error){
            return next(error);
        }
    }

    async getByUser(request:Request, response: Response, next: NextFunction){
        try{
            const userId = request.params.id;
            const reservations = await this.reservationRepository.getReservationsByUser(Number(userId));
            if (reservations.length === 0) {
                const errorRs = {
                    statusCode: constants.HTTP_STATUS_NO_CONTENT,
                    description: 'There are no reservations' 
                }
                throw new Error(JSON.stringify(errorRs));
            }else{
                return response.status(constants.HTTP_STATUS_OK).send(reservations);
            }
        }catch(error){
            return next(error);
        }
    }

    async getByEvent(request:Request, response: Response, next: NextFunction){
        try{
            const eventId = request.params.id;
            const reservations = await this.reservationRepository.getReservationsByEvent(Number(eventId));
            if (reservations.length === 0) {
                const errorRs = {
                    statusCode: constants.HTTP_STATUS_NO_CONTENT,
                    description: 'There are no reservations' 
                }
                throw new Error(JSON.stringify(errorRs));
            }else{
                return response.status(constants.HTTP_STATUS_OK).send(reservations);
            }
        }catch(error){
            return next(error);
        }
    }

    async registerReservation(request:Request, response: Response, next: NextFunction){
        try{
            const reservationData: Reservation = request.body;
            await this.reservationRepository.registerReservation(reservationData);
            return response.status(constants.HTTP_STATUS_OK).send()
        }catch(error){
            return next(error);
        }
    }

    async cancelReservation(request:Request, response: Response, next: NextFunction){
        try{
            const reservationData: Reservation = request.body;
            reservationData.isActive = false;
            await this.reservationRepository.cancelReservation(reservationData);
            return response.status(constants.HTTP_STATUS_OK).send()
        }catch(error){
            return next(error);
        }
    }

}