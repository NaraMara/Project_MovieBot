const { Telegraf, Telegram } = require('telegraf')
var needle = require('needle');
var cheerio = require('cheerio');
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

//создаю http-запрос
needle('get','https://www.kinopoisk.ru/s/type/film/list/1/find/terminator/')
.then(function(response){ //обработчик ответа
  let result =parseKinopoisk(response.body)
  let data = JSON.stringify(result);
  fs.writeFile("result.JSON", data, function(error){ //пока передавать результат некуда, поэтому просто записываю в файл
 
    if(error) throw error; // если возникла ошибка


});
})
.catch(function(response){//обработчик ошибки 
  if (response.statusCode != 200)
  {
  throw error
  }
})
  console.log('ass')

function parseKinopoisk(html) {
  let results =[]
  const $=cheerio.load(html);// загружаю html 
  
  //область парсинга начало 
  let elemets =$(".search_results").find(".element").children('.info')

  elemets.each(function(){
     
    results.push({
      titleEng:$(this).children(".name").children().first().text().trim(),
      year:$(this).children(".name").children().first().next().text().trim(),
      titleRus:$(this).children(".name").next().text().split(',')[0].trim()
    })
  });
  //область парсинга конец

  return results
}

