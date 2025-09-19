import { ReactNode } from "react";
import { WebSocketProvider } from "../../contexts/socket";
import { WorkspaceContextProvider } from "../../contexts/storeContexts";

export default function WorkspaceLayout({
    children
}: Readonly<{ children: ReactNode }>) {
    return (
        <WorkspaceContextProvider>
            <WebSocketProvider>{children}</WebSocketProvider>
        </WorkspaceContextProvider>
    )    
}