const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5952866056:AAFIG-h4IWP7co5TPKTlzUAepirmJdYpnGM';
const webAppUrl = 'https://ya.ru'

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
    await bot.sendMessage( chatId,'knopka', {
      reply_markup: {
        keyboard: [
          [{text: 'knopka', web_app: {url: webAppUrl }}]
        ]
      }
    })
  }
  if (text === 'xui') {
    console.log(123);
     bot.sendMessage(chatId, text)
  }
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, 'Received your message');
});
