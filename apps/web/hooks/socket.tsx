"use client"
import { useState, useEffect } from "react"

const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const wss = new WebSocket("ws://localhost:8080")
        wss.onopen = () => {
            console.log("ws connected from client side")
        }
        wss.onmessage = (msg) => {
            const data = JSON.parse(msg.data)
            if (data.status === 200) {
                console.log("user authenticated")
                setLoading(false)
                setSocket(wss)
            }
        }
        () => wss.close()
    }, [])
    return {socket, loading}
}

export default useSocket;