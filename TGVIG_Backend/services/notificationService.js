const Settings = require("../models/Settings");
const { parseTemplate } = require("../utils/parseTemplate");

// 🔥 FAKE SENDERS (replace later)
const sendSMS = async (phone, message) => {
  console.log("SMS TO:", phone, message);
};

const sendEmail = async (email, subject, message) => {
  console.log("EMAIL TO:", email, subject, message);
};

// 🔥 MAIN FUNCTION
exports.sendNotification = async (type, user, extra = {}) => {
  const settings = await Settings.findOne();

  if (!settings || !settings.notifications[type]) return;

  const template = settings.notifications[type];

  const data = {
    name: user.firstName,
    membershipNo: user.membershipNo,
    ...extra,
  };

  const message = parseTemplate(template.message, data);

  // SEND BOTH
  if (user.phone) await sendSMS(user.phone, message);
  if (user.email) await sendEmail(user.email, template.subject, message);
};