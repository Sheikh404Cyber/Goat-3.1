module.exports = {
  config: {
    name: 'uidall',
    author: '𝐀𝐒𝐈𝐅 𝐱𝟔𝟗',
    version: '1.0.0',
    role: 2,
    category: '👑 | Robot-Owner',
    guide: { 
      en: '{pn}'
    },
    longDescription: {
      en: 'Get All Group Members UID'
    },
    inbox: true
  },
  onStart: async function ({ api, event, args }) {
    const threadID = event.threadID;
    const { participantIDs, userInfo } = await api.getThreadInfo(threadID);
    participantIDs.sort();
    const page = parseInt(args[0]) || 1;
    const participantsPerPage = 30;
    const startIdx = (page - 1) * participantsPerPage;
    const endIdx = startIdx + participantsPerPage;
    const pageParticipants = participantIDs.slice(startIdx, endIdx);
    let logMessage = `Members (Page ${page}):\n`;
    pageParticipants.forEach((participantID, index) => {
      const user = userInfo.find((u) => u.id === participantID);
      logMessage += `${index + 1}. ${user ? user.name : 'N/A'}: ${participantID}\n`;
    });

    api.sendMessage(logMessage, event.threadID);
  }

};
