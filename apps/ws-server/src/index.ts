import { incommingMessage, outgoingMessage, activeUsersType } from "@repo/common/types";
import { WebSocketServer, WebSocket } from "ws";
import { getUser, createChat } from "./database_actions";

const wss = new WebSocketServer({ port: 8080 });

const spaces: Record<string, WebSocket[]> = {}
const actives:Record<string, activeUsersType[]> = {}

wss.on("connection", (ws) => {
    ws.on("error", console.error)
    
    ws.on("message", async (msg) => {
        const data: outgoingMessage = JSON.parse(msg.toString())
        try {
            if (data.type === "create" || data.type === "join") {
                const userInfo = await getUser(data.userId)
                if (!userInfo) {
                    throw new Error("user not exist")
                }
                if (data.type === "create") {
                    spaces[data.roomId] = []
                    spaces[data.roomId]?.push(ws)
                    actives[data.roomId] = []
                    actives[data.roomId]?.push({
                        name: userInfo.name!,
                        image:userInfo.image!
                    })
                } else {
                    spaces[data.roomId]?.push(ws)
                    actives[data.roomId]?.push({
                        name: userInfo.name!,
                        image:userInfo.image!
                    })

                }

                const response: incommingMessage = {
                    type: data.type,
                    roomId: data.roomId,
                    payload: {
                        activeUsers: actives[data.roomId]!,
                        message:`welcome to the room ${data.roomId}`
                    }
                }
                ws.send(JSON.stringify(response))
                const broadcastResponse: incommingMessage = {
                    type: data.type,
                    roomId: data.roomId,
                    payload: {
                        activeUsers: [{ name: userInfo.name!, image: userInfo.image! }],
                        message:`${userInfo.name} joined the chat`
                    }
                }
                spaces[data.roomId]?.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(broadcastResponse))
                    }
                })
            }
            if (data.type === "message") {
                const response: incommingMessage = {
                    type: "message",
                    roomId: data.roomId,
                    userId:data.userId,
                    payload: {
                        message:data.payload.message
                    }
                }
                spaces[data.roomId]?.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(response))
                    }
                })
                await createChat({
                    roomId: data.roomId,
                    userId: data.userId,
                    message:data.payload.message
                })
            }
        } catch (e) {
            const errorResponse: incommingMessage = {
                type: "error",
                error: {
                    status: 500,
                    message:"something went wrong"
                }
            }
            ws.send(JSON.stringify(errorResponse))
        }
    })

    ws.send(JSON.stringify({message:"ws connected", status:200}))

    ws.on("close", () => {
        console.log("closing connection")
    })
})