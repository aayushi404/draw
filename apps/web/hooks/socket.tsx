"use client"
import { useState, useContext } from "react"
import { WebSocketContext } from "../contexts/socket"

const useSocket = () => {
    const context = useContext(WebSocketContext)

    if (!context) {
        throw Error("useSocket hook must be used inside websocketprovider")
    }
    return context
}

export default useSocket