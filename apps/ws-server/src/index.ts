import { incommingMessage, outgoingMessage } from "@repo/common/types";
import { WebSocketServer, WebSocket } from "ws";
import { getUser } from "./database_actions";

const wss = new WebSocketServer({ port: 8080 });

const spaces: Record<string, WebSocket[]> = {}

wss.on("connection", (ws) => {
    ws.on("error", console.error)
    
    ws.on("message", async (msg) => {
        const data: outgoingMessage = JSON.parse(msg.toString())
        try {
            if (data.type === "create" || data.type === "join") {
                const userInfo = await getUser(data.user.userId)
                if (!userInfo) {
                    throw new Error("user not exist")
                }
                if (data.type === "create") {
                    spaces[data.roomId] = []
                    spaces[data.roomId]?.push(ws)
                } else {
                    spaces[data.roomId]?.push(ws)
                }

                const response: incommingMessage = {
                    type: data.type,
                    roomId: data.roomId,
                    user: {
                        name: userInfo.name!,
                        image:userInfo.image!
                    }
                }
                spaces[data.roomId]?.forEach(client => {
                    client.send(JSON.stringify(response))
                })
            }
            if (data.type === "message") {
                const response: incommingMessage = {
                    type: "message",
                    roomId: data.roomId,
                    payload: {
                        message:data.payload.message
                    }
                }
                spaces[data.roomId]?.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(response))
                    }
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