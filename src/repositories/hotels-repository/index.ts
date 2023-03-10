import { prisma } from '@/config'

// Encontra todos os hotéis incluindo os quartos
async function findAllHotels() {
    return await prisma.hotel.findMany({
        include: {
        Rooms: true,
        },
    })
}

// Encontra um hotel pelo id incluindo os quartos
async function findWithRoomsById(hotelId: number) {
    return await prisma.hotel.findFirst({
        where: { id: hotelId },
        include: {
        Rooms: true,
        },
    })
}

const hotelsRepository = {
    findAllHotels,
    findWithRoomsById,
}

export default hotelsRepository;

// Este arquivo representa o repositório de hotéis e suas ações no banco de dados.