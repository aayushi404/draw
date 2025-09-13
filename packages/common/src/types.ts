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
    payload: {
        message:string
    }
} | {
    type:"error",
    error: {
        status:number,
        message: string
    }
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
}

export type { incommingMessage, outgoingMessage , activeUsersType}