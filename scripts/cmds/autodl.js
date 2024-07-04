const axios = require('axios');
const fs = require('fs');
const rubishapi = global.GoatBot.config.rubishapi;

const platformRegexMap = {
  facebook: /facebook\.com|fb\.watch|www\.facebook\.com/,
  twitter: /twitter\.com|x\.com/,
  tiktok: /tiktok\.com/,
  youtube: /youtube\.com|youtu\.be/,
  instagram: /instagram\.com/,
  pinterest: /pinterest\.com|pin\.it/
};

const platformNames = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  instagram: 'Instagram',
  pinterest: 'Pinterest'
};

const detectPlatform = (url) => {
  for (const [platform, regex] of Object.entries(platformRegexMap)) {
    if (url.match(regex)) {
      return platformNames[platform];
    }
  }
  return null;
};

async function downloadMedia(url) {
  const path = __dirname + `/cache/alldl.mp4`;
  let platform = '';

  if (url.match(/facebook\.com|fb\.watch|www\.facebook\.com/)) platform = 'Facebook';
  else if (url.match(/twitter\.com|x\.com/)) platform = 'Twitter';
  else if (url.includes('tiktok.com')) platform = 'TikTok';
  else if (url.match(/youtube\.com|youtu\.be/)) platform = 'YouTube';
  else if (url.includes('instagram.com')) platform = 'Instagram';
  else if (url.includes('pin.it')) platform = 'Pinterest';
  else return { error: 'Unsupported source' }; // Add support for Pinterest

  const BASE_URL = `${rubishapi}/mediadl?url=${encodeURIComponent(url)}&apikey=rubish69`;

  try {
    const aa = await axios.get(BASE_URL);
    const bb = aa.data;
    const vid = (await axios.get(bb.result, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
    return { path, platform };
  } catch (error) {
    console.error("Error downloading media:", error);
    return { error: 'Failed to download media: ' + (error.response?.data?.error || 'Unknown error') };
  }
}


module.exports = {
  config: {
    name: "alldl",
    aliases: ["media"],
    version: "2",
    author: "RUBISH",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Download content by link", vn: "Tải nội dung bằng liên kết" },
    longDescription: { en: "Download content", vn: "Tải nội dung" },
    category: "MEDIA",
    guide: { en: "{pn} link", vn: "{pn} liên kết" }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const link = args.join(" ");
      if (!link) return api.sendMessage("⚠ | Please provide the link.", event.threadID, event.messageID);

      api.sendMessage("Processing your request... Please wait.", event.threadID, event.messageID);
      const { path, platform, error } = await downloadMedia(link);

      if (error) {
        return api.sendMessage(`⚠ | ${error}`, event.threadID, event.messageID);
      }

      api.sendMessage(
        { body: `✅ | Successfully Downloaded from ${platform}`, attachment: fs.createReadStream(path) },
        event.threadID,
        () => fs.unlinkSync(path),
        event.messageID
      );
    } catch (error) {
      console.error(error);
      api.sendMessage("⚠ | Sorry, the content could not be downloaded.", event.threadID, event.messageID);
    }
  }
}; 
