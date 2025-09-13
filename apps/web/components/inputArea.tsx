"use client"

import { outgoingMessage } from "@repo/common/types"
import { Button } from "@repo/ui/button"
import { useState } from "react"
import useSocket from "../hooks/socket"

const InputArea = ({roomId}:{roomId:string}) => {
    const [message, setMessage] = useState("")
    const {socket} = useSocket()
    async function handlefomAction() {
        if (message !== "" && socket) {
            const request: outgoingMessage = {
                type: "message",
                roomId: roomId,
                payload: {
                    message: message
                }
            }
            socket.send(JSON.stringify(request))
        }
    }
    return (
        <form action={handlefomAction}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button type="submit">send</Button>
        </form>
    )
}

export default InputArea