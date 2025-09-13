"use client"

import { useEffect } from "react"
import useSocket from "../../../hooks/socket"
import Users from "../../../components/users"
import ChatArea from "../../../components/chatArea"
import InputArea from "../../../components/inputArea"

export default async function Room({
    params
}: {
    params:Promise<{roomId:string}>
    }) {
    const { isConnected, socket, lastmessage, error } = useSocket()
    const { roomId } = await params
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