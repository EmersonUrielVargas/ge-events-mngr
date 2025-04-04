import { IsDateString, IsNumber, IsString } from "class-validator";

export class ScheduleEventDto {
    
    @IsString()
    name:string;

    @IsString()
    description:string

    @IsString()
    location:string

    @IsNumber()
    attendeesSize: number

    @IsDateString()
    eventDate:string

    @IsNumber()
    status:number

    @IsNumber()
    organizerId:number
}