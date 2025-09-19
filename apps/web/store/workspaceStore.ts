import { activeUsersType } from "@repo/common/types";
import { createStore } from "zustand/vanilla";
import { type msg } from "../types/common";

export type workspaceStates = {
    activeUsers: activeUsersType[],
    messages:msg[]
}

export type workspaceActions = {
    updateActiveUsers: (newUsers:activeUsersType[]) => void,
    updateMessage : (newMsgs:msg[]) => void
}

export type workspaceStore = workspaceStates & workspaceActions
const defaultState: workspaceStates = { activeUsers: [], messages: [] }

export const createWorkspaceStore = (initState:workspaceStates = defaultState) => {
    return createStore<workspaceStore>()((set) => ({
        ...initState,
        updateActiveUsers: (newUsers: activeUsersType[]) => set((state) => ({activeUsers:[...state.activeUsers, ...newUsers]})),
        updateMessage: (newmsgs: msg[]) => set((state) => ({messages:[...state.messages, ...newmsgs]}))
    }))
}


export type workspaceStoreApi = ReturnType<typeof createWorkspaceStore>