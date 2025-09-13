//ws -> client
type incommingMessage = {
    type: "create" | "join",
    roomId: string,
    user: {
        name: string,
        image?:string,
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
    user: {
        userId:string
    }
} | {
    type: "message",
    roomId: string,
    payload: {
        message:string
    }
}

export type { incommingMessage, outgoingMessage }