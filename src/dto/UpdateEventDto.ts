import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateEventDto {
    
    @IsOptional()
    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    description:string

    @IsOptional()
    @IsString()
    location:string

    @IsOptional()
    @IsNumber()
    attendeesSize: number

    @IsOptional()
    @IsDateString()
    eventDate:string

    @IsOptional()
    @IsNumber()
    status:number
}