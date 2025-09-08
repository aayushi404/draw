"use client"
import { SessionProvider } from "next-auth/react"

type providerProps = {
    children:React.ReactNode
} 
export default function Provider({ children }: providerProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}