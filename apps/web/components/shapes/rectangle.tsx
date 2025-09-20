import { Rect} from "react-konva"
import type { shape } from "../canvas"
export default function MyReactangle({ shape }: { shape: shape }) {
    if (shape.type === "rect") {
        return (
            <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
            />)
    }
}