import { AppDataSource } from "@bd";
import { Reservation } from "@entities/Reservations";
import { EventStatusEnum } from "@enum/EventStatusEnum";
import { EventRepository } from "./eventRepository"; 
import { constants } from "http2";

export const ReservationRepository = AppDataSource.getRepository(Reservation).extend({
    async getAll(): Promise<Reservation[]>{
        return this.find();
    },
    async getReservationsByEvent(eventId: number): Promise<Reservation[]>{
        return this.find({
            where: {
                eventId: eventId
            },
            relations:{
                user: true
            }
        })
    },
    async getReservationsByUser(userId: number): Promise<Reservation[]>{
        return this.find({
            where:{ userId: userId },
            relations:{ event: true }
        })
    },
    async cancelByEvent(eventId: number){
        return this.update({ eventId: eventId}, {isActive: false});
    },
    async registerReservation(reservationData: Reservation){
        const entityManager = AppDataSource.manager;
        await entityManager.transaction(async (transactionalEntityManager) => {
            const { eventId, userId } = reservationData;
            const existReservation = await transactionalEntityManager.exists(Reservation, { where: { eventId, userId } });
            if(existReservation){
                const errorRs = {
                    statusCode: constants.HTTP_STATUS_CONFLICT,
                    description: 'There is already an active reservation with this data' 
                }
                throw new Error(JSON.stringify(errorRs));
            }
            const reservationsActive = await transactionalEntityManager.count(Reservation,
                { where:{ eventId : reservationData.eventId, isActive: true } }
            );
            const eventData = await EventRepository.getEventTransactional(transactionalEntityManager, reservationData.eventId);
            const isAvailableSpace = reservationsActive < Number(eventData?.attendeesSize);
            const isStatusValid = eventData?.status.description === EventStatusEnum.ACTIVE;
            if(isAvailableSpace && isStatusValid){
                await transactionalEntityManager.save(Reservation, reservationData);
                const isEventFull = (reservationsActive + 1) === Number(eventData?.attendeesSize);
                if (isEventFull && !existReservation) {
                    await EventRepository.changeStatusEventTransactional(transactionalEntityManager, reservationData.eventId, EventStatusEnum.FULL);
                }
            }else{
                const errorRs = {
                    statusCode: constants.HTTP_STATUS_CONFLICT,
                    description: 'The event is full' 
                }
                throw new Error(JSON.stringify(errorRs));
            }
        })
    },
    async cancelReservation(reservationData: Reservation){
        const entityManager = AppDataSource.manager;
        await entityManager.transaction(async (transactionalEntityManager) => {
            const eventData = await EventRepository.getEventTransactional(transactionalEntityManager, reservationData.eventId);
            const { eventId, userId } = reservationData;
            await transactionalEntityManager.update(Reservation, { eventId, userId}, reservationData);
            if (eventData?.status.description === EventStatusEnum.FULL) {
                await EventRepository.changeStatusEventTransactional(transactionalEntityManager, reservationData.eventId, EventStatusEnum.ACTIVE);
            }
        })
    },
})