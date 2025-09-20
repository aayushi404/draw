import {RegularPolygon} from "react-konva"
import type { shape } from "../canvas"
export default function MyPolygon({ shape }: { shape: shape }) {
    if (shape.type === "RegularPolygon") {
        return (
            <RegularPolygon
                key={shape.id}
                x={shape.x}
                y={shape.y}
                radius={shape.radius}
                sides={shape.sides!}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
            />)
    }
}