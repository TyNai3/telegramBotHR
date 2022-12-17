const message = require('./msg')

const TelegramBot = require('node-telegram-bot-api');

const token = '5952866056:AAFIG-h4IWP7co5TPKTlzUAepirmJdYpnGM';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text
  console.log(text === 'xui');
  if (text === '/start') {
    await bot.sendMessage(chatId, message.start, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Переговоры', callback_data: 'call' }],
          [{ text: 'Поиск работы', callback_data: 'lfj' }]
        ]
      }
    })
  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  switch (query.data) {
    case 'start': {
      return await bot.sendMessage(chatId, message.start, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Переговоры', callback_data: 'call' }],
            [{ text: 'Поиск работы', callback_data: 'lfj' }]
          ]
        }
      })
    }
    case 'call': {
      return await bot.sendMessage(chatId, message.call, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'write' }],
            [{ text: 'Предыдущий шаг', callback_data: 'start' }]
          ]
        }
      })
    }
    case 'write': {
      return await bot.sendMessage(chatId, message.write, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'dnttalk' }],
            [{ text: 'Предыдущий шаг', callback_data: 'call' }]
          ]
        }
      })
    }
    case 'dnttalk': {
      return await bot.sendMessage(chatId, message.dnttalk, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'offer' }],
            [{ text: 'Предыдущий шаг', callback_data: 'write' }]
          ]
        }
      })
    }
    case 'offer': {
      return await bot.sendMessage(chatId, message.offer, {
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
      await bot.sendMessage(chatId, message.boost.text);
      await bot.sendMessage(chatId, message.boost.discription);
      await bot.sendMessage(chatId, message.boost.helper, {
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
      await bot.sendMessage(chatId, message.timer.text);
      await bot.sendMessage(chatId, message.timer.discription);
      return await bot.sendMessage(chatId, message.timer.helper, {
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
      await bot.sendMessage(chatId, message.short.text);
      await bot.sendMessage(chatId, message.short.discription);
      return await bot.sendMessage(chatId, message.short.helper, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Продлили', callback_data: 'timer' }],
            [{ text: 'Не продлили', callback_data: 'shortDisagree' }],
          ]
        }
      })
    }
    case 'shortDisagree': {
      await bot.sendMessage(chatId, message.short.text);
      await bot.sendMessage(chatId, message.short.discription);
      return await bot.sendMessage(chatId, message.shortDisagree.helper, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Продлили', callback_data: 'timer' }],
            [{ text: 'Не продлили', callback_data: 'start' }],
          ]
        }
      })
    }
    case 'goodOffer': {
      return await bot.sendMessage(chatId, message.goodOffer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'think' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'normOffer': {
      return await bot.sendMessage(chatId, message.normOffer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'think' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'badOffer': {
      return await bot.sendMessage(chatId, message.badOffer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'dntAgree' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'think': {
      return await bot.sendMessage(chatId, message.think, {
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
      return await bot.sendMessage(chatId, message.dntAgree, {
        reply_markup: {
          inline_keyboard: [
            [{ text: ' Попытайся еще раз', callback_data: 'ansFrBdOff' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'accept': {
      return await bot.sendMessage(chatId, message.accept, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий щаг', callback_data: 'start' }],
            [{ text: 'Предыдущий шаг', callback_data: 'think' }]
          ]
        }
      })
    }
    case 'tryAdd': {
      await bot.sendMessage(chatId, message.tryAdd.text);
      await bot.sendMessage(chatId, message.tryAdd.discription1);
      await bot.sendMessage(chatId, message.tryAdd.helper1);
      await bot.sendMessage(chatId, message.tryAdd.discription2);
      return await bot.sendMessage(chatId, message.helper2, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Начнем с начала', callback_data: 'start' }],
            [{ text: 'Предыдущий шаг', callback_data: 'think' }]
          ]
        }
      })
    }
    case 'ansFrBdOff': {
      await bot.sendMessage(chatId, message.ansFrBdOff.text);
      await bot.sendMessage(chatId, message.ansFrBdOff.discription1);
      return await bot.sendMessage(chatId, message.ansFrBdOff.helper, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Начнем с начала', callback_data: 'start' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
  }

})
