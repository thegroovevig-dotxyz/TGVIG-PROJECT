const mongoose = require("mongoose");
const app = require("./app");


mongoose.connect("mongodb://127.0.0.1:27017/tgvig");


app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});