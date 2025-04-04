import { AppDataSource } from "@bd";
import { Event } from "@entities/Event";
import { EventStatusEnum } from "@enum/EventStatusEnum";
import { EntityManager } from "typeorm";

export const EventRepository = AppDataSource.getRepository(Event).extend({

    async getAll(): Promise<Event[]>{
        return this.find({
            select: {
                id: true,
                name: true,
                description: true,
                location: true,
                attendeesSize: true,
                eventDate: true
            },
            relations:{
                status: true
            }
        });
    },
    async getEvent(eventId: number){
        return this.findOne({
           where:{ id: eventId},
           relations:{
                status:true,
                organizerId:true
           }
        })
    },
    async cancelEvent(eventId: number){
        return this.createQueryBuilder()
            .update(Event)
            .set({
                status: () => `(SELECT id FROM event_status WHERE description = '${EventStatusEnum.CANCELED}')`
            })
            .where("id = :eventId", { eventId })
            .execute();
    },
    async getEventTransactional(manager: EntityManager, eventId: number){
        return await manager
            .createQueryBuilder(Event, "event")
            .innerJoinAndSelect("event.status", "status")
            .where("event.id = :id", { id: eventId })
            .setLock("pessimistic_write")
            .getOne();
    },
    async changeStatusEventTransactional(manager: EntityManager, eventId: number, statusDesc: EventStatusEnum){
        return manager
            .createQueryBuilder(Event, "event")
            .update(Event)
            .set({
                status: () => `(SELECT id FROM event_status WHERE description = '${statusDesc}')`
            })
            .where("id = :eventId", { eventId })
            .execute();
    }

})