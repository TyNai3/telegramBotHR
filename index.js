const message = require('./msg')

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5952866056:AAFIG-h4IWP7co5TPKTlzUAepirmJdYpnGM';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const text = msg.text
  console.log(text === 'xui');
  if(text ===  '/start') {
    await bot.sendMessage( chatId,message.start, {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Переговоры', callback_data:'call'}],
          [{text: 'Поиск работы', callback_data:'lfj'}]
        ]
      }
    })
  }
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, 'Received your message');
});

bot.on('callback_query', async(query) => {
  const chatId = query.message.chat.id;
  switch(query.data) {
    case 'start': {
      return await bot.sendMessage( chatId, message.start, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Переговоры', callback_data:'call'}],
            [{text: 'Поиск работы', callback_data:'lfj'}]
          ]
        }
      })
    }
    case 'call' : {
      return await bot.sendMessage( chatId, message.call, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'write'}],
            [{text: 'назад', callback_data:'start'}]
          ]
        }
      })
    }
    case 'write': {
      return await bot.sendMessage( chatId, message.write, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'dnttalk'}],
            [{text: 'назад', callback_data:'call'}]
          ]
        }
      })
    }
    case 'dnttalk': {
      return await bot.sendMessage( chatId,message.dnttalk, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'offer'}],
            [{text: 'назад', callback_data:'write'}]
          ]
        }
      })
    }
    case 'offer': {
      return await bot.sendMessage( chatId,message.offer, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Поднятие рейтинга', callback_data:'boost'}],
            [{text: 'Вперед', callback_data:'timer'}],
            [{text: 'назад', callback_data:'dnttalk'}]
          ]
        }
      })
    }
    case 'boost': {
      return await bot.sendMessage( chatId,message.boost, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'timer'}],
            [{text: 'назад', callback_data:'offer'}]
          ]
        }
      })
    }
    case 'timer': {
      return await bot.sendMessage( chatId,message.timer, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Хороший оффер', callback_data:'goodOffer'}],
            [{text: 'Нормальный оффер', callback_data:'normOffer'}],
            [{text: 'Плохой оффер', callback_data:'badOffer'}],
            [{text: 'Нужен ответ в короткое время', callback_data:'short'}],
            [{text: 'назад', callback_data:'offer'}]
          ]
        }
      })
    }
    case 'short': {
      return await bot.sendMessage( chatId,message.short, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Продлили', callback_data:'timer'}],
            [{text: 'Не продлили', callback_data:'shortDisagree'}],
          ]
        }
      })
    }
    case 'shortDisagree': {
      return await bot.sendMessage( chatId,message.shortDisagree, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Продлили', callback_data:'timer'}],
            [{text: 'Не продлили', callback_data:'start'}],
          ]
        }
      })
    }
    case 'goodOffer': {
      return await bot.sendMessage( chatId,message.goodOffer, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'think'}],
            [{text: 'назад', callback_data:'timer'}]
          ]
        }
      })
    }
    case 'normOffer': {
      return await bot.sendMessage( chatId,message.normOffer, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'think'}],
            [{text: 'назад', callback_data:'timer'}]
          ]
        }
      })
    }
    case 'badOffer': {
      return await bot.sendMessage( chatId,message.badOffer, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'dntAgree'}],
            [{text: 'назад', callback_data:'timer'}]
          ]
        }
      })
    }
    case 'think': {
      return await bot.sendMessage( chatId,message.think, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Согласиться на оффер', callback_data:'accept'}],
            [{text: 'Торгуемся', callback_data:'tryAdd'}],
            [{text: 'назад', callback_data:'timer'}]
          ]
        }
      })
    }
    case 'dntAgree': {
      return await bot.sendMessage( chatId,message.dntAgree, {
        reply_markup: {
          inline_keyboard: [
            [{text: ' Попытайся еще раз', callback_data:'ansFrBdOff'}],
            [{text: 'назад', callback_data:'timer'}]
          ]
        }
      })
    }
    case 'accept': {
      return await bot.sendMessage( chatId,message.accept, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'start'}],
            [{text: 'назад', callback_data:'think'}]
          ]
        }
      })
    }
    case 'tryAdd': {
      return await bot.sendMessage( chatId,message.tryAdd, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Начнем с начала', callback_data:'start'}],
            [{text: 'назад', callback_data:'think'}]
          ]
        }
      })
    }
    case 'ansFrBdOff': {
      return await bot.sendMessage( chatId,message.ansFrBdOff, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Начнем с начала', callback_data:'start'}],
            [{text: 'назад', callback_data:'timer'}]
          ]
        }
      })
    }
  }
  
})
