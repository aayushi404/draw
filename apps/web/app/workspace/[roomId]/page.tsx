"use client"

import { useEffect } from "react"
import useSocket from "../../../hooks/socket"
import Users from "../../../components/users"
import ChatArea from "../../../components/chatArea"
import InputArea from "../../../components/inputArea"
import { activeUsersType, incommingMessage } from "@repo/common/types"
import { useWorkspaceContext } from "../../../hooks/storeHooks"
import { getMessages } from "../../../actions/getdata"
import { type msg } from "../../../types/common"

export default async function Room({
    params
}: {
    params:Promise<{roomId:string}>
    }) {
    const { isConnected, lastmessage} = useSocket()
    const { roomId } = await params
    const {updateActiveUsers, updateMessage, activeUsers} = useWorkspaceContext((state) => state)
    useEffect(() => {
        const response = lastmessage
        if(response){
            if (response.type === "join") {
                //other people have joined
                const newJoinee = [response.payload.activeUsers.pop() as activeUsersType]    
                updateActiveUsers(newJoinee)
                
            }
            if (response.type === "message") {
                const date = new Date()
                const newMsg: msg[] = [
                    {
                        message: response.payload.message,
                        userId: response.userId,
                        createdAt:date.toLocaleDateString("en-ZA")
                    }]
                updateMessage(newMsg)
            }
        }
    }, [lastmessage]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages(roomId)
                if (response) {
                    updateMessage(response)
                }
            } catch {
                return new Error("something went wrong")
            }
        }
        fetchMessages()
    },[])
    if(isConnected){
        return (
            <>
                <Users />
                <ChatArea roomId={roomId} />
                <InputArea roomId={ roomId} />
            </>
        )
    }
}