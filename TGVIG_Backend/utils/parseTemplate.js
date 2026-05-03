exports.parseTemplate = (template, data) => {
  let msg = template;

  Object.keys(data).forEach((key) => {
    msg = msg.replaceAll(`{{${key}}}`, data[key]);
  });

  return msg;
};