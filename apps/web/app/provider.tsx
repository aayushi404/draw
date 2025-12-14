"use client"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { SessionProvider } from "next-auth/react"

type providerProps = {
    children:React.ReactNode
} 
export default function Provider({ children }: providerProps) {
    return (
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}