"use client"
import Canvas from "./canvas";
import { useWorkspaceContext } from "../hooks/storeHooks";
import useSocket from "../hooks/socket";
import { useMounted } from "../hooks/mounted";

export default function DrawArea({roomId}:{roomId:string}) {
    const mount = useMounted()
    const { messages, updateMessage } = useWorkspaceContext((state) => state)
    const socket = useSocket()
    if(!mount) return null
    return (
        <Canvas roomId={ roomId} messages={messages} updateMessage={updateMessage} socket={socket.socket}/>
    )
}