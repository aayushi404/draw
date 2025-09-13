import { randomBytes } from "crypto";
import { outgoingMessage } from "@repo/common/types";

function createRoom(socket:WebSocket, userId:string) {
    const newRoomId = randomBytes(8).toString('hex');
    const request: outgoingMessage = {
        type: "create",
        roomId: newRoomId,
        user: {
            userId:userId
        }
    }
    socket.send(JSON.stringify(request))
}
function joinRoom(socket:WebSocket, userId:string, roomId:string) {
    const request: outgoingMessage = {
        type:"join",
        roomId: roomId,
        user: {
            userId:userId
        }
    }
    socket.send(JSON.stringify(request))
}

export {createRoom, joinRoom}