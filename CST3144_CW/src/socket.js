import {io} from "socket.io-client"

const URL = "https://cst3144-cw-express.onrender.com"

export const socket = io(URL, {
    reconnection: true,
    reconnectionAttempts: 10,
    transports: ['websocket']
})

socket.on("connect", ()=>{

})

socket.on("disconnect", ()=>{

})
