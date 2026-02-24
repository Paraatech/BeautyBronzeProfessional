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

  // Greetings
  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    return "👋 Hello! Welcome to Beauty Bronze. How can I help you today?";
  }

  // Shop Address
  if (msg.includes("address") || msg.includes("location") || msg.includes("where")) {
    return "📍 Our Shop Address:\nShop No. 2, Mahadev Enterprises, Near Goyal Properties, Ludhiana, Punjab.";
  }

  // Contact
  if (msg.includes("number") || msg.includes("contact") || msg.includes("phone")) {
    return "📞 Owner Contact: +91 8264603938\nFeel free to call anytime between 10 AM – 7 PM.";
  }

  // Availability
  if (msg.includes("available") || msg.includes("stock") || msg.includes("have")) {
    return "✔ Yes! The product is currently in stock. Would you like to place an order?";
  }

  // Price related
  if (msg.includes("price") || msg.includes("cost") || msg.includes("rate")) {
    return "💰 Sure! Please tell me the product name so I can share the exact price.";
  }

  // Delivery & Shipping
  if (msg.includes("deliver") || msg.includes("shipping") || msg.includes("courier")) {
    return "🚚 Yes! We deliver across Punjab, Haryana, Uttar Pradesh and many more states. Fast shipping available!";
  }

  // Payment Methods
  if (msg.includes("payment") || msg.includes("pay") || msg.includes("upi") || msg.includes("cod")) {
    return "💳 We accept UPI, Bank Transfer & Cash on Delivery (COD) for selected locations.For order pls reach our shop or call us on 8264603938\nFeel free to call anytime between 10 AM – 7 PM ";
  }

  // Return / Refund
  if (msg.includes("return") || msg.includes("refund") || msg.includes("replace")) {
    return "🔄 We offer easy replacement if the product is damaged or incorrect. Just share an unboxing video.";
  }

  // Offers / Discounts
  if (msg.includes("offer") || msg.includes("discount") || msg.includes("sale")) {
    return "🎉 Yes! We have special offers for get that discout just follow us on instagram and get flat 15% discount on MRP";
  }

  // Thank You
  if (msg.includes("thank") || msg.includes("thanks")) {
    return "🥰 You're most welcome! Let me know if you need anything else.";
  }

  // Default Message (improved)
  return "🙂 I'm here to help you with product prices, availability, offers, delivery, payment options or any shop details. Just type your question!";
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
