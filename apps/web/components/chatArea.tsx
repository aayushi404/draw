const ChatArea = ({roomId}:{roomId:string}) => {
    const chats = getChats(roomId)
    return (
        <div>
            {JSON.stringify(chats)}
        </div>
    )
}
 
export default ChatArea