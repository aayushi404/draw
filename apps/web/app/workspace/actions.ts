import { randomBytes } from "crypto"
function createRoom(socket:WebSocket) {
    const newRoomId = randomBytes(8).toString('hex');
    
}
function joinRoom(socket:WebSocket) {
    
}

export {createRoom, joinRoom}