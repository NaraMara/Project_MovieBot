const { Telegraf, Telegram } = require('telegraf')
var needle = require('needle');
var cheerio = require('cheerio');

const bot = new Telegraf('1684695082:AAFbWgsEGgvYeJUKDRuTEwszsfkHVtvAF0Q')  
bot.start((ctx) => ctx.reply('Welcome'))  
bot.help((ctx) => ctx.reply('Send me a sticker'))  
bot.on('sticker', (ctx) => ctx.reply('sticker')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
bot.launch() // запуск бота
bot.on('text', (ctx) => {
   ctx.reply(ctx.message.text)
   

});
needle.get('http://www.google.com', function(error, response) {
  if (!error && response.statusCode == 200)
    console.log("needle is working");
});




//test feature