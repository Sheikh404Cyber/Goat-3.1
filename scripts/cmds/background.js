const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

/*
add your background images here
chaneg the links ok it will be expired use imgbb and imgurl 
*/
const backgroundImages = [
  "https://tinyurl.com/26auokp5",
  "https://tinyurl.com/28xdtkku",
  "https://tinyurl.com/2cvhrb9d"
];



module.exports = {
  config: {
    name: "background",
    aliases: ["bg"],
    version: "1.0",
    author: "Vex_kshitiz",
    shortDescription: "Add background in images",
    longDescription: "add background in images",
    category: "image",
    guide: {
      en: "{p}background <number>"
    }
  },
  onStart: async function ({ message, event, args, api }) {
    try {
      if (event.type !== "message_reply") {
        return message.reply("learn how to use first");
      }

      const attachment = event.messageReply.attachments;
      if (!attachment || attachment.length !== 1 || attachment[0].type !== "photo") {
        return message.reply("learn how to use first");
      }

      const bgNumber = parseInt(args[0]);
      if (isNaN(bgNumber) || bgNumber < 1 || bgNumber > backgroundImages.length) {
        return message.reply("❌ || Invalid background number.\nPlease choose a number between 1 and " + backgroundImages.length + ".");
      }

      const bgImage = await loadImage(backgroundImages[bgNumber - 1]);
      const imageUrl = attachment[0].url;
      const image = await loadImage(imageUrl);

      const canvasWidth = image.width;
      const canvasHeight = image.height;

      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);

      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      const cacheFolderPath = path.join(__dirname, 'cache');
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `background_${bgNumber}.png`);
      const out = fs.createWriteStream(imagePath);
      canvas.createPNGStream().pipe(out);
      out.on('finish', () => {
        message.reply({
          body: "",
          attachment: fs.createReadStream(imagePath)
        });
      });

    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | An error occurred.");
    }
  }
};
