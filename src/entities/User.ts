import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./Reservations";


@Entity("users")
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    email:string

    @OneToMany(()=> Reservation, (reservations) => reservations.user)
    reservations: Reservation[]
    
}