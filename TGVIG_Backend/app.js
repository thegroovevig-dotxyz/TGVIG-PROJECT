
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
        "http://localhost:5176",
        "http://localhost:5200",
        "https://tgvig-project-minipos.onrender.com",
        "https://tgvig-project-self-pos.onrender.com",
        "https://tgvig-project-admin.onrender.com",
       "https://tgvig-project-pos.onrender.com",
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

app.use("/API/webcontent", (req, res, next) => {
  console.log("WEB CONTENT HIT");
  next();
});

app.use(express.json());

// ROUTES
app.use("/API/admin", adminRoutes);
app.use("/API/analytics", analyticsRoutes);
app.use("/API/members", require("./routes/memberRoutes"));
app.use("/API/clubs", require("./routes/clubRoutes"));
app.use("/API/menu", require("./routes/menuRoutes"));
app.use("/API/promotions", require("./routes/promotionRoutes"));
app.use("/API/transactions", require("./routes/transactionRoutes"));
app.use("/API/wallet", require("./routes/walletRoutes"));
app.use("/API/blogs", require("./routes/blogRoutes"));
app.use("/API/events", require("./routes/eventTicketRoutes"));
app.use("/API/settings", require("./routes/settingsRoutes"));
app.use("/API/coupons", require("./routes/couponRoutes"));
app.use("/API/devices", deviceRoutes);
app.use("/API/table-bookings", tableBookingRoutes);
app.use("/API/payments", require("./routes/paymentRoutes"));
app.use("/API/wallet", require("./routes/walletRoutes"));
app.use("/API/rides", require("./routes/rideRoutes"));
app.use("/API/drivers", require("./routes/driverRoutes"));
app.use("/API/bookings", require("./routes/bookingRoutes"));
app.use("/API/properties", require("./routes/propertyRoutes"));
app.use("/API/parking", require("./routes/parkingRoutes"));
app.use("/API/partners", require("./routes/partnerRoutes"))
app.use("/API/payouts", require("./routes/payoutRoutes"));
app.use("/API", require("./routes/validator.routes"));

app.use("/API/admin", require("./routes/adminRoutes"));

app.use("/API/webcontent", webContentRoutes);

app.use("/uploads", express.static("uploads"));

module.exports = app;