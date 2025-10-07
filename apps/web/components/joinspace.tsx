"use client"
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { createRoom } from "../actions/joinspace";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import useSocket from "../hooks/socket";
import { useWorkspaceContext } from "../hooks/storeHooks";
import { outgoingMessage } from "@repo/common/types";

export default function Workspace({ session }: { session: Session }) {
    const router = useRouter()
    const [roomId, setRoomId] = useState("")
    const { isConnected, socket, lastmessage } = useSocket()
    const { updateActiveUsers, activeUsers} = useWorkspaceContext((state) => state)
    useEffect(() => {
        if (isConnected && socket && lastmessage) {
            if (lastmessage.type === "create" || lastmessage.type === "join") {
                const getactiveUsers = lastmessage.payload.activeUsers
                console.log("joinspace useEffect ran")
                updateActiveUsers(getactiveUsers)
                console.log(activeUsers)
                router.push(`/workspace/${lastmessage.roomId}`)                
            }  
        }
        
    },[lastmessage])
    async function joinFormAction(roomId: string) {
        if (socket && session) {
            const request: outgoingMessage = {
            type:"join",
            roomId: roomId,
            userId:session.user.id
            }
            socket.send(JSON.stringify(request))
        }
    }
    async function createFormAction() {
        if(socket && session){
            try {
                const roomId = await createRoom(session.user.id!)
                if (roomId) {
                    const request: outgoingMessage = {
                        type: "create",
                        roomId: roomId as string,
                        userId: session.user.id
                    }
                    socket.send(JSON.stringify(request))
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    if (isConnected && socket) {
        return (
            <div>
                <div>Create or Join a workspace</div>
                <div>
                    <form action={() => joinFormAction(roomId)}>
                        <label htmlFor="roomId">Enter room Id</label>
                        <input name="roomId" id="roomId" placeholder="123456" value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
                        <Button type={ "submit"}>join</Button>
                    </form>
                    <form action={() => createFormAction()}>
                        <Button type="submit">create</Button>
                    </form>
                </div>
            </div>
        )
    }
}