const axios = require('axios');

module.exports = {
  config: {
    name: "imgur",
    version: "1.0",
    author: "Evan Vau",
    countDown: 5,
    role: 0,
    longDescription: "Imgur link",
    category: "👥 | Member",
    guide: {
      en: "{n} reply to image"
    }
  },

  onStart: async function(){},
  onChat: async function({ message, event, args, commandName, api, usersData}) {
       
    const input = event.body;
          if(input && input.trim().toLowerCase().startsWith('imgurl') || input && input.trim().toLowerCase().startsWith('imgur')){
           const data = input.split(" ");
           data.shift();
    const link = event.messageReply?.attachments[0]?.url || data.join(" ");
    try {
        const response = await axios.get(`https://noobs-api.onrender.com/dipto/imgur?url=${encodeURIComponent(link)}`);
      const imgurLink = response.data.data;
      return message.reply(imgurLink);
    } catch (error) {
      console.error(error);
      return message.reply(error);
    }
  }
  }
};
