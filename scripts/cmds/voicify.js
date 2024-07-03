const axios = require("axios");
const fs = require('fs-extra');
const path = require('path');

async function voicify(api, event, args, message) {
  api.setMessageReaction("🕵️‍♂️", event.messageID, () => {}, true);
    try {
        if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
            message.reply("Please reply to a message with an audio or video attachment.");
            return;
        }

        const attachment = event.messageReply.attachments[0];
        if (attachment.type !== "audio" && attachment.type !== "video") {
            message.reply("Please reply to a message with an audio or video attachment.");
            return;
        }

        const shortUrl = attachment.url;
        const response1 = await axios.get(`https://voicify-tool.onrender.com/kshitiz?url=${encodeURIComponent(shortUrl)}`);
        const filename = response1.data.file_name;

        const response2 = await axios.get(`https://voicify-tool.onrender.com/process?filename=${filename}`);
        const instrumentalUrl = response2.data.instrumental_path;

        const fileName = `${filename}.mp3`;
        const filePath = path.join(__dirname, "cache", fileName);

        const writer = fs.createWriteStream(filePath);
        const responseStream = await axios.get(instrumentalUrl, { responseType: 'stream' });

        responseStream.data.pipe(writer);

        writer.on('finish', () => {
            const audioStream = fs.createReadStream(filePath);
            message.reply({ body: "🎵 Vocals removed!", attachment: audioStream });
            api.setMessageReaction("✅", event.messageID, () => {}, true);
        });

        writer.on('error', (error) => {
            console.error("Error:", error);
            message.reply("Error occurred while processing the audio.");
        });
    } catch (error) {
        console.error("Error:", error);
        message.reply("Error occurred while processing the audio.");
    }
}

module.exports = {
    config: {
        name: "voicify",
        version: "1.0",
        author: "vex_Kshitiz",
        countDown: 10,
        role: 0,
        shortDescription: "Remove vocals from music",
        longDescription: "Remove vocals from music.",
        category: "🎬 | Media",
        guide: "{p}voicify (reply to audio or video)"
    },
    onStart: function ({ api, event, args, message }) {
        return voicify(api, event, args, message);
    }
};
