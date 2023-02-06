import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
    const hotel = await prisma.hotel.create({
        data: {
        name: faker.name.findName(),
        image: faker.image.imageUrl(),
        },
    });
    
    return hotel;
}

export async function createRoomWithHotelId(hotelId: number) {
    const room = await prisma.room.create({
        data: {
        name: "0000",
        capacity: 2,
        hotelId: hotelId,
        },
    });

    return room;
}