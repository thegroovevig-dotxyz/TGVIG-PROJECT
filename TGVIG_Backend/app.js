
const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const deviceRoutes = require("./routes/deviceRoutes");
const webContentRoutes = require("./routes/webContentRoutes");
const tableBookingRoutes = require("./routes/tableBookingRoutes");


console.log("🔥 SERVER FILE LOADED");

const app = express();

console.log("🔥 SERVER STARTING...");

console.log("🔥 THIS IS THE ACTIVE ENTRY FILE");

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5200",
        "https://tgvig-pos.onrender.com",
        "https://thegroovevig.xyz",
        "https://www.thegroovevig.xyz"
      ];

      if (!origin) return callback(null, true);

      if (allowed.includes(origin) || origin.endsWith("thegroovevig.xyz")) {
        return callback(null, true);
      }

      console.log("❌ BLOCKED BY CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

app.use("/api/webcontent", (req, res, next) => {
  console.log("WEB CONTENT HIT");
  next();
});

app.use(express.json());

// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/clubs", require("./routes/clubRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/promotions", require("./routes/promotionRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/events", require("./routes/eventTicketRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/devices", deviceRoutes);
app.use("/api/table-bookings", tableBookingRoutes);

app.use("/api/webcontent", webContentRoutes);

app.use("/uploads", express.static("uploads"));

module.exports = app;