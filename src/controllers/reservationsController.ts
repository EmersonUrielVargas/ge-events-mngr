
import { CreateReservationDto } from "@dto/CreateReservationDto";
import { validateDto } from "@middlewares/validateDto";
import { ReservationService } from "@services/reservationService";
import { Router } from "express";

const router = Router();
const reservationService = new ReservationService();

const reservationsController = ()=>{
 
    router.get('/', async (req, res, next)=>{
        await reservationService.getAll(req, res, next);
    });

    router.get('/:userId/:eventId', async (req, res, next)=>{
        await reservationService.getOne(req, res, next);
    });

    router.get('/user/:id', async (req, res, next)=>{
        await reservationService.getByUser(req, res, next);
    });

    router.get('/event/:id', async (req, res, next)=>{
        await reservationService.getByEvent(req, res, next);
    });

    router.post('/register', validateDto(CreateReservationDto), async (req, res, next)=>{
        await reservationService.registerReservation(req, res, next);
    });

    router.delete('/cancel',validateDto(CreateReservationDto), async (req, res, next)=>{
        await reservationService.cancelReservation(req, res, next);
    });

    return router;
}

export default reservationsController;
