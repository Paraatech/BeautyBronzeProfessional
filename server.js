const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();
app.use(express.json());

// FIX CORS (VERY IMPORTANT)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// -------------------------
// SAVE CHAT MESSAGE
// -------------------------
app.post("/api/message", async (req, res) => {
  const data = req.body;

  await fs.ensureFile("messages.json");
  const oldData = await fs.readJson("messages.json").catch(() => []);

  oldData.push(data);

  await fs.writeJson("messages.json", oldData, { spaces: 2 });

  res.json({ status: "saved" });
});

// -------------------------
// SAVE ORDER
// -------------------------
app.post("/api/order", async (req, res) => {
  const data = req.body;

  await fs.ensureFile("orders.json");
  const oldData = await fs.readJson("orders.json").catch(() => []);

  oldData.push(data);

  await fs.writeJson("orders.json", oldData, { spaces: 2 });

  res.json({ status: "order_saved" });
});

// -------------------------
app.get("/", (req, res) => {
  res.send("Beauty Bronze Backend Running ✔");
});

const PORT = 5000;
app.listen(PORT, () => console.log("Backend running on port " + PORT));