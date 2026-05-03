const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Member = require("./models/Member"); // adjust path if needed

// 🔗 connect DB
mongoose.connect("mongodb://127.0.0.1:27017/tgvig")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

async function seed() {
  try {
    // 🧹 clear old users
    await Member.deleteMany();

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash("123456", 10);

    // 👤 create users
    await Member.create([
      {
        firstName: "Admin",
        email: "admin@tgvig.com",
        password: hashedPassword,
        role: "ADMIN"
      },
      {
        firstName: "STAFF",
        email: "pos@tgvig.com",
        password: hashedPassword,
        role: "STAFF"
      }
    ]);

    console.log("✅ Admin + POS seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();