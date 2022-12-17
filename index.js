const message = require('./msg')

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5952866056:AAFIG-h4IWP7co5TPKTlzUAepirmJdYpnGM';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const text = msg.text
  console.log(text === 'xui');
  if(text ===  '/start') {
    await bot.sendMessage( chatId,message.nego, {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Переговоры', callback_data:'nego'}],
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
      return await bot.sendMessage( chatId, message.nego, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Переговоры', callback_data:'nego'}],
            [{text: 'Поиск работы', callback_data:'lfj'}]
          ]
        }
      })
    }
    case 'nego' : {
      return await bot.sendMessage( chatId, message.call, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'call'}],
            [{text: 'назад', callback_data:'start'}]
          ]
        }
      })
    }
    case 'call': {
      return await bot.sendMessage( chatId, message.write, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'write'}],
            [{text: 'назад', callback_data:'nego'}]
          ]
        }
      })
    }
    case 'write': {
      return await bot.sendMessage( chatId,message.dnttalk, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'dnttalk'}],
            [{text: 'назад', callback_data:'call'}]
          ]
        }
      })
    }
    case 'dnttalk': {
      return await bot.sendMessage( chatId,'5', {
        reply_markup: {
          inline_keyboard: [
            [{text: 'вперед', callback_data:'start'}],
            [{text: 'назад', callback_data:'write'}]
          ]
        }
      })
    }
  }
})
