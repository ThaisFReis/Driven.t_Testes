import faker from "@faker-js/faker";
import supertest from "supertest";
import app from "@/app";
import { createHotel, createRoomWithHotelId } from "../factories/hotels-factory";
import { generateValidToken } from "../helpers";

describe("GET /hotels", () => {

    it("should return 404 if token is invalid", async () => {
        const token = faker.datatype.uuid();
        const res = await supertest(app).get("/hotels").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
    });

    it("should return 404 if token is not provided", async () => {
        const res = await supertest(app).get("/hotels");
        expect(res.status).toBe(401);
    });

    it("should return 200 and an empty array if there are no hotels", async () => {
        const token = generateValidToken();
        const res = await supertest(app).get("/hotels").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it("should return 200 and the hotels", async () => {
        const token = generateValidToken();
        const res = await supertest(app).get("/hotels").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
    });
});

describe("Get /hotels/:hotelId", () => {
    it("should return 404 if token is invalid", async () => {
        const token = faker.datatype.uuid();
        const hotel = await createHotel();
        const rooms = await createRoomWithHotelId(hotel.id);
        const res = await supertest(app).get(`/hotels/${rooms}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
    });

    it("should return 401 if token is not provided", async () => {
        const hotel = await createHotel();
        const rooms = await createRoomWithHotelId(hotel.id);
        const res = await supertest(app).get(`/hotels/${rooms}`);
        expect(res.status).toBe(401);
    });

    it("should return 404 if hotel does not exist", async () => {
        const token = generateValidToken();
        const res = await supertest(app).get("/hotels/999").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
    });

    it("should return 200 and the rooms", async () => {
        const token = generateValidToken();
        const hotel = await createHotel();
        const rooms = await createRoomWithHotelId(hotel.id);
        const res = await supertest(app).get(`/hotels/${rooms}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: hotel.id,
            name: hotel.name,
            image: hotel.image,
            createdAt: hotel.createdAt.toISOString(),
            updatedAt: hotel.updatedAt.toISOString(),
            Rooms: [
                {
                    id: rooms.id,
                    name: rooms.name,
                    capacity: rooms.capacity,
                    hotelId: rooms.hotelId,
                    createdAt: rooms.createdAt.toISOString(),
                    updatedAt: rooms.updatedAt.toISOString(),
                },
            ],
        });
    });
});