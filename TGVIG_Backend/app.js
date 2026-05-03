const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const deviceRoutes = require("./routes/deviceRoutes");


const app = express();



const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5200",
  "https://thegroovevig.xyz",
  "https://www.thegroovevig.xyz"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Blocked by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

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
app.use("/api/table-bookings", require("./routes/tableBookingRoutes"));
app.use("/api/events", require("./routes/eventTicketRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/devices", deviceRoutes);
app.use("/api/webcontent", require("./routes/webContentRoutes"));

app.use("/uploads", express.static("uploads"));

module.exports = app;