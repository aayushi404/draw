"use client"
import { createContext, ReactNode, useRef } from "react"
import { type workspaceStoreApi, createWorkspaceStore } from "../store/workspaceStore"

export const WorkspaceContext = createContext<workspaceStoreApi | undefined>(undefined)

type props = {
    children:ReactNode
}

export const WorkspaceContextProvider = ({ children }: props) => {
    const storeRef = useRef<workspaceStoreApi | null>(null)
    if (storeRef.current === null) {
        storeRef.current = createWorkspaceStore()
    }
    return (
        <WorkspaceContext.Provider value={storeRef.current}>
            {children}
        </WorkspaceContext.Provider>
    )
}

