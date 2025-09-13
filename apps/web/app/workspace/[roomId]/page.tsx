"use client"

import { useEffect } from "react"
import useSocket from "../../../hooks/socket"
import Users from "../../../components/users"
import ChatArea from "../../../components/chatArea"
import InputArea from "../../../components/inputArea"
import { incommingMessage } from "@repo/common/types"

export default async function Room({
    params
}: {
    params:Promise<{roomId:string}>
    }) {
    const { isConnected, socket, lastmessage, error } = useSocket()
    const { roomId } = await params
    useEffect(() => {
        if (isConnected && socket) {
            socket.onmessage = (msg) => {
                const response: incommingMessage = msg.data
                if (response.type === "join") {
                    
                }
                if (response.type === "message") {
                    
                }
            }
        }
    })
    if(isConnected){
        return (
            <>
                <Users roomId={roomId} />
                <ChatArea roomId={roomId} />
                <InputArea roomId={ roomId} />
            </>
        )
    }
}