"use client"
import { useRouter } from "next/navigation";
import { createRoom } from "../actions/joinspace";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import useSocket from "../hooks/socket";
import { useWorkspaceContext } from "../hooks/storeHooks";
import { outgoingMessage } from "@repo/common/types";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { ModeToggle } from "./ui/themeToggle";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export default function Workspace({ session }: { session: Session }) {
    console.log(session)
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
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                    <Button variant="outline" className="absolute sm:right-5 sm:top-4 right:2 top:2 z-1002 pointer-events-auto">Collab</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Collab Together</DialogTitle>
                        <DialogDescription>
                        Join a room to Draw with your friends.
                        </DialogDescription>
                    </DialogHeader>
                     <form action={() => joinFormAction(roomId)}>
                        <label htmlFor="roomId">Enter room Id</label>
                        <Input name="roomId" id="roomId" placeholder="123456" value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
                        <Button type={ "submit"}>join</Button>
                    </form>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <form action={() => createFormAction()}>
                        <Button type="submit">create</Button>
                    </form>
                    </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        )
    }
}