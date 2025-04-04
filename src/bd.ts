import { DATABASE_HOST, DATABASE_LOGGING, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "@config";
import { Event } from "@entities/Event";
import { EventStatus } from "@entities/EventStatus";
import { Reservation } from "@entities/Reservations";
import { User } from "@entities/User";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    logging: Boolean(DATABASE_LOGGING),
    entities: [User, Event, EventStatus, Reservation],
    subscribers: [],
    migrations: [],
})