import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CreateReservationDto {
    
    @IsNumber()
    eventId:string;

    @IsNumber()
    userId:string

    @IsOptional()
    @IsBoolean()
    isActive:boolean
}