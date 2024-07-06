const axios = require('axios');

module.exports = {
  config: {
    name: "toonme",
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Generate art"
    },
    longDescription: {
      en: "Generate art "
    },
    category: "🖼 | Image",
    guide: {
      en: `[
1: cartoon02
2: Cartoon002
3: NewCartoon
4: cartoon-real1
5: 2d-cartoon
6: cartoonZ
7: HD-Face-Cartoon
8: cartoon01
9: cartoon-real5
10: christmas-cartoon
11: simpson
12: 2023
13: simpson2
14: cartoon-real4
15: Disney2D
16: barbie
17: Disney3D
18: grungy
19: sketcher
20: sketch
21: magic-cartoon
22: Photo-Cartoon
23: sketch02
24: warm-cartoon
25: sketching
26: art-cartoon
27: toon01
28: toon02
29: toon04
30: toon05
31: bodycartoon2
32: bodycartoon1
33: toon06
34: toon07
35: toon03
36: toonify
37: toonify2
38: paintA
39: paint1
40: paint-new-a
41: paint-point-a
42: toonizarro
43: licht
44: toonizarro02
45: water
46: rgbdots
47: colcells
48: emboss
49: cristal
50: vintage
51: caricature-smile-a
52: caricature-gro
53: caricature-troll-a
54: caricature-fat-a
55: caricature-alien-a
56: photolab-dave-hill
57: photolab-neon
58: photolab-old-photo
59: photolab-plumbago
60: photolab-rain
61: photolab-sketch
62: photolab-snow
63: photolab-underwater
64: photolab-van-gogh
65: photolab-vintage
66: photolab-glamour
67: photolab-vogue
68: photolab-pen
69: photolab-pastel
70: photolab-graffiti
71: photolab-dipinto
72: photolab-pencil
73: halloween2
74: halloween1
]
`
    }
  },

  onStart: async function ({ api, args, event }) {
    try {
      const imageLink = event.messageReply?.attachments?.[0]?.url;

      if (!imageLink) {
        return api.sendMessage('Please reply to an image.', event.threadID, event.messageID);
      }

      try {
        const imgurResponse = await axios.get(`https://samirxpikachu.onrender.com/telegraph?url=${encodeURIComponent(imageLink)}&senderId=${event.senderID}`);

        if (!imgurResponse.data.success) {
          const errorMessage = imgurResponse.data.error;

          if (errorMessage === 'Limit Exceeded') {
            return api.sendMessage('Limit exceeded, try again after 2 hours.', event.threadID, event.messageID);
          } else if (errorMessage === 'Access Forbidden') {
            return api.sendMessage('You are banned because of trying to change credits. Contact admin: [Admin ID](https://www.facebook.com/samir.oe70)', event.threadID, event.messageID);
          }
        }

        const imgur = imgurResponse.data.result.link;
        const filter = args[0];
        const apiUrl = `https://samirxpikachu.onrender.com/cartoon?url=${encodeURIComponent(imgur)}&model=${filter || 5}&apikey=richixsamir`;
        const imageStream = await global.utils.getStreamFromURL(apiUrl);

        if (!imageStream) {
          return api.sendMessage('Something happened to Server will be fixed within 48 hours', event.threadID, event.messageID);
        }

        return api.sendMessage({ attachment: imageStream }, event.threadID, event.messageID);
      } catch (error) {
        console.error(error);
        return api.sendMessage('Skill issues', event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage('Unknown error', event.threadID, event.messageID);
    }
  }
};
