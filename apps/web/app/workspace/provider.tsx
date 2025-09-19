"use client"

import { ReactNode ,useRef, useContext, createContext} from "react"
import { WorkspaceContextProvider } from "../../contexts/storeContexts"

type props = {
    children:ReactNode
}
export default function Provider({children}:props) {
    <WorkspaceContextProvider>
        {children}
    </WorkspaceContextProvider>
}


