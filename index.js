const messageNego = require('./msgNego');
const messageOffer = require('./msgOffer');

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '5952866056:AAFIG-h4IWP7co5TPKTlzUAepirmJdYpnGM';

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'В начало' },
  { command: '/gif', description: 'Рандомный кот' },
  { command: '/pdf', description: 'Скачать блок-схему' },
  { command: '/coach', description: 'Написать коучу' }
])

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  try {
    if (text === '/start') {
      await bot.sendMessage(chatId, messageNego.start, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Переговоры', callback_data: 'call' }],
            [{ text: 'Поиск работы', callback_data: 'offer_start' }]
          ]
        }
      })
    }
    if (text === '/gif') {
      const res = await axios.get('https://api.giphy.com/v1/gifs/random?api_key=M1kIUJbwwhJv1QoPn4A4G2WR9JFHmHCq&tag=cat')
      const path = res.data.data.images.downsized.url
      return await bot.sendDocument(chatId, path, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'ещё', callback_data: 'gif' }]
          ]
        }
      })
    }
    if (text === '/pdf') {
      await bot.sendDocument(chatId, './Plan_negotiation.pdf', {
      });
      await bot.sendDocument(chatId, './Plan_search.pdf', {
      })
    }
    if (text === '/coach') {
      await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/kuruchbro/kuruchbro_018.webp');
      await bot.sendMessage(chatId, 'Это телеграм самого лучшего карьерного коуча на планете ➡️ @krutikovanad ⬅️ ', {
      })
    }
  } catch (e) {
    await bot.sendMessage(chatId, '🤖 Бот уснул, но скоро он проснется', {})
  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  try {
    switch (query.data) {
      case 'start': {
        return await bot.sendMessage(chatId, messageNego.start, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Переговоры', callback_data: 'call' }],
              [{ text: 'Поиск работы', callback_data: 'offer_start' }],
            ]
          }
        })
      }
      case 'call': {
        return await bot.sendMessage(chatId, messageNego.call, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'start' },
              { text: 'Следующий шаг ➡️', callback_data: 'write' }]
            ]
          }
        })
      }
      case 'write': {
        await bot.sendMessage(chatId, messageNego.write, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'call' },
              { text: 'Следующий шаг ➡️', callback_data: 'dnttalk' }]
            ]
          }
        });
        return;
      }
      case 'dnttalk': {
        return await bot.sendMessage(chatId, messageNego.dnttalk, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'write' },
              { text: 'Следующий шаг ➡️', callback_data: 'offer' }]
            ]
          }
        })
      }
      case 'offer': {
        return await bot.sendMessage(chatId, messageNego.offer, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Поднятие рейтинга', callback_data: 'boost' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'dnttalk' },
              { text: 'Следующий шаг ➡️', callback_data: 'timer' }]
            ]
          }
        })
      }
      case 'boost': {
        await bot.sendMessage(chatId, messageNego.boost.text, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.boost.description, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.boost.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'offer' },
              { text: 'Следующий шаг ➡️', callback_data: 'timer' }]
            ]
          }
        });
        return;
      }
      case 'timer': {
        await bot.sendMessage(chatId, messageNego.timer.text);
        await bot.sendMessage(chatId, messageNego.timer.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageNego.timer.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Хороший оффер', callback_data: 'goodOffer' }],
              [{ text: 'Нормальный оффер', callback_data: 'normOffer' }],
              [{ text: 'Плохой оффер', callback_data: 'badOffer' }],
              [{ text: 'Нужен ответ в короткое время', callback_data: 'short' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'offer' }]
            ]
          }
        })
      }
      case 'short': {
        await bot.sendMessage(chatId, messageNego.short.text);
        await bot.sendMessage(chatId, messageNego.short.description, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.short.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Продлили', callback_data: 'timer' }],
              [{ text: 'Не продлили', callback_data: 'shortDisagree' }],
            ]
          }
        });
        return;
      }
      case 'shortDisagree': {
        await bot.sendMessage(chatId, messageNego.shortDisagree.text);
        await bot.sendMessage(chatId, messageNego.shortDisagree.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageNego.shortDisagree.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Продлили', callback_data: 'timer' }],
              [{ text: 'Не продлили', callback_data: 'start' }],
            ]
          }
        })
      }
      case 'goodOffer': {
        return await bot.sendMessage(chatId, messageNego.goodOffer, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'timer' },
              { text: 'Следующий шаг ➡️', callback_data: 'think' }]
            ]
          }
        })
      }
      case 'normOffer': {
        return await bot.sendMessage(chatId, messageNego.normOffer, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'timer' },
              { text: 'Следующий шаг ➡️', callback_data: 'think' }]
            ]
          }
        })
      }
      case 'badOffer': {
        return await bot.sendMessage(chatId, messageNego.badOffer, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'timer' },
              { text: 'Следующий шаг ➡️', callback_data: 'dntAgree' }]
            ]
          }
        })
      }
      case 'think': {
        return await bot.sendMessage(chatId, messageNego.think, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Согласиться на оффер', callback_data: 'accept' }],
              [{ text: 'Торгуемся', callback_data: 'tryAdd' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'timer' }]
            ]
          }
        })
      }
      case 'dntAgree': {
        return await bot.sendMessage(chatId, messageNego.dntAgree, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Попытайся еще раз', callback_data: 'ansFrBdOff' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'timer' }]
            ]
          }
        })
      }
      case 'accept': {
        return await bot.sendMessage(chatId, messageNego.accept, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'think' },
              { text: 'Следующий шаг ➡️', callback_data: 'start' }]
            ]
          }
        })
      }
      case 'tryAdd': {
        await bot.sendMessage(chatId, messageNego.tryAdd.text);
        await bot.sendMessage(chatId, messageNego.tryAdd.description1, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.tryAdd.helper1, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.tryAdd.description2, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.tryAdd.helper2, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'think' }]
            ]
          }
        })
        return;
      }
      case 'ansFrBdOff': {
        await bot.sendMessage(chatId, messageNego.ansFrBdOff.text);
        await bot.sendMessage(chatId, messageNego.ansFrBdOff.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageNego.ansFrBdOff.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'timer' }]
            ]
          }
        })
      }

      //Case msgOffer

      case 'offer_start': {
        return await bot.sendMessage(chatId, messageOffer.offer_start, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Резюме', callback_data: 'cv_public' }],
              [{ text: '"Холодные" письма', callback_data: 'cold_letter' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'start' }]
            ]
          }
        })
      }
      case 'cv_public': {
        await bot.sendMessage(chatId, messageOffer.cv_public, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Рекрутер сама написала', callback_data: 'cv_works' }],
              [{ text: 'Вы сами откликнулись и получили сообщение о внесении в базу', callback_data: 'kiss_hr' }],
              [{ text: 'Вы сами откликнулись и Вас пригласили', callback_data: 'i_see_you' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'offer_start' }]
            ]
          }
        });
        return;
      }
      case 'kiss_hr': {
        await bot.sendMessage(chatId, messageOffer.kiss_hr.text);
        await bot.sendMessage(chatId, messageOffer.kiss_hr.description, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.kiss_hr.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cv_public' }]
            ]
          }
        });
        return;
      }
      case 'i_see_you': {
        return await bot.sendMessage(chatId, messageOffer.i_see_you, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'ЗП не указана. На руках есть оффер', callback_data: 'money_with_offer' }],
              [{ text: 'ЗП не указана. У вас нет оффера', callback_data: 'money_wo_offer' }],
              [{ text: 'Продолжаем общение', callback_data: 'want_to_talk' }],
              [{ text: 'Отказаться от вакансии', callback_data: 'dont_want_to_talk' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cv_public' }]
            ]
          }
        })
      }
      case 'cv_works': {
        return await bot.sendMessage(chatId, `${messageOffer.cv_works} \n${messageOffer.i_see_you}`, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'ЗП не указана. На руках есть оффер', callback_data: 'money_with_offer' }],
              [{ text: 'ЗП не указана. У вас нет оффера', callback_data: 'money_wo_offer' }],
              [{ text: 'Продолжаем общение', callback_data: 'want_to_talk' }],
              [{ text: 'Отказаться от вакансии', callback_data: 'dont_want_to_talk' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cv_public' }]
            ]
          }
        })
      }
      case 'money_with_offer': {
        await bot.sendMessage(chatId, messageOffer.money_with_offer.text);
        await bot.sendMessage(chatId, messageOffer.money_with_offer.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.money_with_offer.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cv_works' }]
            ]
          }
        })
      }
      case 'money_wo_offer': {
        await bot.sendMessage(chatId, messageOffer.money_wo_offer.text);
        await bot.sendMessage(chatId, messageOffer.money_wo_offer.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.money_wo_offer.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cv_works' }]
            ]
          }
        })
      }
      case 'want_to_talk': {
        await bot.sendMessage(chatId, messageOffer.want_to_talk.text);
        await bot.sendMessage(chatId, messageOffer.want_to_talk.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.want_to_talk.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cv_works' },
              { text: 'Следующий шаг ➡️', callback_data: 'questions' }]
            ]
          }
        })
      }
      case 'dont_want_to_talk': {
        await bot.sendMessage(chatId, messageOffer.dont_want_to_talk.text);
        await bot.sendMessage(chatId, messageOffer.dont_want_to_talk.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.dont_want_to_talk.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cv_works' }]
            ]
          }
        })
      }
      case 'questions': {
        return await bot.sendMessage(chatId, messageOffer.questions, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'want_to_talk' },
              { text: 'Следующий шаг ➡️', callback_data: 'you_asking' }]
            ]
          },
          parse_mode: 'Markdown',
        })
      }
      case 'you_asking': {
        return await bot.sendMessage(chatId, messageOffer.you_asking, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Рекрутер долго не дает ответ', callback_data: 'hr_is_missing' }],
              [{ text: 'Отказ', callback_data: 'hr_deny' }],
              [{ text: 'ОФФЕР!!!!!', callback_data: 'offerCV' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'questions' }],
            ]
          }
        })
      }
      case 'hr_is_missing': {
        return await bot.sendMessage(chatId, messageOffer.hr_is_missing, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Да, и вы очень хотите в эту компанию', callback_data: 'you_want_it_much' }],
              [{ text: 'Да, у вас есть оффер и вы торопитесь', callback_data: 'you_want_it_with_offer' }],
              [{ text: 'Да', callback_data: 'you_want_it' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'you_asking' }],
            ]
          }
        })
      }
      case 'you_want_it': {
        await bot.sendMessage(chatId, messageOffer.you_want_it.description1, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.you_want_it.helper1, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.you_want_it.description2, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.you_want_it.helper2, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.you_want_it.description3, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'hr_is_missing' }]
            ]
          }
        })
      }
      case 'you_want_it_with_offer': {
        await bot.sendMessage(chatId, messageOffer.you_want_it_with_offer.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.you_want_it_with_offer.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'hr_is_missing' }]
            ]
          }
        })
      }
      case 'you_want_it_much': {
        await bot.sendMessage(chatId, messageOffer.you_want_it_much.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.you_want_it_much.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'hr_is_missing' }]
            ]
          }
        })
      }
      case 'hr_deny': {
        return await bot.sendMessage(chatId, messageOffer.hr_deny, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Не расстраивайтесь! Поблагодарите рекрутера', callback_data: 'dont_you_cry' }],
              [{ text: 'Случилась взаимная любовь с рекрутером', callback_data: 'you_love_her' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'you_asking' }],
            ]
          }
        })
      }
      case 'dont_you_cry': {
        await bot.sendMessage(chatId, messageOffer.dont_you_cry.text, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.dont_you_cry.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.dont_you_cry.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'hr_deny' }]
            ]
          }
        })
      }
      case 'you_love_her': {
        await bot.sendMessage(chatId, messageOffer.you_love_her.text, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.you_love_her.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.you_love_her.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'hr_deny' }]
            ]
          }
        })
      }
      case 'offerCV': {
        return await bot.sendMessage(chatId, messageOffer.offerCV, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Написать коучу!', callback_data: 'coach' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'you_asking' },
              { text: 'Следующий шаг ➡️', callback_data: 'your_decision' }]
            ]
          }
        })
      }
      case 'your_decision': {
        return await bot.sendMessage(chatId, messageOffer.your_decision, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Да', callback_data: 'answer_yes' }],
              [{ text: 'Да, но не устраивают условия', callback_data: 'tryAddCV' }],
              [{ text: 'Нет', callback_data: 'answer_no' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'offerCV' }],
            ]
          }
        })
      }
      case 'answer_yes': {
        await bot.sendMessage(chatId, messageOffer.answer_yes.description, { parse_mode: 'Markdown' })
        return await bot.sendMessage(chatId, messageOffer.answer_yes.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'your_decision' }],
            ]
          }
        })
      }
      case 'answer_no': {
        return await bot.sendMessage(chatId, messageOffer.answer_no, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Отказ без объяснения причины', callback_data: 'no_explain' }],
              [{ text: 'Отказ с объяснением причины', callback_data: 'explain' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'your_decision' }],
            ]
          }
        })
      }
      case 'no_explain': {
        await bot.sendMessage(chatId, messageOffer.no_explain.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.no_explain.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'answer_no' }]
            ]
          }
        })
      }
      case 'explain': {
        await bot.sendMessage(chatId, messageOffer.explain.description, { parse_mode: 'Markdown' })
        return await bot.sendMessage(chatId, messageOffer.explain.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'answer_no' }]

            ]
          }
        })
      }
      //Проверить с блок-схемой
      case 'tryAddCV': {
        await bot.sendMessage(chatId, messageNego.tryAdd.text);
        await bot.sendMessage(chatId, messageNego.tryAdd.description1, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.tryAdd.helper1, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.tryAdd.description2, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageNego.tryAdd.helper2, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Начнем с начала', callback_data: 'start' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'your_decision' }]
            ]
          }
        })
        return;
      }
      case 'cold_letter': {
        return await bot.sendMessage(chatId, messageOffer.cold_letter, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'LinkedIn', callback_data: 'cold_linked' }],
              [{ text: 'Telegram', callback_data: 'cold_telegram' }],
              [{ text: 'Кадровое агентство', callback_data: 'cold_agency' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'offer_start' }]
            ]
          }
        })
      }
      case 'cold_linked': {
        await bot.sendMessage(chatId, messageOffer.cold_linked.text, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.cold_linked.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.cold_linked.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Договариваемся о собеседовании', callback_data: 'keep_talking' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cold_letter' }]
            ]
          }
        })
      }
      case 'cold_telegram': {
        await bot.sendMessage(chatId, messageOffer.cold_telegram.text, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.cold_telegram.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.cold_telegram.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Договариваемся о собеседовании', callback_data: 'keep_talking' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cold_letter' }]
            ]
          }
        })
      }
      case 'cold_agency': {
        await bot.sendMessage(chatId, messageOffer.cold_agency.text, { parse_mode: 'Markdown' });
        await bot.sendMessage(chatId, messageOffer.cold_agency.description, { parse_mode: 'Markdown' });
        return await bot.sendMessage(chatId, messageOffer.cold_agency.helper, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Договариваемся о собеседовании', callback_data: 'keep_talking' }],
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cold_letter' }]
            ]
          }
        })
      }
      case 'keep_talking': {
        return await bot.sendMessage(chatId, messageOffer.keep_talking, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'cold_letter' },
              { text: 'Следующий шаг ➡️', callback_data: 'questionsCV' }]
            ]
          }, parse_mode: 'Markdown'
        })
      }
      case 'questionsCV': {
        return await bot.sendMessage(chatId, messageOffer.questions, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '⬅️ Предыдущий шаг', callback_data: 'keep_talking' },
              { text: 'Следующий шаг ➡️', callback_data: 'you_asking' }]
            ]
          }
        })
      }
      case 'gif': {
        const res = await axios.get('https://api.giphy.com/v1/gifs/random?api_key=M1kIUJbwwhJv1QoPn4A4G2WR9JFHmHCq&tag=cat')
        const path = res.data.data.images.downsized.url
        return await bot.sendDocument(chatId, path, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'ещё', callback_data: 'gif' }]
            ]
          }
        })
      }
      case 'coach': {
        await bot.sendMessage(chatId, 'ВОТ СЮДА ПИШИ ➡️ @krutikovanad ⬅️ ', {
        })
      }
    }
  }
  catch (e) {
    await bot.sendMessage(chatId, '🤖 Бот уснул, но скоро он проснется', {})
  }
})

