const socket = io("http://localhost:3000");
const user = document.querySelector(".user");
const message = document.querySelector(".message");
const button = document.querySelector(".button");
const box = document.querySelector(".box");
const chat = () => {
    if (user.value === "") {
        alert("User name is req");
        return;
    }
    if (message.value === "") {
        alert("Message cannot be empty");
        return;
    }
    socket.emit("sendMessage", {
        username: user.value,
        message: message.value
    })
    message.value = "";
};
socket.on("receiveMessage", (data) => {
    box.style.display = "block";
    const messagediv = document.createElement("div");
    const name = document.createElement("strong");
    name.innerText = data.username + ":";
    const msg = document.createElement("span");
    msg.innerText = data.message;
    messagediv.appendChild(name);
    messagediv.appendChild(msg);
    box.appendChild(messagediv);
});
socket.on("chatHistory", (allmessages) => {
    box.innerHTML = "";
    box.style.display = "block";
    allmessages.forEach((data) => {
        const messagediv = document.createElement("div");
        const name = document.createElement("strong");
        name.innerText = data.username + ":";
        const msg = document.createElement("span");
        msg.innerText = data.message;
        messagediv.appendChild(name);
        messagediv.appendChild(msg);
        box.appendChild(messagediv);
    });
})
button.addEventListener("click", chat);