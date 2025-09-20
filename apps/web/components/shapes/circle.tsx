import {Circle} from "react-konva"
import type { shape } from "../canvas"
export default function MyCircle({ shape }: { shape: shape }) {
    if (shape.type === "circle") {
        return (
            <Circle
                key={shape.id}
                x={shape.x}
                y={shape.y}
                radius={shape.radius}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
            />)
    }
}