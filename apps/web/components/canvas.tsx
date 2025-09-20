"use client"
import { Stage, Layer, Circle, Rect, RegularPolygon } from "react-konva"
import { useRef, useEffect, useState } from "react"
import { KonvaEventObject } from "konva/lib/Node"
import MyCircle from "./shapes/circle"
import MyReactangle from "./shapes/rectangle"
import MyPolygon from "./shapes/polygon"
import { useWorkspaceContext } from "../hooks/storeHooks"
import useSocket from "../hooks/socket"
import { outgoingMessage } from "@repo/common/types"
import { useSession } from "next-auth/react"
import { msg } from "../types/common"

export type shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number,
    stroke: string,
    strokeWidth: number,
    id:string
} | {
    type: "circle" | "RegularPolygon",
    x: number,
    y: number,
    sides?: number,
    radius:number,
    stroke: string,
    strokeWidth:number,
    id:string
}
export default function Canvas({roomId}:{roomId:string}) {
    const {data:session} = useSession()
    const [isDrawing, setIsDrawing] = useState(false)
    const [startPos, setStartPos] = useState<{ x: number | undefined, y: number | undefined }>({ x: 0, y: 0 })
    const [currentShape, setCurrentShape] = useState<shape | null>(null)
    const [drawingShape, setDrawingShape] = useState("rect")
    const { messages, updateMessage } = useWorkspaceContext((state) => state)
    const { socket } = useSocket()
    console.log(messages)
    function handlemouseDown(e: KonvaEventObject<MouseEvent>) {
        setIsDrawing(!isDrawing)
        setStartPos(
            {
                x: e.target.getStage()?.getPointerPosition()?.x,
                y: e.target.getStage()?.getPointerPosition()?.y
            }
        )
        if (drawingShape === "rect") {
            setCurrentShape({
                type: "rect",
                x: e.target.getStage()?.getPointerPosition()?.x!,
                y: e.target.getStage()?.getPointerPosition()?.y!,
                width: 0,
                height: 0,
                stroke: "white",
                strokeWidth: 4,
                id: Date.now().toString(),
            })
        } else if (drawingShape === "circle") {
                setCurrentShape({
                    type: "circle",
                    x: e.target.getStage()?.getPointerPosition()?.x!,
                    y: e.target.getStage()?.getPointerPosition()?.y!,
                    radius: 0,
                    stroke: "white",
                    strokeWidth: 4,
                    id: Date.now().toString(),

                })
            } else if (drawingShape === "RegularPolygon") {
                setCurrentShape({
                    type: "RegularPolygon",
                    x: e.target.getStage()?.getPointerPosition()?.x!,
                    y: e.target.getStage()?.getPointerPosition()?.y!,
                    sides: 3,
                    radius: 0,
                    stroke: "white",
                    strokeWidth: 4,
                    id: Date.now().toString()
 
                })
            }
    }
        function handlemouseMove(e: KonvaEventObject<MouseEvent>) {
            if (!isDrawing) return
            let pos = e.target.getStage()?.getPointerPosition()!
            if (currentShape && currentShape.type === "rect") {
                setCurrentShape((prev) => {
                    return {
                        ...prev,
                        width: pos.x - currentShape.x,
                        height: pos.y - currentShape.y,
                        type: currentShape.type,
                        x: currentShape.x,
                        y: currentShape.y,
                        stroke: currentShape.stroke,
                        strokeWidth: currentShape.strokeWidth,
                        id: currentShape.id,
                    }
                }
                )
            } else if (currentShape && (currentShape.type === "circle" || currentShape.type === "RegularPolygon")) {
                let xLength = (pos.x - currentShape.x) * (pos.x - currentShape.x)
                let yLength = (pos.y - currentShape.y) * (pos.y - currentShape.y)

                setCurrentShape((prev) => {
                    return {
                        ...prev,
                        radius: Math.sqrt(xLength + yLength),
                        type: currentShape.type,
                        x: currentShape.x,
                        y: currentShape.y,
                        stroke: currentShape.stroke,
                        strokeWidth: currentShape.strokeWidth,
                        id: currentShape.id,
                    }
                }
                )
            
            }
        }
        function handlemouseUp() {
            setIsDrawing(false)
            if (currentShape) {
                if ((currentShape.type === "rect" && (currentShape.width !== 0 || currentShape.height !== 0)) || ((currentShape.type === "circle" || currentShape.type === "RegularPolygon") && (currentShape.radius !== 0))) {
                    const message = JSON.stringify(currentShape)
                    if (socket) {
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
                    const date = new Date()
                    const mymsg: msg[] = [
                        {
                            message: message,
                            createdAt: date.toLocaleDateString("en-AZ"),
                            userId: session?.user.id!,
                            userName: session?.user.name,
                            userImage: session?.user.image
                        }]
                    updateMessage(mymsg)
                }
            }
            setCurrentShape(null)
        }
        return (
            <>
                <div className="fixed">
                    <button onClick={() => setDrawingShape("circle")}>circle</button>
                    <button onClick={() => setDrawingShape("rect")}>rectangle</button>
                    <button onClick={() => setDrawingShape("RegularPolygon")}>triangle</button>
                </div>
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={handlemouseDown}
                    onMouseMove={handlemouseMove}
                    onMouseUp={handlemouseUp}
                >
                    <Layer>
                        {messages.map(message => {
                            let shape = JSON.parse(message.message)
                            if (shape.type === "rect") {
                                return (
                                    <MyReactangle shape={shape}/>
                                )
                            } else if (shape.type === "circle") {
                                return (
                                    <MyCircle shape={ shape} />
                                )
                            } else if (shape.type === "RegularPolygon") {
                                return (
                                    <MyPolygon shape={shape}/>
                                )
                            }
                        })}
                        {
                            currentShape && currentShape.type === "rect" ?
                                (<MyReactangle shape={currentShape}/>) : currentShape && currentShape.type === "circle" ? (
                                    <MyCircle shape={currentShape}/>
                                ) : currentShape ? (
                                    <MyPolygon shape={currentShape!}/>
                                ):null
                            
                        }
                    </Layer>
                </Stage>
            </>
        )
    
}