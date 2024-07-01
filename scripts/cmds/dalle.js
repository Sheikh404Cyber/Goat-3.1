const axios = require('axios');
const { getStreamFromURL } = global.utils;
const rubishapi = global.GoatBot.config.rubishapi;

  module.exports = {
    config: {
      name: "bing",
      aliases: ["dalle"],
      version: "2.0",
      author: "RUBISH",
      shortDescription: {
        en: "An AI-based image generator using DALL·E 3 technology"
      },
      longDescription: {
        en: "Bing is an AI module that leverages the latest DALL·E 3 technology to generate images based on given prompts. It provides users with creative and unique images tailored to their inputs."
      },
      countDown: 30,
      role: 0,
      guide: {
        en: "{pn} 'prompt' ",
      },
      category: "🖼 | Image",
    },
  

  onStart: async function ({ message, args }) {
    try {
      if (args.length === 0) {
        await message.reply("⚠️ | Please provide a prompt\n\nExample ► .bing A beautiful Girl");
        return;
      }

      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      const apiKey = "rubish69";
      const cookies = [
        "1314y6Qnpwhz8NX3lMXiDM6lXGvnLTIab07tYvD-d2qXxD8rbXLPL7juGCF4_e6ePtL6B6fbqJrj4M-jpiUKkq2HPxCz7hIkxoHlhSR93m1kNyoMoa8QZ0Lg6egcT1_1l9McbvvqFFlq4lamIyEE1tb62buHc2zBYep2CX66FlFGzmrm-DaRrPqt6ygNTljRcqJif-Tys6_Fa8VmKYFlQxMYWrHC_bdiDEARrYq7BL3E",
                       "1n5xSS1EI59fN4mD48mE1wrpNHzABwHi3PW8SwoPNemfjfjGczpoeYO8SVWlzkAr_x8_jZ755ncAeh5dcrmeHlMPEKVwUYOqAkSrojSnvGjCrzDGX7BB3m3xYjMVWtlMvM7NQqJyxyvCASDMU6Ccm6f3DoQ83BtN2y-gldKI3d3sEPEv64778tXZqEFKigdERTH7jEq-BWoeB7ohpUWxsM1hMRxkWmbY5vrtt17Qpdzo",
]; 

      const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

      const apiURL = `${rubishapi}/dalle?prompt=${encodedPrompt}&cookie=${randomCookie}&apikey=${apiKey}`;

      const startTime = Date.now();
      const processingMessage = await message.reply(`
⏳ | Processing your imagination

Prompt: ${prompt}

Please wait a few seconds...`);

      const response = await axios.get(apiURL);

      const endTime = Date.now();
      const processingTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);

      const data = response.data;
      if (!data.imageLinks || data.imageLinks.length === 0) {
        if (data.errorMessage === "Invalid API key") {
          await message.reply("⚠️ | Invalid API key. Please check your API key and try again.");
        } else {
          await message.reply(`
⭕ | No images found for the 

Please try again.`);
        }
        return;
      }

      const attachment = await Promise.all(data.imageLinks.map(async (imgURL) => {
        const imgStream = await getStreamFromURL(imgURL);
        return imgStream;
      }));

      await message.reply({
        body: `
✅ | Here are the images for..

Prompt: "${prompt}" 

Processing Time: ${processingTimeInSeconds}s`,
        attachment: attachment,
      });

      message.unsend((await processingMessage).messageID);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        await message.reply("⚠️ | Unauthorized your API key \n\nContact with AMIN SHEIKH for a new apikey");
      } else if (error.response && error.response.data) {
        const responseData = error.response.data;

        if (responseData.errorMessage === "Pending") {
          await message.reply("⚠️ | This prompt has been blocked by Bing. Please try again with another prompt.");
        } else if (typeof responseData === 'object') {
          const errorMessages = Object.entries(responseData).map(([key, value]) => `${key}: ${value}`).join('\n');
          await message.reply(`⚠️ | Server error details:\n\n${errorMessages}`);
        } else if (error.response.status === 404) {
          await message.reply("⚠️ | The Bing API endpoint was not found. Please check the API URL.");
        } else {
          await message.reply(`⚠️ | Sheikh Bing server busy now\n\nPlease try again later`);
        }
      } else {
        await message.reply("⚠️ | An unexpected error occurred. Please try again later.");
      }
    }
  }
};
