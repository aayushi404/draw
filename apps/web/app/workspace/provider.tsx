
import { ReactNode} from "react"
import { WorkspaceContextProvider } from "../../contexts/storeContexts"

type props = {
    children:ReactNode
}
export default function Provider({children}:props) {
    return(
        <WorkspaceContextProvider>
            {children}
        </WorkspaceContextProvider>
    )
}


