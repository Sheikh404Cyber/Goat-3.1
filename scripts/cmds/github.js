const axios = require("axios");
const moment = require("moment");
const fetch = require("node-fetch");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "github",
    aliases: ["git"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Get GitHub user info",
    longDescription: {
      en: "Provides you the information of a GitHub user",
    },
    category: "👥 | Member",
    guide: {
      en: "{pn} <username>",
    },
  },

  onStart: async function ({ api, event, args, message }) {
    if (!args[0]) return api.sendMessage(`Please provide a GitHub username`, event.threadID, event.messageID);

    fetch(`https://api.github.com/users/${encodeURI(args.join(' '))}`)
      .then(res => res.json())
      .then(async body => {
        if (body.message) return api.sendMessage(`User Not Found | Please Give Me A Valid Username!`, event.threadID, event.messageID);

        let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, updated_at, bio } = body;

        const info = 
          `=== [ 𝗜𝗡𝗙𝗢 𝗚𝗜𝗧𝗛𝗨𝗕 ] ===\n━━━━━━━━━━━━\n\n📛𝗡𝗮𝗺𝗲: ${name}\n👤 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${login}\n🔰 𝗜𝗗: ${id}\n💬 𝗕𝗶𝗼: ${bio || "No Bio"}\n🔓 𝗣𝘂𝗯𝗹𝗶𝗰 𝗥𝗲𝗽𝗼𝘀𝗶𝘁𝗼𝗿𝗶𝗲𝘀: ${public_repos || "None"}\n🎀 𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿𝘀: ${followers}\n🔖 𝗙𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴: ${following}\n🌎 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: ${location || "No Location"}\n📌 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗖𝗿𝗲𝗮𝘁𝗲𝗱: ${moment.utc(created_at).format("dddd, MMMM, Do YYYY")}\n♻ 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗨𝗽𝗱𝗮𝘁𝗲𝗱: ${moment.utc(updated_at).format("dddd, MMMM, Do YYYY")}\n🖼 𝗔𝘃𝗮𝘁𝗮𝗿:`;

        let getimg = (await axios.get(`${avatar_url}`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname+"/cache/avatargithub.png", Buffer.from(getimg, "utf-8"));

        api.sendMessage({
          attachment: fs.createReadStream(__dirname+"/cache/avatargithub.png"),
          body: info
        }, event.threadID, () => fs.unlinkSync(__dirname+"/cache/avatargithub.png"), event.messageID);
      });
  }
};
