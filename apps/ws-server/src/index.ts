import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    ws.on("error", console.error)
    
    ws.on("message", (data) => {
        console.log(`recieved data ${data}`)
        ws.send(`recieved data ${data}`)
    })

    ws.send(JSON.stringify({message:"ws connected", status:200}))

    ws.on("close", () => {
        console.log("closing connection")
    })
})