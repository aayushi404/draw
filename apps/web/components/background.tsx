import { useMounted } from "@/hooks/mounted"
import { cn } from "@/lib/utils"
import { MouseEvent, useRef } from "react"

export default function SpotlightEffect({children}:{children:React.ReactNode}){
    const mount = useMounted()
    const currentContainer = useRef<HTMLDivElement>(null)

    function mouseMoveEffect(e: MouseEvent<HTMLDivElement>){
        if (mount && window.innerWidth < 768) return
        if(currentContainer.current){
            const rect = currentContainer.current.getBoundingClientRect()

            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100

            currentContainer.current.style.setProperty("--x", `${x}%`)
            currentContainer.current.style.setProperty("--y", `${y}%`)
        }
    }

    return(
        <div 
        ref={currentContainer}
        onMouseMove={mouseMoveEffect}
        className="min-h-screen w-full bg-white relative grid-animated-container">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                backgroundImage: `
                    linear-gradient(90deg, rgba(16,185,129,0.25) 1px, transparent 0),
                    linear-gradient(180deg, rgba(16,185,129,0.25) 1px, transparent 0),
                    repeating-linear-gradient(45deg, rgba(16,185,129,0.2) 0 2px, transparent 2px 6px)
                `,
                backgroundSize: "24px 24px, 24px 24px, 24px 24px",
                WebkitMask: "radial-gradient(circle at var(--x) var(--y), black 0, transparent 45%)",
                mask: "radial-gradient(circle at var(--x) var(--y), black 0, transparent 45%)",
                animation: "spotlight 120s ease-in-out infinite",
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    )
}