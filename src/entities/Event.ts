import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventStatus } from "./EventStatus";
import { User } from "./User";
import { Reservation } from "./Reservations";

@Entity("events")
export class Event extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    location:string

    @Column({
        name:"attendees_size",
        type: "int"
    })
    attendeesSize: number

    @Column({
        name:"event_date",
        type: "timestamp with time zone"
    })
    eventDate:Date

    @OneToOne(()=>EventStatus)
    @JoinColumn({name: "status_id" })
    status:EventStatus

    @OneToOne(()=>User)
    @JoinColumn({name: "organizer_id"})
    organizerId:User

    @OneToMany(()=> Reservation, (reservations) => reservations.event)
    reservations: Reservation[]
}