
import { EventService } from "@services/eventService";
import { Router } from "express";
import { validateDto } from "@middlewares/validateDto";
import { ScheduleEventDto } from "@dto/ScheduleEventDto";
import { UpdateEventDto } from "@dto/UpdateEventDto";

const router = Router();
const eventService = new EventService();

const eventsController = ()=>{

    router.get('/', async (req, res, next)=>{
        await eventService.getAll(req, res, next);
    });

    router.get('/:id', async (req, res, next)=>{
        await eventService.getEvent(req, res, next);
    });

    router.post('/schedule', validateDto(ScheduleEventDto), async (req, res, next)=>{
       await eventService.scheduleEvent(req, res, next);
    });

    router.patch('/modify/:id', validateDto(UpdateEventDto), async (req, res, next)=>{
        await eventService.updateEvent(req, res, next);
    });

    router.delete('/:id', async (req, res, next)=>{
        await eventService.cancelEvent(req, res, next);
    });

    return router;
}

export default eventsController;
