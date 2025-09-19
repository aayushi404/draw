import { type msg } from "../types/common"
export async function getMessages(roomId: string) {
    try {
        const response = await fetch(`http://localhost:300/api/${roomId}/messages`)
        const response_data = await response.json()
        if (response_data && response_data.status === 200) {
            const msgs: msg[] = response_data.payload
            return msgs
        }
        throw new Error("Error occured while gettinh the messages")
    } catch {
        return
    }
}