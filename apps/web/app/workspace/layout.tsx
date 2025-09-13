import { ReactNode } from "react";
import { WebSocketProvider } from "../../contexts/socket";

export default function WorkspaceLayout({
    children
}: Readonly<{ children: ReactNode }>) {
    return (
        <WebSocketProvider>{children}</WebSocketProvider>
    )    
}