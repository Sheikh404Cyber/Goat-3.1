const fs = require('fs');
const axios = require('axios'); 
module.exports = {
  config: {
    name: "home",
    version: "2.5",
    author: "Faith | Samir Œ",
    shortDescription: "Generate a home canvas img",
    longDescription: "Generate a canvas img",
    category: "Image Processing"
  },
  onStart: async function ({
    api,
    event,
    threadsData,
    usersData
  }) {
    const {
      threadID
    } = event;
    const group = await threadsData.get(threadID);
    let groupImgUrl = group.imageSrc;
    let groupName = group.threadName;
    const numberOfAdmins = group.adminIDs.length;
    const numberOfMembers = event.participantIDs.length;
    let admin = group.adminIDs;
    let member = event.participantIDs;
    admin = Object.values(admin);
    member = Object.values(member);

    const adminAvatarUrls = [];
    const memberAvatarUrls = [];

    async function fetchAvatarUrls() {
      for (const id of admin) {
        const avatarUrl = await usersData.getAvatarUrl(id);
        adminAvatarUrls.push(avatarUrl);
      }
      for (const id of member) {
        if (!admin.includes(id)) {
          const avatarUrl = await usersData.getAvatarUrl(id);
          memberAvatarUrls.push(avatarUrl);
        }
      }
    }

    await fetchAvatarUrls();
let irl = "https://telegra.ph/file/5557ecda8d57affd6bd77.jpg";
    const data = {
      groupName: groupName,
      groupImgUrl: groupImgUrl,
      numberOfMembers: numberOfMembers,
      memberAvatarUrls: memberAvatarUrls,
      numberOfAdmins: numberOfAdmins,
      adminAvatarUrls: adminAvatarUrls,
bgUrl: irl
    };

    axios.post('https://apis-samir.onrender.com/home', data, {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'image/png',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        const out = fs.createWriteStream(__dirname + '/home_output.png');
        out.write(response.data);
        out.on('finish', () => {
          api.sendMessage({
            body: "Here's the home image:",
            attachment: fs.createReadStream(__dirname + '/home_output.png')
          }, threadID);
        });
        out.end();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
