"use client"
import { redirect } from "next/navigation";
import { Button } from "@repo/ui/button";
import { createRoom, joinRoom } from "../actions/joinspace";
import { useState, useEffect } from "react";
import { incommingMessage } from "@repo/common/types";
import { Session } from "next-auth";
import useSocket from "../hooks/socket";

export default function Workspace({session}:{session:Session}) {
    const [roomId, setRoomId] = useState("")
    const {isConnected, socket, lastmessage} = useSocket()
    
    useEffect(() => {
        if (isConnected && socket && lastmessage) {
            if (lastmessage.type === "create" || lastmessage.type === "join") {
                redirect(`/workspace/${lastmessage.roomId}`)                
            }  
        }
        return () => socket?.close()
    },[])
    async function joinFormAction(roomId: string) {
        if (socket && session) {
            joinRoom(socket, session.user.id, roomId)
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
                    <form action={() => createRoom(socket, session.user?.id)}>
                        <Button type="submit">create</Button>
                    </form>
                </div>
            </div>
        )
    }
}