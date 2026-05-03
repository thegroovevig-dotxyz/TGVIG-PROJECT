const Menu = require("../models/Menu");
const Club = require("../models/Club");
const Device = require("../models/Device");
const mongoose = require("mongoose");

// CREATE menu (admin)
exports.createMenu = async (req, res) => {
  try {
    const { clubId, name, type, price = {}, rewards = {}, image } = req.body;

    // ✅ validate FIRST
    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid clubId" });
    }

    const menu = new Menu({
      clubId,
      name,
      type,
      price: {
        single: price.single || 0,
        x4: price.x4 || 0,
        x6: price.x6 || 0,
      },
      rewards: {
        points: rewards.points || 0,
        itemReward: rewards.itemReward || "",
        discount: rewards.discount || 0,
      },
      image: image || "",
       webVisible: true,   
  isActive: true
    });

    await menu.save(); // ❗ YOU WERE ALSO MISSING THIS

    console.log("FILTER:", filter);
console.log("MENUS FOUND:", menus.length);

    await Club.findByIdAndUpdate(clubId, {
      $push: { menus: menu._id },
    });

    res.json(menu);

  } catch (err) {
     console.log("CREATE MENU ERROR:", err);
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET menus by club
exports.getMenus = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid clubId" });
    }

    const menus = await Menu.find({ clubId });

    return res.json(menus);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE menu
exports.updateMenu = async (req, res) => {
  const menu = await Menu.findByIdAndUpdate(
    req.params.id,
    req.body,
    {returnDocument: "after"}
  );
  res.json(menu);
};

// DELETE menu
exports.deleteMenu = async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: "Menu deleted" });
};

exports.getMenusByDevice = async (req, res) => {
  try {
    const { clubId, deviceId, type } = req.query;

    console.log("INPUT:", req.query);

    // 🌐 WEB MODE (NEVER BREAKS)
    if (type === "WEB") {
      const menus = await Menu.find({ webVisible: true });
      return res.json(menus);
    }

    // 🧾 POS / SELF POS MODE
    if (!clubId && !deviceId) {
      return res.status(400).json({
        message: "clubId or deviceId required"
      });
    }

    let finalClubId = clubId;

    // 🔥 if deviceId provided → resolve clubId
    if (deviceId) {
      const Device = require("../models/Device");
      const device = await Device.findById(deviceId);

      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }

      finalClubId = device.clubId;
    }

    const menus = await Menu.find({ clubId: finalClubId });

    return res.json(menus);

  } catch (err) {
    console.log("🔥 MENU ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};