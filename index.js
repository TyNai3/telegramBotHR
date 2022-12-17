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
            [{text: 'Переговоры', callback_data:'call'}],
            [{text: 'Поиск работы', callback_data:'offer_start'}],
            [{text: 'PDF', callback_data:'pdf'}]
          ]
        }
      })
    }
    case 'call' : {
      return await bot.sendMessage( chatId, messageNego.call, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий шаг', callback_data: 'write' }],
            [{ text: 'Предыдущий шаг', callback_data: 'start' }]
          ]
        }
      })
    }
    case 'write': {
      return await bot.sendMessage( chatId, messageNego.write, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий шаг', callback_data: 'dnttalk' }],
            [{ text: 'Предыдущий шаг', callback_data: 'call' }]
          ]
        }
      })
    }
    case 'dnttalk': {
      return await bot.sendMessage( chatId,messageNego.dnttalk, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий шаг', callback_data: 'offer' }],
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
            [{ text: 'Следующий шаг', callback_data: 'timer' }],
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
            [{ text: 'Следующий шаг', callback_data: 'timer' }],
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
            [{ text: 'Следующий шаг', callback_data: 'think' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'normOffer': {
      return await bot.sendMessage( chatId,messageNego.normOffer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий шаг', callback_data: 'think' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'badOffer': {
      return await bot.sendMessage( chatId,messageNego.badOffer, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий шаг', callback_data: 'dntAgree' }],
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
            [{ text: 'Попытайся еще раз', callback_data: 'ansFrBdOff' }],
            [{ text: 'Предыдущий шаг', callback_data: 'timer' }]
          ]
        }
      })
    }
    case 'accept': {
      return await bot.sendMessage( chatId,messageNego.accept, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Следующий шаг', callback_data: 'start' }],
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
            [{text: 'Назад', callback_data:'start'}]
          ]
        }
      })
    }
    case 'offer_start': {
      console.log('messageOffer');
      return await bot.sendMessage( chatId, messageOffer.offer_start, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Резюме', callback_data:'cv_public'}],
            [{text: 'Холодные письма', callback_data:'cold_letter'}],
            [{text: 'Назад', callback_data:'start'}]
          ]
        }
      })
    }
    case 'cv_public': {
      return await bot.sendMessage( chatId, messageOffer.cv_public, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'HR сама написала', callback_data:'cv_works'}],
            [{text: 'Вы сами откликнулись и получили сообщение', callback_data:'kiss_hr'}],
            [{text: 'Вы сами откликнулись и вас пригласили', callback_data:'i_see_you'}],
            [{text: 'Назад', callback_data:'offer_start'}]
          ]
        }
      })
    }
    case 'kiss_hr': {
      return await bot.sendMessage( chatId, messageOffer.kiss_hr, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Назад', callback_data:'cv_public'}]
          ]
        }
      })
    }
    case 'i_see_you': {
      return await bot.sendMessage( chatId, messageOffer.i_see_you, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'ЗП не указана. На руках есть оффер', callback_data:'money_with_offer'}],
            [{text: 'ЗП не указана. У вас нет оффера', callback_data:'money_wo_offer'}],
            [{text: 'Продоожаем общение', callback_data:'want_to_talk'}],
            [{text: 'Отказаться от вакансии', callback_data:'dont_want_to_talk'}],
            [{text: 'Назад', callback_data:'cv_public'}]
          ]
        }
      })
    }
    case 'cv_works': {
      return await bot.sendMessage( chatId, `${messageOffer.cv_works} \n${messageOffer.i_see_you}`, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'ЗП не указана. На руках есть оффер', callback_data:'money_with_offer'}],
            [{text: 'ЗП не указана. У вас нет оффера', callback_data:'money_wo_offer'}],
            [{text: 'Продоожаем общение', callback_data:'want_to_talk'}],
            [{text: 'Отказаться от вакансии', callback_data:'dont_want_to_talk'}],
            [{text: 'Назад', callback_data:'cv_public'}]
          ]
        }
      })
    }
    case 'money_with_offer': {
      return await bot.sendMessage( chatId, messageOffer.money_with_offer, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Назад', callback_data:'cv_works'}]
          ]
        }
      })
    }
    case 'money_wo_offer': {
      return await bot.sendMessage( chatId, messageOffer.money_wo_offer, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Назад', callback_data:'cv_works'}]
          ]
        }
      })
    }
    case 'dont_want_to_talk': {
      return await bot.sendMessage( chatId, messageOffer.dont_want_to_talk, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Начнем с начала', callback_data:'start'}],
            [{text: 'Назад', callback_data:'cv_works'}]
          ]
        }
      })
    }
    case 'want_to_talk': {
      return await bot.sendMessage( chatId, messageOffer.want_to_talk, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Вперед', callback_data:'questions'}],
            [{text: 'Назад', callback_data:'cv_works'}]
          ]
        }
      })
    }
    case 'questions': {
      return await bot.sendMessage( chatId, messageOffer.questions, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Вперед', callback_data:'you_asking'}],
            [{text: 'Назад', callback_data:'want_to_talk'}],
          ]
        }
      })
    }
    case 'you_asking': {
      return await bot.sendMessage( chatId, messageOffer.you_asking, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Рекрутер долго не дает ответ', callback_data:'hr_is_missing'}],
            [{text: 'Отказ', callback_data:'hr_deny'}],
            [{text: 'ОФФЕР!!!!!', callback_data:'offerCV'}],
            [{text: 'Назад', callback_data:'questions'}],
          ]
        }
      })
    }
    case 'hr_is_missing': {
      return await bot.sendMessage( chatId, messageOffer.hr_is_missing, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Да, и вы очень хотите в эту компанию', callback_data:'you_want_it_much'}],
            [{text: 'Да, у вас есть оффер и вы торопитесь', callback_data:'you_want_it_with_offer'}],
            [{text: 'Да', callback_data:'you_want_it'}],
            [{text: 'Назад', callback_data:'you_asking'}],
          ]
        }
      })
    }
    case 'you_want_it': {
      return await bot.sendMessage( chatId, messageOffer.you_want_it, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Назад', callback_data:'hr_is_missing'}],
          ]
        }
      })
    }
    case 'you_want_it_with_offer': {
      return await bot.sendMessage( chatId, messageOffer.you_want_it_with_offer, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Назад', callback_data:'hr_is_missing'}],
          ]
        }
      })
    }
    case 'you_want_it_much': {
      return await bot.sendMessage( chatId, messageOffer.you_want_it_much, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Назад', callback_data:'hr_is_missing'}],
          ]
        }
      })
    }
    case 'hr_deny': {
      return await bot.sendMessage( chatId, messageOffer.hr_deny, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Не расстраивайтесь! Поблагодарите  HR', callback_data:'dont_you_cry'}],
            [{text: 'Случилась взаимная любовь с HR', callback_data:'you_love_her'}],
            [{text: 'Назад', callback_data:'you_asking'}],
          ]
        }
      })
    }
    case 'dont_you_cry': {
      return await bot.sendMessage( chatId, messageOffer.dont_you_cry, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Назад', callback_data:'hr_deny'}],
          ]
        }
      })
    }
    case 'you_love_her': {
      return await bot.sendMessage( chatId, messageOffer.you_love_her, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Назад', callback_data:'hr_deny'}],
          ]
        }
      })
    }
    case 'offerCV': {
      return await bot.sendMessage( chatId, messageOffer.offerCV, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Вперед', callback_data:'your_decision'}],
            [{text: 'Написать коучу!', callback_data:'coach'}],
            [{text: 'Назад', callback_data:'you_asking'}],
          ]
        }
      })
    }
    case 'your_decision': {
      return await bot.sendMessage( chatId, messageOffer.your_decision, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Да', callback_data:'answer_yes'}],
            [{text: 'Нет', callback_data:'answer_no'}],
            [{text: 'Да, но не устраивают условия', callback_data:'tryAddCV'}],
            [{text: 'Назад', callback_data:'offerCV'}],
          ]
        }
      })
    }
    case 'answer_yes': {
      return await bot.sendMessage( chatId, messageOffer.answer_yes, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Начнем с начала', callback_data:'start'}],
            [{text: 'Назад', callback_data:'your_decision'}],
          ]
        }
      })
    }
    case 'answer_no': {
      return await bot.sendMessage( chatId, messageOffer.answer_no, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Отказ без объяснения причины', callback_data:'no_explain'}],
            [{text: 'Отказ с объяснением причины', callback_data:'explain'}],
            [{text: 'Назад', callback_data:'your_decision'}],
          ]
        }
      })
    }
    case 'no_explain': {
      return await bot.sendMessage( chatId, messageOffer.no_explain, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Начнем с начала', callback_data:'start'}],
            [{text: 'Назад', callback_data:'answer_no'}],
          ]
        }
      })
    }
    case 'explain': {
      return await bot.sendMessage( chatId, messageOffer.explain, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Начнем с начала', callback_data:'start'}],
            [{text: 'Назад', callback_data:'answer_no'}],
            
          ]
        }
      })
    }
    case 'tryAddCV': {
      return await bot.sendMessage( chatId,messageNego.tryAdd, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Начнем с начала', callback_data:'start'}],
            [{text: 'Назад', callback_data:'your_decision'}]
          ]
        }
      })
    }
    case 'cold_letter': {
      return await bot.sendMessage( chatId,messageOffer.cold_letter, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'LinkedIn', callback_data:'cold_linked'}],
            [{text: 'Telegram', callback_data:'cold_telegram'}],
            [{text: 'Кадровое агентство', callback_data:'cold_agency'}],
            [{text: 'Назад', callback_data:'offer_start'}]
          ]
        }
      })
    }
    case 'cold_linked': {
      return await bot.sendMessage( chatId,messageOffer.cold_linked, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Договариваемся о собеседовании', callback_data:'keep_talking'}],
            [{text: 'Назад', callback_data:'cold_letter'}]
          ]
        }
      })
    }
    case 'cold_telegram': {
      return await bot.sendMessage( chatId,messageOffer.cold_telegram, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Договариваемся о собеседовании', callback_data:'keep_talking'}],
            [{text: 'Назад', callback_data:'cold_letter'}]
          ]
        }
      })
    }
    case 'cold_agency': {
      return await bot.sendMessage( chatId,messageOffer.cold_agency, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Договариваемся о собеседовании', callback_data:'keep_talking'}],
            [{text: 'Назад', callback_data:'cold_letter'}]
          ]
        }
      })
    }
    case 'keep_talking': {
      return await bot.sendMessage( chatId,messageOffer.keep_talking, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Вперед', callback_data:'questionsCV'}],
            [{text: 'Назад', callback_data:'cold_letter'}]
          ]
        }
      })
    }
    case 'questionsCV': {
      return await bot.sendMessage( chatId, messageOffer.questions, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Вперед', callback_data:'you_asking'}],
            [{text: 'Назад', callback_data:'keep_talking'}],
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

