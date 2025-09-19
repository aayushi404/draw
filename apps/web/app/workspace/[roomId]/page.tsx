"use client"

import { useEffect, useRef } from "react"
import useSocket from "../../../hooks/socket"
import Users from "../../../components/users"
import ChatArea from "../../../components/chatArea"
import InputArea from "../../../components/inputArea"
import { activeUsersType } from "@repo/common/types"
import { useWorkspaceContext } from "../../../hooks/storeHooks"
import { getMessages } from "../../../actions/getdata"
import { type msg } from "../../../types/common"
import { useParams } from "next/navigation"

export default function Room() {
    const params = useParams<{ roomId: string }>()
    const { isConnected, lastmessage} = useSocket()
    const { roomId } = params
    const hasMounted = useRef(false)
    const {updateActiveUsers, updateMessage, activeUsers} = useWorkspaceContext((state) => state)
    useEffect(() => {
        if (hasMounted.current) {
            const response = lastmessage
            if (response) {
                if (response.type === "join" && !response.payload.message) {
                    //other people have joined
                    const newJoinee = [response.payload.activeUsers.pop() as activeUsersType]
                    console.log("rooms useEffect ran")
                    updateActiveUsers(newJoinee)
                    console.log(activeUsers)
                }
                if (response.type === "message") {
                    const date = new Date()
                    const newMsg: msg[] = [
                        {
                            message: response.payload.message,
                            userId: response.userId,
                            createdAt: date.toLocaleDateString("en-ZA")
                        }]
                    updateMessage(newMsg)
                }
            }
        } else {
            hasMounted.current = true
        }
    }, [lastmessage]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages(roomId)
                if (response) {
                    updateMessage(response)
                    console.log(response)
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
                <ChatArea/>
                <InputArea roomId={ roomId} />
            </>
        )
    }
}