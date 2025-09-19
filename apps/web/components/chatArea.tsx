import { useWorkspaceContext } from "../hooks/storeHooks"

const ChatArea = () => {
    const messages = useWorkspaceContext((state) => state.messages)
    return (
        <div>
            {JSON.stringify(messages)}
        </div>
    )
}
 
export default ChatArea