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

const createChat = async (roomId: string, userId: string, message: string) => {
    try {
        await prisma.chat.create({
            data: {
                roomId: roomId,
                userId: userId,
                message: message
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error occured: ${error.message}`)
        }
    }
}

export {getUser, createChat}