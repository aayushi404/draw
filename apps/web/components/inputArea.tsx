"use client"

import { outgoingMessage } from "@repo/common/types"
import { Button } from "@repo/ui/button"
import { useState } from "react"
import useSocket from "../hooks/socket"
import { useSession } from "next-auth/react"
import { useWorkspaceContext } from "../hooks/storeHooks"
import { msg } from "../types/common"

const InputArea = ({ roomId }: { roomId: string }) => {
    const {data:session} = useSession()
    const [message, setMessage] = useState("")
    const { socket } = useSocket()
    const updateMessage = useWorkspaceContext((state) => state.updateMessage)
    async function handlefomAction() {
        if (message !== "" && socket) {
            const request: outgoingMessage = {
                type: "message",
                roomId: roomId,
                userId:session?.user.id!,
                payload: {
                    message: message
                }
            }
            socket.send(JSON.stringify(request))
        }
        setMessage("")
        const date = new Date()
        const mymsg:msg[] = [{message:message, createdAt:date.toLocaleDateString("en-AZ"),userId:session?.user.id!, userName:session?.user.name, userImage:session?.user.image}]
        updateMessage(mymsg)
    }
    return (
        <form action={handlefomAction}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button type="submit">send</Button>
        </form>
    )
}

export default InputArea