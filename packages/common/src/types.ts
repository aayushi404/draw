type activeUsersType = {
    name: string,
    image:string
}

//ws -> client
type incommingMessage = {
    type: "create" | "join",
    roomId: string,
    payload: {
        activeUsers: activeUsersType[],
        message?:string
    }
} | {
    type: "message",
    roomId: string,
    userId:string,
    payload: {
        message:string
    }
} | {
    type:"error",
    error: {
        status:number,
        message: string
    }
} | {
    type: "leave",
    name: string,
    roomId: string,
    userId:string
}

//client -> ws
type outgoingMessage = {
    type: "create" | "join",
    roomId:string
    userId:string
} | {
    type: "message",
    roomId: string,
    userId:string
    payload: {
        message:string
    }
} | {
    type: "leave",
    userId: string,
    roomId:string
}

export type { incommingMessage, outgoingMessage , activeUsersType}