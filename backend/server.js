const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const cors=require("cors");
const app=express();
const server=http.createServer(app);
app.use(cors());
app.use(express.json());
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT=3000;
server.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})
const messages=[];
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.emit("chatHistory", messages);
    socket.on("sendMessage", (data)=>{
        const newMessage={
            username:data.username,
            message:data.message,
            time:new Date().toLocaleTimeString()
        };
        messages.push(newMessage);
        console.log("Message stored:", newMessage);
        io.emit("receiveMessage", newMessage);
    })
});
