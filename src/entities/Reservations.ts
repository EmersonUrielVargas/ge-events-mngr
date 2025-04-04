import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Event } from "./Event";


@Entity("reservations")
export class Reservation extends BaseEntity{

    @PrimaryColumn({
        name: "event_id",
        type: "int"
    })
    eventId: number

    @PrimaryColumn({
        name: "user_id",
        type: "int"
    })
    userId: number

    @ManyToOne(() => User, user => user.reservations)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Event, events => events.reservations)
    @JoinColumn({ name: "event_id" })
    event: Event;

    @Column({ 
        name: "is_active",
        type: "boolean",
        default: true
    })
    isActive:boolean
}