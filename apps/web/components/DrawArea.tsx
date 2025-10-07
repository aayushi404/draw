"use client"
import Canvas from "./canvas";
import { useWorkspaceContext } from "../hooks/storeHooks";
import useSocket from "../hooks/socket";

export default function DrawArea({roomId}:{roomId:string}) {
    const { messages, updateMessage } = useWorkspaceContext((state) => state)
    const socket = useSocket()
    return (
        <Canvas roomId={ roomId} messages={messages} updateMessage={updateMessage} socket={socket.socket}/>
    )
}