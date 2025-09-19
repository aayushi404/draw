"use server"
import { randomBytes } from "crypto";
import prisma from "@repo/db/client";

async function createRoom(userId:string) {
    const newRoomId = randomBytes(8).toString('hex');
    await prisma.room.create({
        data: {
            adminId: userId,
            roomId:newRoomId
        }
    })
    return newRoomId
}

export {createRoom}