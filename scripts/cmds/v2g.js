const { get } = require('axios');

module.exports = {
  config: {
    name: 'video2gif',
    aliases: ['v2g', 'videotogif', 'v2gif', 'vtog'],
    version: "1.6.9",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    role: 0,
    countDown: 1,
    category: "🎬 | Media",
    longDescription: "Video to gif converter",
    guide: "{pn} [link] or [reply to a video]"
  },

  onStart: async function ({ message, event, args }) {

    try{
    const d = event.messageReply?.attachments[0]?.url || args.join(' ');

        if (!d) {
          return message.reply('❌| Please provide a link or reply to a video.', event.threadID);
        }

      const { data } = await get(`https://noobs-api.onrender.com/dipto/gif?url=${encodeURIComponent(d)}`);

  message.reply({ 
    body: `
✅ | GIF LINK: ${data.data}
🔰 | Author: ${data.author}`,
    attachment: await global.utils.getStreamFromURL(data.data)
  }, event.threadID);

  } catch (err){
    console.log(err);
   message.reply(err, event.threadID);
   }
  }
}
