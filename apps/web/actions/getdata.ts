import { type msg } from "../types/common"
export async function getMessages(roomId: string) {

    const url = process.env.NODE_ENV === 'production'? `/api/${roomId}/messages` : `http://localhost:3000/api/${roomId}/messages`
    const response = await fetch(url)
    const response_data = await response.json()
    if (response_data && response_data.status === 200) {
        const msgs: msg[] = response_data.payload
        return msgs
    }
    throw new Error("Error occured while fetching the messages")
    
}