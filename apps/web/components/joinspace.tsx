"use client"
import { useRouter } from "next/navigation";
import { createRoom } from "../actions/joinspace";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import useSocket from "../hooks/socket";
import { useWorkspaceContext } from "../hooks/storeHooks";
import { outgoingMessage } from "@repo/common/types";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModeToggle } from "./ui/themeToggle";

export default function Workspace({ session }: { session: Session }) {
    const router = useRouter()
    const [roomId, setRoomId] = useState("")
    const { isConnected, socket, lastmessage } = useSocket()
    const updateActiveUsers = useWorkspaceContext((state) => state.updateActiveUsers)
    useEffect(() => {
        if (isConnected && socket && lastmessage) {
            if (lastmessage.type === "create" || lastmessage.type === "join") {
                const getactiveUsers = lastmessage.payload.activeUsers
                updateActiveUsers(getactiveUsers)
                router.push(`/workspace/${lastmessage.roomId}`)                
            }  
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[lastmessage, isConnected, socket])
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
            <Card>
                <CardHeader>
                    <CardDescription className="">Create or Join a workspace to collaborate</CardDescription>
                    <ModeToggle></ModeToggle>
                </CardHeader>
                <CardContent>
                    <form action={() => joinFormAction(roomId)}>
                        <label htmlFor="roomId">Enter room Id</label>
                        <Input name="roomId" id="roomId" placeholder="123456" value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
                        <Button type={ "submit"}>join</Button>
                    </form>
                    <form action={() => createFormAction()}>
                        <Button type="submit">create</Button>
                    </form>
                </CardContent>
            </Card>
        )
    }
}