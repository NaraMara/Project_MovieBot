const { Telegraf, Telegram } = require('telegraf')
var needle = require('needle');
const parser = require("./parser/Parser");
const fs = require('fs');

/*const bot = new Telegraf('1684695082:AAFbWgsEGgvYeJUKDRuTEwszsfkHVtvAF0Q')  
bot.start((ctx) => ctx.reply('Welcome'))  
bot.help((ctx) => ctx.reply('Send me a sticker'))  
bot.on('sticker', (ctx) => ctx.reply('sticker')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
bot.launch() // запуск бота
bot.on('text', (ctx) => {
   ctx.reply(ctx.message.text)
   
});*/



console.log("asfd")
//создаю http-запрос
needle('get','https://www.kinopoisk.ru/s/type/film/list/1/find/terminator/')
.then(function(response){ //обработчик ответа
  console.log("then")
  let result =parser.parseKinopoisk(response.body)//парсим ответ 
  console.log("parser finished")
  let data = JSON.stringify(result);// переводим ответ в формат JSON 
  fs.writeFile("result.JSON", data, function(err){ //записываем файл
    if(err) throw err; // если возникла ошибка
  })
})
.catch(function(response){//обработчик ошибки 
  if (response.error!= 200)
  {
  throw response.error
  }
})


