const { Telegraf, Telegram } = require("telegraf");
var needle = require("needle");
const parser = require("./parser/Parser");
const fs = require("fs");
//const { BaseScene } = require("telegraf/typings/scenes");

require("dotenv").config();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.command("menu", (ctx) => {
  ctx.reply("Список функций", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Где мне посмореть этот фильм ",
            callback_data: "Main",
          },
        ],
        [
          {
            text: "Информация о сервисе",
            callback_data: "Sub",
          },
        ],
      ],
    },
  });
});

bot.use((ctx, next) => {
  ctx.state.query = "";
  ctx.state.Mainflag = true;
  console.log(ctx.state.query);
  console.log(ctx.state.Mainflag);

  return next();
});
bot.on("callback_query", (ctx) => {
  if (ctx.callbackQuery.data == "Main") {
    ctx.state.Mainflag= true
    ctx.reply("Введите название контента");
  }
  if (ctx.callbackQuery.data == "Sub") {
    ctx.state.Mainflag= true
    ctx.reply("Netflix \n Cсылка: https://www.netflix.com/ru/ \n Стоимость подписки в России:599 рублей в месяц\n Стоимость подписки в США: $13,99 ");
  }
});
bot.on("text", (ctx) => {
  if (ctx.state.Mainflag == true) {
    ctx.state.query = ctx.message.text;
    needle("get", process.env.KINOPOISK_URL + ctx.state.query).then(function (
      response
    ) {
      //обработчик ответа
      console.log("then");
      let data = parser.parseKinopoisk(response.body); //парсим ответ
      console.log("parser finished");
      console.log(data);
      ctx.reply("Поиск по запросу \"insert query here\" ", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `${data[0].titleEng} ${data[0].year}`,
                callback_data: `${data[0].titleEng}`,
              },
            ],
            
              [
                {
                  text: `${data[1].titleEng} ${data[1].year}`,
                  callback_data: `${data[1].titleEng}`,
                },
              ],

              [
                {
                  text: `${data[2].titleEng} ${data[2].year}`,
                  callback_data: `${data[2].titleEng}`,
                },
              ],

              [
                {
                  text: `${data[3].titleEng} ${data[3].year}`,
                  callback_data: `${data[3].titleEng}`,
                },
              ],

              [
                {
                  text: `${data[4].titleEng} ${data[4].year}`,
                  callback_data: `${data[4].titleEng}`,
                },
              ],
          ],
        },
      });
    });
  }
});

function MakeRequest(query) {
  needle("get", process.env.KINOPOISK_URL + query)
    .then(function (response) {
      //обработчик ответа
      console.log("then");
      let result = parser.parseKinopoisk(response.body); //парсим ответ
      console.log("parser finished");
      let data = JSON.stringify(result); // переводим ответ в формат JSON

      /*fs.writeFile("result.JSON", data, function (err) {
      //записываем файл
      if (err) throw err; // если возникла ошибка
    });*/
    })
    .catch(function (response) {
      //обработчик ошибки
      if (response.error != 200) {
        throw response.error;
      }
    });
}

bot.start((ctx) => {
  ctx.reply("Welcome");
});
bot.launch(); // запуск бота
