
const BACKEND_URL = "https://beautybronze-backend.onrender.com";
/* ---------------- CONTACT FORM ---------------- */
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields.");
        return;
    }

    alert(`Thank you ${name}, we will contact you soon!`);
    this.reset();
});

/* ---------------- ORDER FORM ---------------- */
function openOrderForm(productName) {
    document.getElementById("orderForm").style.display = "block";
    document.getElementById("orderProduct").value = productName;
}

async function submitOrder() {
    const order = {
        name: document.getElementById("orderName").value,
        phone: document.getElementById("orderPhone").value,
        address: document.getElementById("orderAddress").value,
        product: document.getElementById("orderProduct").value,
        time: new Date().toISOString()
    };

    if (!order.name || !order.phone || !order.address) {
        alert("Please fill all fields.");
        return;
    }

    try {
        await fetch(`${BACKEND_URL}/api/order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });

        alert("✅ Order placed successfully!");
        document.getElementById("orderForm").style.display = "none";
    } catch (error) {
        alert("❌ Failed to place order.");
    }
}

/* ---------------- CHAT WINDOW ---------------- */
function toggleChat() {
    const chat = document.getElementById("chatWindow");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
}

/* ---------------- AI BOT REPLY ---------------- */
function aiReply(message) {
    const msg = message.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello")) {
        return "👋 Hello! Welcome to Beauty Bronze Professional.";
    }

    if (msg.includes("price")) {
        return "💰 Please tell the product name for exact pricing.";
    }

    if (msg.includes("delivery")) {
        return "🚚 We deliver across India.";
    }

    if (msg.includes("contact") || msg.includes("phone")) {
        return "📞 Call us at +91 8264603938";
    }

    if (msg.includes("discount") || msg.includes("offer")) {
        return "🎉 Follow us on Instagram for 15% OFF!";
    }

    return "🙂 I can help with pricing, delivery, offers and orders.";
}

/* ---------------- SEND MESSAGE ---------------- */
async function sendMessage() {
    const userName = document.getElementById("chatName").value.trim();
    const userMsg = document.getElementById("chatMessage").value.trim();
    const chatBox = document.getElementById("chatMessages");

    if (!userName || !userMsg) {
        alert("Please fill all fields.");
        return;
    }

    chatBox.innerHTML += `<div class="user"><b>You:</b> ${userMsg}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        await fetch(`${BACKEND_URL}/api/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: userName,
                message: userMsg,
                time: new Date().toISOString()
            })
        });
    } catch (error) {
        console.log(error);
    }

    const botReply = aiReply(userMsg);

    setTimeout(() => {
        chatBox.innerHTML += `<div class="bot"><b>Bot:</b> ${botReply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    document.getElementById("chatMessage").value = "";
}

/* ---------------- CLOSE POPUP ---------------- */
window.addEventListener("click", function (e) {
    const orderForm = document.getElementById("orderForm");

    if (e.target === orderForm) {
        orderForm.style.display = "none";
    }
});
