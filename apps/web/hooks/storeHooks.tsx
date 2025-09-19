"use client"
import { useStore } from "zustand";
import { type workspaceStore } from "../store/workspaceStore";
import { useContext } from "react";
import { WorkspaceContext } from "../contexts/storeContexts";

export const useWorkspaceContext = <T,>(selector:(store:workspaceStore) => T):T => {
    const workspaceStoreContext = useContext(WorkspaceContext)
    if (!workspaceStoreContext) {
        throw new Error("useWorkspaceContext mush be used within workspaceContext")
    }
    return useStore(workspaceStoreContext, selector)
}