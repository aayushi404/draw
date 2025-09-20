"use client"
import Canvas from "./canvas";

export default function DrawArea({roomId}:{roomId:string}) {
    return (
        <Canvas roomId={ roomId} />
    )
}