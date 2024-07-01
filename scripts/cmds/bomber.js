const axios = require('axios');

module.exports = {
  config: {
    name: "bomber",
    aliases: ["bombing"],
    version: "1.0",
    author: "RUBISH",
    countDown: 5,
    role: 0,
    shortDescription: "sms Bomber",
    longDescription: "Sms bomber goatbot api",
    category: "🔥 | Premium", 
    guide : {
    en: "{pn} <number> - <Limit>"
    }
    
  },

  onStart: async function ({ message, args }) {
    const [number, count] = args.join(" ").split("-").map(arg => arg.trim());
    if (!number || !count) {
      return message.reply(`
⚠️ | 𝗽𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝗮 𝗻𝘂𝗺𝗯𝗲𝗿 𝗮𝗻𝗱 𝗰𝗼𝘂𝗻𝘁

𝗘𝘅𝗮𝗺𝗽𝗹𝗲➝ .𝗯𝗼𝗺𝗯 𝟬𝟭𝟴𝟭𝟵𝟭𝟵𝟭𝟵𝟴𝟬 - 𝟭`);
    } else {
      try {
        const url = `https://sms-bomb-rubish-api.onrender.com/bomb-sms?number=${number}&count=${count}&apikey=rubish69`;

        const processingMessage = await message.reply(`⏳ | SMS BOMBING STARTING\n\nTARGET-: ${number}\n\nCOUNT-: ${count} `);

        const response = await axios.get(url);

        if (response.status === 200) {
          processingMessage.delete(); 
          console.log("✅ | SMS Bombing successful."); 
        } else {
          processingMessage.delete(); 
          console.error("❌ | An error occurred while sending the SMS."); 
        }
      } catch (error) {
        console.error(error);
        console.error("❌ | An error occurred while sending the SMS.");
      }
    }
  }
};
