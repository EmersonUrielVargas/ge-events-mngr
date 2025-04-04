import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("event_status")
export class EventStatus extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description:string
}