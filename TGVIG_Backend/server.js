const mongoose = require("mongoose");
const app = require("./app");


mongoose.connect("mongodb://127.0.0.1:27017/tgvig");


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});