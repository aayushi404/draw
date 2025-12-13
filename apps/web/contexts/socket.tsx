"use client"
import { incommingMessage } from "@repo/common/types"
import { createContext, ReactNode, useEffect, useState } from "react"

const WebSocketContext = createContext<contextValue | null>(null)

type contextValue = {
    socket: WebSocket | null,
    isConnected: boolean,
    lastmessage: incommingMessage | null,
    error:Event | null
}
const WebSocketProvider = ({ children } : {children:ReactNode}) => {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [lastmessage, setLastMessage] = useState<incommingMessage | null>(null)
    const [error, setError] = useState<Event | null>(null)

    useEffect(() => {
        const wss = new WebSocket("http://localhost:8080")
        wss.onopen = () => {
            console.log("websocket get connected from client")
            setSocket(wss)
            setIsConnected(!isConnected)
        }
        wss.onmessage = (msg) => {
            const response: incommingMessage = JSON.parse(msg.data)
            //add error logic
            setLastMessage(response)
        }
        wss.onclose = () => {
            console.log("websocket connection closed")
            setSocket(null)
            setIsConnected(!isConnected)
        }

        wss.onerror = (error) => {
            setError(error)
            console.log("websocket error occured" + error)
        }

        return () => {
            if (wss.readyState === 1) {
                wss.close
            }
        }
    }, [])
    
    const value:contextValue = { socket, isConnected, lastmessage, error }

    return (
        <WebSocketContext value={value}>
            {children}
        </WebSocketContext>
    )
    
}

export { WebSocketProvider, WebSocketContext }