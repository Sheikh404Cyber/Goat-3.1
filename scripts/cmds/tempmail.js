const axios = require('axios');
const TEMP_MAIL_URL = 'https://tempmail-rubish.onrender.com/api/gen?apikey=rubish69';

module.exports = {
  config: {
    name: "tempmail",
    aliases: ["temp","mail"],
    version: "2.0",
    author: "RUBISH",
    countDown: 5,
    role: 0,
    shortDescription: "Generate temporary email addresses",
    longDescription: "Generate temporary email addresses for temporary usage.",
    category: "🔥 | Premium",
    guide: {
      en: "{pn} [inbox <email>] - Generate a temporary email address or retrieve messages from the inbox.",
    },
   
  },

  onStart: async ({ api, event, args }) => {
    try {
      if (args[0] === 'inbox') {
        if (!args[1]) {
          return api.sendMessage("❌ Please provide an email address for the inbox. Example: .tempmail inbox example@wuuvo.com", event.threadID);
        }

        const emailAddress = args[1];
        const inboxResponse = await axios.get(`https://tempmail-rubish.onrender.com/api/getmessage?tmail=${emailAddress}&apikey=rubish69`);
        const inboxData = inboxResponse.data;

        if (inboxData.error) {
          return api.sendMessage(`❌ Error: ${inboxData.error}`, event.threadID);
        }

        const messages = inboxData.messages;

        let messageText = '📬 MAIL RECEIVED 📬\n\n';
        for (const message of messages) {
          messageText += `📩 Sender: ${message.sender}\n\n`;
          messageText += `👀 Subject: ${message.subject || '👉 NO SUBJECT'}\n\n`;
          messageText += `📩 Message: ${message.message.replace(/<style([\s\S]*?)<\/style>|<script([\s\S]*?)<\/script>|<\/div>|<div>|<[^>]*>/gi, '')}\n\n`;
        }

        api.sendMessage(messageText, event.threadID);
      } else {
        const tempMailResponse = await axios.get(TEMP_MAIL_URL);
        const tempMailData = tempMailResponse.data;

        if (tempMailData.error) {
          return api.sendMessage(`❌ Error: ${tempMailData.error}`, event.threadID);
        }

        if (!tempMailData.email) {
          return api.sendMessage(`❌ Error: ${tempMailData.error}`, event.threadID);
        }

        api.sendMessage(`
✅ | Successfully Generated Your Temporary Email

Tmail➟ ${tempMailData.email}

___thanks for using me___`, event.threadID);
      }
    } catch (error) {
      console.error('Error:', error);
      api.sendMessage("⭕ | Not found any mail please try again", event.threadID);
    }
  },
};
