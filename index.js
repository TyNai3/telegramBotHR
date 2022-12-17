const messageNego = require('./msgNego');
const messageOffer = require('./msgOffer');

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')

const token = '5952866056:AAFIG-h4IWP7co5TPKTlzUAepirmJdYpnGM';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text
  if (text === '/start') {
    await bot.sendMessage(chatId, messageNego.start, {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Переговоры', callback_data:'call'}],
          [{text: 'Поиск работы', callback_data:'lfj'}],
          [{text: 'PDF', callback_data:'pdf'}],
          [{text: 'Рандомный кот', callback_data:'gif'}],
          [{text: 'Написать коучу', callback_data:'coach'}]
        ]
      }
    })
  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  switch (query.data) {
    case 'start': {
      return await bot.sendMessage( chatId, messageNego.start, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Переговоры', callback_data: 'call' }],
            [{ text: 'Поиск работы', callback_data: 'lfj' }]
          ]
        }
      })
    }
    case 'call' : {
      return await bot.sendMessage( chatId, messageNego.call, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'write' }],
            [{ text: 'Предыдущий шаг', callback_data: 'start' }]
          ]
        }
      })
    }
    case 'write': {
      return await bot.sendMessage( chatId, messageNego.write, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'dnttalk' }],
            [{ text: 'Предыдущий шаг', callback_data: 'call' }]
          ]
        }
      })
    }
    case 'dnttalk': {
      return await bot.sendMessage( chatId,messageNego.dnttalk, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'offer' }],
            [{ text: 'Предыдущий шаг', callback_data: 'write' }]
          ]
        }
      })
    }
    case 'offer': {
      return await bot.sendMessage( chatId,messageNego.offer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Поднятие рейтинга', callback_data: 'boost' }],
            [{ text: 'Следующий щаг', callback_data: 'timer' }],
            [{ text: 'Предыдущий шаг', callback_data: 'dnttalk' }]
          ]
        }
      })
    }
    case 'boost': {
      await bot.sendMessage(chatId, messageNego.boost.text);
      await bot.sendMessage(chatId, messageNego.boost.discription);
      await bot.sendMessage(chatId, messageNego.boost.helper, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'timer' }],
            [{ text: 'Предыдущий шаг', callback_data: 'offer' }]
          ]
        }
      });
      return;
    }
    case 'timer': {
      await bot.sendMessage(chatId, messageNego.timer.text);
      await bot.sendMessage(chatId, messageNego.timer.discription);
      return await bot.sendMessage(chatId, messageNego.timer.helper, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Хороший оффер', callback_data: 'goodOffer' }],
            [{ text: 'Нормальный оффер', callback_data: 'normOffer' }],
            [{ text: 'Плохой оффер', callback_data: 'badOffer' }],
            [{ text: 'Нужен ответ в короткое время', callback_data: 'short' }],
            [{ text: 'Предыдущий шаг', callback_data: 'offer' }]
          ]
        }
      })
    }
    case 'short': {
      await bot.sendMessage(chatId, messageNego.short.text);
      await bot.sendMessage(chatId, messageNego.short.discription);
      return await bot.sendMessage(chatId, messageNego.short.helper, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Продлили', callback_data: 'timer' }],
            [{ text: 'Не продлили', callback_data: 'shortDisagree' }],
          ]
        }
      })
    }
    case 'shortDisagree': {
      await bot.sendMessage(chatId, messageNego.short.text);
      await bot.sendMessage(chatId, messageNego.short.discription);
      return await bot.sendMessage(chatId, messageNego.shortDisagree.helper, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Продлили', callback_data: 'timer' }],
            [{ text: 'Не продлили', callback_data: 'start' }],
          ]
        }
      })
    }
    case 'goodOffer': {
      return await bot.sendMessage( chatId,messageNego.goodOffer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'think' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'normOffer': {
      return await bot.sendMessage( chatId,messageNego.normOffer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'think' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'badOffer': {
      return await bot.sendMessage( chatId,messageNego.badOffer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'dntAgree' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'think': {
      return await bot.sendMessage( chatId,messageNego.think, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Согласиться на оффер', callback_data: 'accept' }],
            [{ text: 'Торгуемся', callback_data: 'tryAdd' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'dntAgree': {
      return await bot.sendMessage( chatId,messageNego.dntAgree, {
        reply_markup: {
          inline_keyboard: [
            [{ text: ' Попытайся еще раз', callback_data: 'ansFrBdOff' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'accept': {
      return await bot.sendMessage( chatId,messageNego.accept, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'start' }],
            [{ text: 'Предыдущий шаг', callback_data: 'think' }]
          ]
        }
      })
    }
    case 'tryAdd': {
      await bot.sendMessage(chatId, messageNego.tryAdd.text);
      await bot.sendMessage(chatId, messageNego.tryAdd.discription1);
      await bot.sendMessage(chatId, messageNego.tryAdd.helper1);
      await bot.sendMessage(chatId, messageNego.tryAdd.discription2);
      return await bot.sendMessage(chatId, messageNego.helper2, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Начнем с начала', callback_data: 'start' }],
            [{ text: 'Предыдущий шаг', callback_data: 'think' }]
          ]
        }
      })
    }
    case 'ansFrBdOff': {
      await bot.sendMessage(chatId, messageNego.ansFrBdOff.text);
      await bot.sendMessage(chatId, messageNego.ansFrBdOff.discription1);
      return await bot.sendMessage(chatId, messageNego.ansFrBdOff.helper, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Начнем с начала', callback_data: 'start' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'pdf' : {
      return await bot.sendDocument( chatId, './xxx.pdf', {
        reply_markup: {
          inline_keyboard: [
            [{text: 'назад', callback_data:'start'}]
          ]
        }
      })
    }
    case 'gif' : {
      const res = await axios.get('https://api.giphy.com/v1/gifs/random?api_key=M1kIUJbwwhJv1QoPn4A4G2WR9JFHmHCq&tag=cat')
      const path = res.data.data.images.downsized.url
      return await bot.sendDocument(chatId, path, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'ещё', callback_data:'gif'}]
          ]
        }
      })
    }
    case 'coach' : {
      return await bot.sendMessage( chatId, '@krutikovanad', {
        reply_markup: {
          inline_keyboard: [
            [{text: 'назад', callback_data:'start'}]
          ]
        }
      })
    }
  }
})

