const axios = require('axios');

module.exports = {
    config: {
        name: "age",
        aliases: ["birthday", "birthdate"],
        version: "1.0", 
        author: "RUBISH",
        description: {
            vi: "Lấy thông tin tuổi dựa trên ngày sinh.",
            en: "Get age information based on the birthdate."
        },
        category: "UTILITY",
        guide: {
            vi: "{pn} <ngày sinh (DD-MM-YYYY)>",
            en: "{pn} <birthdate (DD-MM-YYYY)>"
        }
    },

    onStart: async function ({ api, args, event }) {
        const birthdate = args[0];

        try {
            const response = await axios.get(`${global.GoatBot.config.rubishapi}/agecalculator?birthdate=${birthdate}&apikey=rubish69`);
            const data = response.data;

            const formattedResponse = `
╟    𝗔𝗚𝗘 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡    ╢
﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌
📅 Birthdate: ${birthdate}

🎂 Age: ${data.ageData.age.years} years ${data.ageData.age.months} months ${data.ageData.age.days} days

📅 Total Age:
  - Years: ${data.ageData.totalAge.years}
  - Months: ${data.ageData.totalAge.months}
  - Weeks: ${data.ageData.totalAge.weeks}
  - Days: ${data.ageData.totalAge.days}
  - Hours: ${data.ageData.totalAge.hours}
  - Minutes: ${data.ageData.totalAge.minutes}
  - Seconds: ${data.ageData.totalAge.seconds}

🎉 Next Birthday: ${data.ageData.nextBirthday.dayName}, ${data.ageData.nextBirthday.remainingMonths} months ${data.ageData.nextBirthday.remainingDays} days

🖼 Image URL: ${data.imgbbImageUrl}
`;

            if (typeof data.imgbbImageUrl === 'string' && data.imgbbImageUrl) {
                const attachment = await global.utils.getStreamFromURL(data.imgbbImageUrl);
                await api.sendMessage({
                    body: formattedResponse,
                    attachment
                }, event.threadID);
            } else {
                await api.sendMessage({
                    body: formattedResponse
                }, event.threadID);
            }
        } catch (error) {
            console.error('Error fetching age data:', error);
            api.sendMessage("An error occurred while processing the request.", event.threadID);
        }
    }
};
