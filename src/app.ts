import 'tsconfig-paths/register';
import "reflect-metadata"
import app from "@server/server";
import { AppDataSource } from "@bd";
import { errorHandler } from "@middlewares/errorHandler";
import { PORT } from '@config';
import eventsController from '@controllers/eventsController';
import reservationsController from '@controllers/reservationsController';

async function main() {
    await AppDataSource.initialize();
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`);
    });
    app.use("/v1/api/events-mngr/events", eventsController());
    app.use("/v1/api/events-mngr/reservations", reservationsController());
    app.use(errorHandler);
    
}

main();


