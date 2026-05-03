const EventTicket = require("../models/EventTicket");
const Member = require("../models/Member");
const Transaction = require("../models/Transaction");
const { sendNotification } = require("../services/notificationService");
const QRCode = require("qrcode");

exports.createTicket = async (req, res) => {
  const ticket = await EventTicket.create(req.body);
  res.json(ticket);
};

exports.buyTicket = async (req, res) => {
  try {
    const { memberId, ticketId, paymentType } = req.body;

    const member = await Member.findById(memberId);
    const ticket = await EventTicket.findById(ticketId);

    let total = 0;

    if (paymentType === "WALLET") {
      total = ticket.priceCash;

      if (member.walletBalance < total) {
        return res.status(400).json({ message: "Insufficient wallet" });
      }

      member.walletBalance -= total;
    }

    if (paymentType === "POINTS") {
      total = ticket.pricePoints;

      if (member.points < total) {
        return res.status(400).json({ message: "Insufficient points" });
      }

      member.points -= total;
    }

    await member.save();

    const tx = await Transaction.create({
      memberId,
      type: "TICKET",
      amount: total,
      status: "SUCCESS",
    });

    res.json({
      ticket,
      transaction: tx,
      coupon: `EVENT-${Date.now()}`,
    });

    const qr = await QRCode.toDataURL("COUPON-" + Date.now());

await sendNotification("ticket", member, {
  membershipNo,
  eventticket,
  ticket,
      transaction: tx,
      coupon: `EVENT-${Date.now()}`,
      qr,
      code: coupon.code,
  expiry: coupon.expiryDate,
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTickets = async (req, res) => {
  const data = await EventTicket.find().populate("clubId");
  res.json(data);
};