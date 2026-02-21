/* ------------------------------------------
   CONTACT FORM (ORIGINAL)
----------------------------------------------*/
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    alert(`Thanks for contacting us, ${name}! We'll get back to you soon.`);
    this.reset();
  } else {
    alert('Please fill in all fields.');
  }
});


/* ------------------------------------------
   BACKEND URL
----------------------------------------------*/
const BACKEND_URL = "https://beautybronzeprofessional.onrender.com";


/* ------------------------------------------
   OPEN ORDER FORM
----------------------------------------------*/
function openOrderForm(productName) {
  document.getElementById("orderForm").style.display = "block";
  document.getElementById("orderProduct").value = productName;
}


/* ------------------------------------------
   SUBMIT ORDER → SEND TO BACKEND
----------------------------------------------*/
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

  await fetch(`${BACKEND_URL}/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });

  alert("Order Placed Successfully!");
  document.getElementById("orderForm").style.display = "none";
}


/* ------------------------------------------
   TOGGLE CHAT WINDOW
----------------------------------------------*/
function toggleChat() {
  const chat = document.getElementById("chatWindow");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}



/* ------------------------------------------
   AI CHATBOT LOGIC (FREE, NO API)
----------------------------------------------*/
function aiReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("address") || msg.includes("location") || msg.includes("where")) {
    return "📍 Our Shop Address: Beauty Bronze Salon, Near Karimpur Bus Stand, Punjab.";
  }

  if (msg.includes("number") || msg.includes("contact") || msg.includes("phone")) {
    return "📞 Owner Contact: +91 8264603938";
  }

  if (msg.includes("available") || msg.includes("stock")) {
    return "✔ Yes! The product is available.";
  }

  if (msg.includes("price")) {
    return "💰 Please tell me which product price you want.";
  }

  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    return "👋 Hello! How can I assist you today?";
  }

  if (msg.includes("deliver") || msg.includes("shipping")) {
    return "🚚 Yes, we deliver across Punjab!";
  }

  if (msg.includes("thank")) {
    return "🥰 You're welcome!";
  }

  return "🙂 I can help with shop address, contact number, pricing, availability or product details.";
}



/* ------------------------------------------
   SEND CHAT MESSAGE → BACKEND + AI REPLY
----------------------------------------------*/
async function sendMessage() {
  const userMsg = document.getElementById("chatMessage").value.trim();
  const userName = document.getElementById("chatName").value.trim();
  const chatBox = document.getElementById("chatMessages");

  if (!userName || !userMsg) {
    alert("Please fill chat fields.");
    return;
  }

  // Show user message
  chatBox.innerHTML += `<div class="user"><b>You:</b> ${userMsg}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  // Save chat in backend
  await fetch(`${BACKEND_URL}/api/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: userName,
      message: userMsg,
      time: new Date().toISOString()
    })
  });

  // AI Reply
  const botReply = aiReply(userMsg);

  // Show Bot Reply
  setTimeout(() => {
    chatBox.innerHTML += `<div class="bot"><b>Bot:</b> ${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 300);

  document.getElementById("chatMessage").value = "";
}



/* ------------------------------------------
   CLOSE ORDER POPUP BY CLICKING OUTSIDE
----------------------------------------------*/
window.addEventListener("click", function (event) {
  const form = document.getElementById("orderForm");
  if (event.target === form) {
    form.style.display = "none";
  }
});
