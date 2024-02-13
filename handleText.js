const axios = require("axios");
const config = require("./config");

module.exports = async function handleText(ctx) {
  if (ctx.message.text.length > 100) {
    ctx.reply("ваше сообщение слишком большое");
    return;
  }

  const sound = await axios({
    method: "post",
    url: "https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize",
    headers: {
      Authorization: `Bearer ${config.YANDEX_IAM_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams({
      text: ctx.message.text,
      lang: "ru-RU",
      voice: "zahar",
      emotion: "good",
      format: "oggopus",
      folderId: config.YANDEX_FOLDER,
    }),
    responseType: "arraybuffer",
  });

  ctx.sendVoice({ source: sound.data, filename: "аудио" });
};
