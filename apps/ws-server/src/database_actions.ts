import prisma from "@repo/db/client"

const getUser = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            throw new Error("user not exist")
        }
        return {name:user.name, image:user.image}
    } catch(e) {
        return {message:"server error"}
    }
}

export {getUser}