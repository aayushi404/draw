import { outgoingMessage } from "@repo/common/types"
import prisma from "@repo/db/client"

const getUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user) {
        throw new Error("user not exist")
    }
    return {name:user.name, image:user.image}
}

type chatProp = {
    roomId: string,
    userId: string,
    message:string
}
const createChat = async ({roomId, userId, message}:chatProp) => {
    await prisma.chat.create({
        data: {
            roomId: roomId,
            userId: userId,
            message:message
        }
    })
}

export {getUser, createChat}