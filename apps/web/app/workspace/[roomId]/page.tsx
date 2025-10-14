"use client"

import { useEffect, useRef } from "react"
import useSocket from "../../../hooks/socket"
import Users from "../../../components/users"
import { activeUsersType } from "@repo/common/types"
import { useWorkspaceContext } from "../../../hooks/storeHooks"
import { getMessages } from "../../../actions/getdata"
import { type msg } from "../../../types/common"
import { useParams } from "next/navigation"
import DrawArea from "../../../components/DrawArea"

export default function Room() {
    const params = useParams<{ roomId: string }>()
    const { isConnected, lastmessage} = useSocket()
    const { roomId } = params
    const hasMounted = useRef(false)
    const {updateActiveUsers, updateMessage, deleteActiveUsers} = useWorkspaceContext((state) => state)
    useEffect(() => {
        if (hasMounted.current) {
            const response = lastmessage
            if (response) {
                if (response.type === "join" && !response.payload.message) {
                    const newJoinee = [response.payload.activeUsers.pop() as activeUsersType]
                    updateActiveUsers(newJoinee)
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
                if (response.type === "leave") {
                    deleteActiveUsers(response.name)
                }
            }
        } else {
            hasMounted.current = true
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastmessage]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages(roomId)
                if (response) {
                    updateMessage(response)
                }
            } catch (err) {
                if (err instanceof Error) {
                    console.log(`Error ocurred: ${err.message}`)
                }
            }
        }
        fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    if(isConnected){
        return (
            <>
                <Users />
                <DrawArea roomId={ roomId} /> 
            </>
        )
    }
}