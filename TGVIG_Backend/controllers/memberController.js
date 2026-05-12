const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Member = require("../models/Member");
const QRCode = require("qrcode");
const { sendNotification } = require("../services/notificationService");

// CREATE member
exports.createMember = async (req, res) => {
  const member = await Member.create(req.body);
  res.json(member);
};

// GET all members (admin)
exports.getMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};

// GET one member
exports.getMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.json(member);
};

// UPDATE member
exports.updateMember = async (req, res) => {
  const member = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(member);
};

//
// 🧾 CREATE MEMBER (WEB / APP / POS REGISTRATION)
//
exports.createMember = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      idNumber,
      nationality,
      address,
    } = req.body;

    // check duplicate email
    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    

    // generate unique values
    const membershipNo = "TGVIG" + Date.now();
    const qrCode = await QRCode.toDataURL(membershipNo);
    const rawPin = Math.floor(1000 + Math.random() * 9000);
const hashedPin = await bcrypt.hash(rawPin.toString(), 10);
    const referralNumber = "REF" + Math.floor(100000 + Math.random() * 900000);

    const member = new Member({
      firstName,
      lastName,
      email,
      phone,
      idNumber,
      nationality,
      address,

      password: await bcrypt.hash(password, 10),

      membershipNo,
      pin: hashedPin,
      data: {
  pin: rawPin
},
      referralNumber,

      role: "MEMBER",
      walletBalance: 0,
      pointsBalance: 0,
      status: "ACTIVE",
       qrCode,
       clubId,
deviceId,
role,
position
    });

    await member.save();

    return res.status(201).json({
      message: `Welcome ${firstName}, your account has been created successfully 🎉`,
      data: {
        membershipNo,
        pin: rawPin,
        referralNumber,
         qrCode
      }
    });

    await sendNotification(`Welcome ${firstName}, your account has been created successfully 🎉`, {
   membershipNo,
  pin: rawPin,
  referralNumber,
         qrCode
});

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};


//
// 📋 GET ALL MEMBERS
//
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//
// 👤 GET SINGLE MEMBER
//
exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//
// ✏️ UPDATE MEMBER
//
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // 🔁 cycle statuses
    if (member.status === "ACTIVE") {
      member.status = "SUSPENDED";
    } else if (member.status === "SUSPENDED") {
      member.status = "BLOCKED";
    } else {
      member.status = "ACTIVE";
    }

    await member.save();

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//
// 🔐 LOGIN (WEB / APP / POS / ADMIN)
//
exports.login = async (req, res) => {
  try {
    const { email, membershipNo, password } = req.body;

    
    if (membershipNo) {
      user = await Member.findOne({ membershipNo });
    }

if (email) {
      user = await Member.findOne({ email });
    }


    console.log("USER FOUND:", user);

    if (!user) {
      console.trace("USER NOT FOUND");
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  console.trace("WRONG PASSWORD");
  return res.status(401).json({ message: "Wrong password" });
}

    if (user.status && user.status !== "ACTIVE") {
      console.trace("INACTIVE ACCOUNT");
      return res.status(401).json({ message: "Account inactive" });
    }

    // 3. CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    // 4. RESPONSE
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.firstName,
        role: user.role,
        membershipNo: user.membershipNo,
        walletBalance: user.walletBalance,
        pointsBalance: user.pointsBalance
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateCard = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Card payload (what POS/admin will use)
    const card = {
      membershipNo: member.membershipNo,
      fullName: `${member.firstName} ${member.lastName}`,
      email: member.email,
      walletBalance: member.walletBalance,
      pointsBalance: member.pointsBalance,
      tier: member.tier,
      qrCode: member.qrCode,
      status: member.status,
    };

    return res.json({
      message: "Card generated successfully",
      card,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};