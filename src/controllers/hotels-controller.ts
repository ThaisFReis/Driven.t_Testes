import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { NextFunction, Request, Response } from "express";
import hotelsService from "@/services/hotels-service";

// Encontra todos os hotéis
async function getAll (req: Request, res: Response, next: NextFunction) {
  try {
    const hotels = await hotelsService.getAllHotels();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
}

// Listar os quartos do hotel
async function getRooms (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const { hotelId } = req.params;
        const hotel = await hotelsService.getWithRoomsById(Number(hotelId));
        if (!hotel) {
            return res.status(404).json({ message: "Hotel não encontrado" });
        }
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

const hotelsController = {
    getAll,
    getRooms
};

export default hotelsController;

// Este arquivo é responsável por gerenciar as requisições que chegam ao servidor relacionadas aos hotéis e responder adequadamente.