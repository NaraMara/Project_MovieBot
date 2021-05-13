var cheerio = require('cheerio');

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
  module.exports ={parseKinopoisk}