const axios = require('axios');
const fs = require('fs');
const rubishapi = global.GoatBot.config.rubishapi;

module.exports = {
  config: {
    name: "autodl",
    version: "1.0.0",
    author: "RUBISH",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Automatically download videos from various platforms.",
      vn: "Tự động tải video từ các nền tảng khác nhau."
    },
    longDescription: {
      vn: "Tự động tải video từ TikTok, Facebook, Instagram, YouTube và nhiều nền tảng khác",
      en: "Auto download video from TikTok, Facebook, Instagram, YouTube, and more"
    },
    category: "MEDIA",
    guide: {
      en: "Just send your link",
      vn: "Chỉ cần gửi liên kết của bạn"
    }
  },

  onChat: async function ({ api, event }) {
    try {
      const url = event.body ? event.body : '';

      if (isSupportedLink(url)) {
        api.setMessageReaction("⬇", event.messageID, (err) => {}, true);

        const { path, platform, error, result } = await downloadMedia(url);

        if (error) {
          api.sendMessage(`⚠ | ${error}`, event.threadID, event.messageID);
          return;
        }

        if (platform === 'Pinterest') {
          api.sendMessage(
            {
              body: `
✅ | Successfully Downloaded

Platform ➾${platform}`,
              attachment: (await axios({ url: result, responseType: 'stream' })).data
            },
            event.threadID,
            event.messageID
          );
        } else {
          api.sendMessage(
            {
              body: `
✅ | Successfully Downloaded

Platform ➾${platform}`,
              attachment: fs.createReadStream(path)
            },
            event.threadID,
            () => fs.unlinkSync(path),
            event.messageID
          );
        }
      }
    } catch (error) {
      api.sendMessage("⚠ | Error, Please try again later.", event.threadID, event.messageID);
      console.error(error);
    }
  },

  onStart: function () {}
};

function isSupportedLink(url) {
  return url.startsWith('https://vt.tiktok.com') ||
    url.startsWith('https://www.facebook.com') ||
    url.startsWith('https://www.instagram.com/') ||
    url.startsWith('https://youtu.be/') ||
    url.startsWith('https://youtube.com/') ||
    url.startsWith('https://x.com/') ||
    url.startsWith('https://twitter.com/') ||
    url.startsWith('https://vm.tiktok.com') ||
    url.startsWith('https://fb.watch') ||
    url.startsWith('https://pin.it') ||
    url.startsWith('https://pinterest.com');
}

async function downloadMedia(url) {
  const path = __dirname + `/cache/auto.mp4`;

  const response = await axios.get(`${rubishapi}/mediadl?url=${encodeURIComponent(url)}&apikey=rubish69`);
  const { platform, result, error } = response.data;

  if (error) {
    return { error };
  }

  if (platform === 'Pinterest') {
    return { platform, result };
  } else {
    const vid = (await axios.get(result, { responseType: "arraybuffer" })).data;
    await fs.writeFileSync(path, Buffer.from(vid));
    return { path, platform };
  }
}
