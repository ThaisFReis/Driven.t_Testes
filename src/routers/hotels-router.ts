import { Router } from 'express';
// import auth
import { authenticateToken } from '@/middlewares/authentication-middleware';
// import routes
import hotelsController from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter
    .all("/*", authenticateToken)
    .get("/hotels", hotelsController.getAll)
    .get("/hotels/:hotelId", hotelsController.getRooms);

export { hotelsRouter };
