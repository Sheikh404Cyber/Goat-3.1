module.exports = {
  config: {
    name: "Leave",
    aliases: ['out', 'exit'],
    version: "1.0",
    author: "Samir Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Left Out Bot From Current Group"
    },
    longDescription: {
      vi: "",
      en: " "
    },
    category: "👑 | Robot-Owner",
    guide: {
      vi: "",
      en: "{pn} or {pn} <reason>"
    }
  },
  onStart: async function ({ api, args, event }) {
    const GODPermission = global.GoatBot.config.GOD;
const adminBotPermission = global.GoatBot.config.adminBot;

const permissionMessage = "You don't have enough permission to use this cmd. Only my Author and Admin Bot can use this.";

if (!checkPermissionAndSendMessage(GODPermission, permissionMessage)) {
  return;
}

if (!checkPermissionAndSendMessage(adminBotPermission, permissionMessage)) {
  return;
}
    const groupId = args[0];
    if (isNaN(groupId)) {
      api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
      return;
    }
    const messageToSend = args.slice(1).join(" ");
    api.sendMessage(messageToSend, groupId);
    api.removeUserFromGroup(api.getCurrentUserID(), groupId);
  }
};
