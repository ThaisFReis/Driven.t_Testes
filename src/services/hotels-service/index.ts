import { Hotel, Room } from '@prisma/client'
import hotelsRepository from '@/repositories/hotels-repository'

// Encontra todos os hotéis
async function getAllHotels() {
    return await hotelsRepository.findAllHotels()
}

// Encontra um hotel pelo id
async function getWithRoomsById(hotelId: number) {
    return await hotelsRepository.findWithRoomsById(hotelId)
}

const hotelsService = {
    getAllHotels,
    getWithRoomsById,
};

// Este arquivo é um intermediário entre a camada de repositório e a camada de controller. É onde são definidas as regras de negócio e lógica de aplicação.