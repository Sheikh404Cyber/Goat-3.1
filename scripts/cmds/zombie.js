const valentine = {
  name: "zombie",
  version: "1.0",
  author: "Samir Œ",
  countDown: 5,
  role: 0,
  shortDescription: {
    en: "Image to zombie"
  },
  longDescription: {
    en: "Image to zombie"
  },
  category: "🔥 | Premium",
  guide: {
    en: "{pn} reply to image"
  }
};


const samirxrichi = async ({ api, event }) => {
  const imageLink = event.messageReply?.attachments[0]?.url;
  if (!imageLink) {
    return api.sendMessage('Please reply to an image.', event.threadID, event.messageID);
  }

  try {
    const apiUrl = `https://api-samir.onrender.com/zombie?imgurl=${encodeURIComponent(imageLink)}`;
    const imageStream = await global.utils.getStreamFromURL(apiUrl);
    if (!imageStream) {
      return api.sendMessage('Failed to animate the image.', event.threadID, event.messageID);
    }
    return api.sendMessage({ attachment: imageStream }, event.threadID, event.messageID);
  } catch (error) {
    console.log(error);
    return api.sendMessage('Failed to animate the image.', event.threadID, event.messageID);
  }
};

module.exports = {
  config: valentine ,
  onStart: samirxrichi,
};
