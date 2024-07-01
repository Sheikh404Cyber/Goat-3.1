module.exports = {
  config: {
    name: "lyricalvideo",
    aliases: ["lyricsvideo", "lyricseditvibe", "lyricaledit"],
    version: "1.0",
    author: "kshitiz",
    countDown: 10,
    role: 0,
    shortDescription: "get lyrical video",
    longDescription: "it will send you lyrical video from lyrics edit vibe group",
    category: "🎬 | Media",
    guide: "{pn} lyricalvideo",
  },

  onStart: async function ({ api, event }) {
    const sentMessage = await api.sendMessage("✅ Loading random lyrical video\nPlease wait...!", event.threadID);
    const link = [
      "https://drive.google.com/uc?export=download&id=1xdoZpGGd1iC9zkTHojL-uh_Xu8pp8LwJ",// video credits lyrics edit vibe (fb group)
      "https://drive.google.com/uc?export=download&id=1RNZhamE4ArtjdsCvbeBWtIzhRYmMbG6z",
      "https://drive.google.com/uc?export=download&id=13cYUnYi9_hHY4-wRUqV6z3gtRci88A5I",
      "https://drive.google.com/uc?export=download&id=1tR-12BqyCccyMGqMa-OLYrBB0YkqBigX",
      "https://drive.google.com/uc?export=download&id=1MCyv1IIw1nQk96hBa6faJLQXVps2NDB1",
      "https://drive.google.com/uc?export=download&id=1ZYYStznq6rWQ4m8FcGs8CS1mp_mHHE89",
      "https://drive.google.com/uc?export=download&id=1D-1iO7nO-Nlcie3uUAluPaI53yRarCdE",
      "https://drive.google.com/uc?export=download&id=1Pk27Z4LX2y2rHcvtY5VJiF9hJoowY9HR",
      "https://drive.google.com/uc?export=download&id=1FBJ6kZFZPmYZSk3vHz7ECfqdA4yhF2k0",
      "https://drive.google.com/uc?export=download&id=1md55_KQdoTX4HWW6n0RM7AbBfW8XPyGN",
      "https://drive.google.com/uc?export=download&id=1KCYrHH1lISPWbA8q7kLX8G7BUsJhlqw9",
      "https://drive.google.com/uc?export=download&id=1NYxXQ7UmVjcTdY27WePCJ8iW6HC_l-Ej",
      "https://drive.google.com/uc?export=download&id=1SC9OnQcXlkRGt1auBgV_Ez9itpYG2ixh",
      "https://drive.google.com/uc?export=download&id=1D_ODRaSij_KQemlzrQS9B-h3RM6yZ680",
      "https://drive.google.com/uc?export=download&id=1fZgMyISANhpOLcfo5HVht5OKolhrHQoD",
      "https://drive.google.com/uc?export=download&id=1glf5NdpxDWcfPVyQdYv1HleNmJ6-8WN8",
      "https://drive.google.com/uc?export=download&id=1trMuw_ezC58iMwR4umtRKzRdK0_VsI7Y",
      "https://drive.google.com/uc?export=download&id=1mDCJvrIUHfPgi1CH-xTxSZbaOQPXfF8S",
      "https://drive.google.com/uc?export=download&id=1mNKuaSICDDGL8pq26oR07nIFVWfTCjpu",
      "https://drive.google.com/uc?export=download&id=1oX2VgqglgDilll77xURzPTrvwEjx5B4e",
      "https://drive.google.com/uc?export=download&id=1usstpJwO6NkxCQiPiEW9yj0H4julH0kO",
      "https://drive.google.com/uc?export=download&id=1VLGzoJM52Q8WYviX6DLg9okDRd16lE75",
      "https://drive.google.com/uc?export=download&id=1IGUZduyBGTGSq27gkxiLRkuHYNjC7fXv",
      "https://drive.google.com/uc?export=download&id=1IGUZduyBGTGSq27gkxiLRkuHYNjC7fXv",
      "https://drive.google.com/uc?export=download&id=1Jgiy1cI4CIpZeHL3-YaUgcX1UzahaDwN",
      "https://drive.google.com/uc?export=download&id=1sIH4GwHfpny684720z1gFulQCbbjCuQo",
      "https://drive.google.com/uc?export=download&id=1E1G1ecSy_DyOWmQPVJI8EIWFcerdfsqt",
      "https://drive.google.com/uc?export=download&id=1zKzL9yoHasu5R2sii2cJLomB81e3liYp",
      "https://drive.google.com/uc?export=download&id=1q51lljCcR_V7uCR_Umhst-2mnUpjriOA",
      "https://drive.google.com/uc?export=download&id=1TVKeHZuGWY3qVkNtXM53Uploac4uAGPr",
      "https://drive.google.com/uc?export=download&id=1fMk8VvH5w-FsIZC2kcB895DZiu1I9XOh",
      "https://drive.google.com/uc?export=download&id=1_4PSnfa4fhnXCZI8OgTYE55jgnUJjlPF",
      // Add more video links here
    ];

    const randomIndex = Math.floor(Math.random() * link.length);
    const randomVideo = link[randomIndex];

    await api.sendMessage({
      body: 'ENJOY..🤍',
      attachment: await global.utils.getStreamFromURL(randomVideo),
    }, event.threadID);

    
    setTimeout(() => {
      api.unsendMessage(sentMessage.messageID);
    }, 10000); 
  },
};
