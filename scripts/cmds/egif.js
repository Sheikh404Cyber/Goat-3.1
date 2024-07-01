module.exports = {
  config: {
    name: "egif",
    version: "1.0",
    author: "Samir Œ",
    shortDescription: "Get an emoji gif",
    longDescription: "Fetches and sends a  gif corresponding to the provided emoji.",
    category: "👥 | Member",
    guide: {
      en: "{pn} [emoji]"
    }
  },

  onStart: async function ({ api, args, event }) {
    try {
      const emoji = encodeURIComponent(args.join(" "));
      const apiUrl = `https://apis-samir.onrender.com/egif?emoji=${emoji}`;

      const gifUrl = await global.utils.getStreamFromURL(apiUrl);

      if (gifUrl) {
        await api.sendMessage({
          attachment: gifUrl
        }, event.threadID);
      } else {
        throw new Error("Failed to fetch emoji gif.");
      }
    } catch (error) {
      console.error("Error retrieving emoji gif:", error.message);
      api.sendMessage({ body: "Failed to retrieve emoji gif." }, event.threadID);
    }
  }
};
