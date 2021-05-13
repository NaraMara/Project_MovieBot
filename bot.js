const { Telegraf, Telegram } = require("telegraf");
var needle = require("needle");
const parser = require("./parser/Parser");
const fs = require("fs");
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.start((ctx) => {
  ctx.reply("Welcome");
  const chatId = ctx.message.chat.id;

  let result=fs.readFileSync('result.json', 'utf8');
  let data = JSON.parse(result);
  let s=JSON.stringify( data[1])
  //FIXME:
  bot.telegram.sendMessage(chatId, "Поиск по запросу \"insert query here\" ", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `${data[0].titleEng} ${data[0].year}`,
            callback_data: "0",
          },
        ],

        [
          {
            text: `${data[1].titleEng} ${data[1].year}`,
            callback_data: "1",
          },
        ],

        [
          {
            text: `${data[2].titleEng} ${data[2].year}`,
            callback_data: "2",
          },
        ],

        [
          {
            text: `${data[3].titleEng} ${data[3].year}`,
            callback_data: "3",
          },
        ],

        [
          {
            text: `${data[4].titleEng} ${data[4].year}`,
            callback_data: "4",
          },
        ],

        [
          {
            text: `«`,
            callback_data: "left",
          },
          {
            text: `»`,
            callback_data: "right",
          },
        ],

        [
          {
            text: `назад в меню`,
            callback_data: "menu",
          },
        ],
      ],
    },
  });
});
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("sticker")); //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
bot.hears("hi", (ctx) => ctx.reply("Hey there")); // bot.hears это обработчик конкретного текста, данном случае это - "hi"
bot.launch(); // запуск бота
bot.on("text", (ctx) => {
  ctx.reply(ctx.message.text);
});

//создаю http-запрос
/*needle("get", process.env.KINOPOISK_URL)
  .then(function (response) {
    //обработчик ответа
    console.log("then");
    let result = parser.parseKinopoisk(response.body); //парсим ответ
    console.log("parser finished");
    let data = JSON.stringify(result); // переводим ответ в формат JSON
    fs.writeFile("result.JSON", data, function (err) {
      //записываем файл
      if (err) throw err; // если возникла ошибка
    });
  })
  .catch(function (response) {
    //обработчик ошибки
    if (response.error != 200) {
      throw response.error;
    }
  });
*/
