import { randomBytes } from "crypto";
import { outgoingMessage } from "@repo/common/types";
import prisma from "@repo/db/client";

async function createRoom(socket:WebSocket, userId:string) {
    const newRoomId = randomBytes(8).toString('hex');
    const request: outgoingMessage = {
        type: "create",
        roomId: newRoomId,
        userId:userId
    }
    socket.send(JSON.stringify(request))
    await prisma.room.create({
        data: {
            adminId: userId,
            roomId:newRoomId
        }
    })
}
function joinRoom(socket:WebSocket, userId:string, roomId:string) {
    const request: outgoingMessage = {
        type:"join",
        roomId: roomId,
        userId:userId
    }
    socket.send(JSON.stringify(request))
}

export {createRoom, joinRoom}