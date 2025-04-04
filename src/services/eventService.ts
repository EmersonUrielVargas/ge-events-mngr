import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import { EventRepository } from "@repository/eventRepository";
import { Event } from "@entities/Event";
import { ReservationRepository } from "@repository/reservationRepository";

export class EventService {

    private eventRepository = EventRepository;

    async getAll(_request:Request, response: Response, next: NextFunction){
        try{
            const eventsList = await this.eventRepository.getAll();
            if (eventsList.length === 0) {
                const errorRs = {
                    statusCode: constants.HTTP_STATUS_NO_CONTENT,
                    description: 'There are no events' 
                }
                throw new Error(JSON.stringify(errorRs));
            }else{
                return response.status(constants.HTTP_STATUS_OK).send(eventsList)
            }
        }catch(error){
            return next(error);
        }
    }

    async scheduleEvent(request:Request, response: Response, next: NextFunction){
        try{
            const eventData: Event = request.body;
            await this.eventRepository.save(eventData);
            return response.status(constants.HTTP_STATUS_OK).send()
        }catch(error){
            return next(error);
        }
    }

    async updateEvent(request:Request, response: Response, next: NextFunction){
        try{
            const eventData: Event = request.body;
            const eventId = request.params.id;
            await this.eventRepository.update(eventId,eventData);
            return response.status(constants.HTTP_STATUS_OK).send()
        }catch(error){
            return next(error);
        }
    }

    async getEvent(request:Request, response: Response, next: NextFunction){
        try{
            const eventId = request.params.id;
            const eventDetails = await this.eventRepository.getEvent(Number(eventId));
            return response.status(constants.HTTP_STATUS_OK).send(eventDetails)
        }catch(error){
            return next(error);
        }
    }

    async cancelEvent(request:Request, response: Response, next: NextFunction){
        try{
            const eventId = request.params.id;
            await this.eventRepository.cancelEvent(Number(eventId));
            await ReservationRepository.cancelByEvent(Number(eventId));
            response.status(constants.HTTP_STATUS_OK).send()
        }catch(error){
            return next(error);
        }
    }
}