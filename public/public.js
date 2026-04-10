const socket = io();

const input = document.getElementById("input");
const usernameInput = document.getElementById("username");
const messages = document.getElementById("messages");

function sendMessage() {
    const message = input.value.trim();
    const username = usernameInput.value || "Anonymous";

    if (message !== "") {
        socket.emit("chat message", {
            user: username,
            text: message,
            time: new Date().toLocaleTimeString()
        });
        input.value = "";
    }
}

// Enter key to send
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

socket.on("chat message", function (data) {
    const li = document.createElement("li");

    const currentUser = usernameInput.value || "Anonymous";

    // Right side if own message
    if (data.user === currentUser) {
        li.classList.add("my-message");
    } else {
        li.classList.add("other-message");
    }

    li.innerHTML = `
        <strong>${data.user}</strong><br>
        ${data.text}
        <div class="time">${data.time}</div>
    `;

    messages.appendChild(li);

    // Auto scroll
    messages.scrollTop = messages.scrollHeight;
});
