import prisma from "@repo/db/client";
import { NextResponse } from "next/server";
import { type msg } from "../../../../types/common";
export async function GET(
    {params}:{params:{roomId:string}}
) {
    const { roomId } = params
    try {
        const messages = await prisma.chat.findMany({
            where: {
                roomId: roomId
            },
            include: {
                user: true
            }
        })
        const response :msg[]= []
        messages.forEach((m) => {
            const msg = {
                message: m.message,
                createdAt: m.createdAt.toLocaleDateString("en-ZA"),
                userId: m.userId,
                userName: m.user.name,
                userImage:m.user.image
            }
            response.push(msg)
        })
        return NextResponse.json({payload:response, status:200})
    } catch (err){
        return NextResponse.json({message:"error occured while fetching messages",error:err, status:404})
    }
}