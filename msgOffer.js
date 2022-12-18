const messageOffer = {
  offer_start: 'Выберите нужный вариант',
  cv_works: `Поздравляю! Резюме работает! `,
  cv_public: `Вы выложили резюме в открытом доступе на HH\\Habr Career и пр.`,
  kiss_hr: {
    text: `Поблагодарите HR и напишите емкое сообщение, налаживая коммуникацию с первого касания.`,
    discription: `*Пример сообщения для налаживания контакта с HR*`,
    helper: `Здравствуйте, (Имя HR-менеджера).\nБлагодарю Вас за внимание, проявленное к моей кандидатуре.\nБуду рад(а) оставаться с Вами на связи и получить приглашение на собеседование.\nС уважением, (Ваше имя).`,
  },
  letter_attach: 'Присоединяем сопроводительное письмо + одностраничное резюме отдельным файлом!',
  i_see_you: `*Ура!* Вас заметили!\nВы хотите продолжить общение по вакансии?`,
  money_with_offer: {
    text: `Как спросить про заработную плату, если она не указана в вакансии?`,
    discription: `*Пример письма*`,
    helper: `Здравствуйте, _Имя HR-менеджера_.\nСпасибо за интересное предложение. Я ознакомился(лась) с условиями, готов(а) начать общение и рассказать о своем опыте работы.\nПожалуйста, уточните размер оклада (на руки) на данной позиции?\nДело в том, что я сейчас в процессе оформления документов в другой компании и хочу понимать, есть ли смысл менять ситуацию или нет.\nСпасибо за понимание.\nС уважением, _Ваше имя_.`,
  },
  money_wo_offer: {
    text: `Как спросить про заработную плату, если она не указана в вакансии?`,
    discription: `*Пример письма*`,
    helper: `Здравствуйте, _Имя HR-менеджера_.\nСпасибо за интересное предложение. Я ознакомился(лась) с условиями, готов(а) начать общение и рассказать о своем опыте работы.\nПожалуйста, уточните размер оклада (на руки) на данной позиции?\nСпасибо за понимание.\nС уважением, _Ваше имя_.`,
  },
  want_to_talk: {
    text: `Как ответить HR, если хотите продолжить общение?`,
    discription: `*Пример ответного письма*`,
    helper: `Здравствуйте, _Имя HR-менеджера_.\nСпасибо за интересное предложение. Я ознакомился(лась) с условиями, готов(а) начать общение и рассказать о своем опыте работы.\nКогда Вам будет удобно созвониться?\nС уважением, _Ваше имя_.`,
  },
  dont_want_to_talk: {
    text: `Как отказаться от вакансии. `,
    discription: `*Пример ответного письма*`,
    helper: `Здравствуйте, _Имя HR-менеджера_.\nБлагодарю Вас за внимание, проявленное к моей кандидатуре, и предложение о сотрудничестве. К сожалению, в настоящее время я вынужден(а)  отказаться от Вашего предложения, так как:\n_не рассматриваю позицию Front\\Back\\Fullstack или стэк_\n_рассматриваю только удаленный формат работы_\n_принял оффер от другой компании_\n_завершил(а) поиски работы_\n_Ваш вариант_\nБуду рад(а) оставаться с Вами на связи и сообщу Вам, если возобновлю поиск работы.\nЖелаю Вам успехов в поиске подходящего кандидата на эту должность. Всего наилучшего Вам и _название компании_!\nС уважением, _Ваше имя_.`,
  },
  cold_letter: `"Холодные" письма.\nВы сами пишете HR первыми.`,
  cold_linked: {
    text: `Как написать hr в linkedIn?\nФорма обращения до 300 символов (строгие требования LinkedIn)`,
    discription: `*Пример письма*`,
    helper: `Здравствуйте!\nМеня зовут _Ваше имя_. Буду рад(а) присоединиться к Вашему кругу профессиональных контактов.\nСейчас я приступил(а) к поиску работы и открыт(а) к предложениям на позицию _позиция_ разработчик.\nС удовольствием пообщаюсь с Вами по открытым вакансиям в Вашей компании.`,
  },
  cold_telegram: {
    text: `Как написать hr в telegram?`,
    discription: `*Пример письма*`,
    helper: `Здравствуйте!\nМеня зовут _Ваше имя_.\nЗаинтересовала Ваша вакансия _Название должности_.\nВладею основными технологиями web-разработки: JS, HTML, CSS, Node.js, Express, PostgreSQL,Sequelize, React, Redux.(_можно дополнить список_)\nИмею опыт реализации разноплановых проектов, посмотреть которые можно по ссылке: \n_Ссылка_ \nВсегда ищу оптимальные пути решения, альтернативные варианты улучшения качества продукта. Интересуюсь новыми технологиями, свободное время посвящаю изучению нового стека.\nБуду рад обсудить подробнее свой опыт на собеседовании, когда Вам будет удобнее созвониться?\nМои контакты:\nтелефон:\ne-mail: \ntelegram:\n _можно добавить другие контакты_`,
  },
  cold_agency: {
    text: `Как написать в кадровое агентство?`,
    discription: `*Пример письма*`,
    helper: `Здравствуйте!\nПрошу рассмотреть мою кандидатуру на открытые в Вашем кадровом агентстве вакансии в сфере разработки ПО.\nВ настоящий момент ориентирован(а) на работу в крупных российских и иностранных компаниях.\nВозможные должности:\n- Frontend-разработчик\n- Fullstack-разработчик\nНа данный момент нахожусь в г. _название города_, готов к переезду в г. _название города_. Ориентируюсь на доход от _сумма зп_ тыс. руб. (без учета премий).\nВ приложении Вы найдете мое резюме, буду рад(а) предоставить любую дополнительную информацию, необходимую для рассмотрения моей кандидатуры.\nС уважением, _Ваше имя_`,
  },
  // kiss_hr: {
  //   text: ``,
  //   discription: ``,
  //   helper: ``,
  // },
  // { parse_mode: 'Markdown' }

  keep_talking: `Если HR/рекрутер вышла с Вами на связь, и в компании есть открытые вакансии, то Вы продолжаете коммуникацию и договариваетесь о собеседовании`,
  questions: `[Вопросы](https://docs.google.com/document/d/1fRN77t5175Df4fTns0qULSKE4eK5Ecy4AS6qeSY_o1U/edit?usp=sharing) для подготовки к собеседованию с HR`,
  you_asking: `Вы договорились о звонке и в концe звонка вы задаете рекрутеру\\HR вопросы:


  Какой следующий этап общения с компанией?
  Когда рекрутер\\HR даст об этом знать?
  Не возражает ли рекрутер\\HR, если Вы напомните о себе?
  Какие этапы собеседований (сколько всего этапов)?`,
  hr_is_missing: `Рекрутер пропала и не выходит с ответом в оговоренный срок`,
  you_want_it_much: `Здравствуйте, _____.
  Дело в том, что до (день недели или число) я должен дать ответ по офферу, который получил на днях, однако Ваша компания для меня приоритетна, и я бы хотел пройти дальнейшие этапы как можно скорее.
  
  А дальше:
  
  Подскажите, получится в ближайшее время провести со мной (техническое) собеседование?
  или
  Подскажите, сможете ли Вы до пятницы  вернуться с ответом по моей кандидатуре?`,
  you_want_it: `Здравствуйте, _____.
  Уточните, пожалуйста, есть ли уже решение по моей кандидатуре?
  
  Если решения нет, то уточните когда Вам можно будет вернуться за обратной связью.
  Например:
  
  Благодарю за ответ. Сообщите, пожалуйста, когда мне ожидать обратной связи по моей кандидатуре?
  
  NOTE: если рекрутер обещал Вам дать ответ в четверг, не надо писать в середине рабочего дня четверга что-то вроде: «Неужели даже отрицательного фидбэка не заслуживаю?”`,
  you_want_it_with_offer: `Здравствуйте, _____.
  Пожалуйста, уточните, какие дальнейшие этапы собеседования? Мне сегодня сделали оффер, нужно дать ответ до  (день недели или число), хотел бы успеть сравнить вакансии.`,
  hr_deny: `Рекрутер вышла к Вам с фидбэком. И это отказ ((((`,
  dont_you_cry: `Не расстраивайтесь!  Поблагодарите рекрутера за уделенное Вам время и проявленное внимание. Например:

  Здравствуйте, (Имя HR-менеджера).
  
  Спасибо за обратную связь, уделенное моей кандидатуре время и приятный опыт собеседования!
  
  Жаль, что не получится посотрудничать по данной вакансии. Но я продолжаю искать работу в этой сфере. И мне был бы очень полезен Ваш взгляд как профессионала, почему я получил(а) отказ. Хочу разобраться, над чем стоит поработать, какие навыки подтянуть.
  
  Я сейчас активно ищу работу и буду благодарен\\(на), если Вы порекомендуете мою кандидатуру коллегам.
  
  Буду признателен(льна), если сможете ответить.
  (Ваше имя).`,
  you_love_her: `В случае если с hr случилась "взаимная любовь" написать:

  Хочу поделиться с Вами положительным впечатлением. После собеседования я понял(а), что Ваша компания - это та самая компания мечты. Если у Вас что-то изменится или откроется еще одна вакансия, то я буду очень счастлив(а) принять участие в отборе на вакансию и пройти собеседование .
  
  (Ваше имя).`,
  offerCV: `Рекрутер вышла к Вам с фидбэком после тех. собеса. И это оффер!!!
  срочно писать вашему карьерному коучу!!!!!!!`,
  your_decision: `Вы  решили принять оффер?`,
  answer_yes: `Здравствуйте, (Имя HR-менеджера).
  Спасибо за предложение присоединиться к команде (название компании). Ознакомившись с условиями найма, я с радостью принимаю Ваше предложение.
  Размер оплаты труда и прочие условия, указанные в оффере, полностью меня устраивают.
  Готов(а) приступить к работе с (число\\месяц) и с нетерпением жду своего первого дня в Вашей компании.
  Если у Вас есть ко мне дополнительные вопросы, готов(а) ответить в удобное Вам время.
  
  С уважением, (Ваше имя).`,
  answer_yes_nego: `СМОТРИ БЛОК-СХЕМУ ПО ПЕРЕГОВОРАМ`,
  answer_no: `NOTE: чем дольше вы общаетесь с компанией, тем более обоснованным должен быть Ваш отказ. Главное ― избегать исчезновения из коммуникации с компанией без объяснения причин. Это может сыграть во вред Вашей репутации на рынке труда.`,
  no_explain: `Здравствуйте, (Имя HR-менеджера).
  Спасибо за предложение присоединиться к команде (название компании). Я ценю время, которое Вы потратили на то, чтобы провести собеседование и ответить на все мои вопросы.
  
  Мне нелегко далось это решение, но я вынужден(а) отказаться от Вашего предложения.
  
  Желаю Вам успехов в поиске подходящего кандидата на эту должность. Всего наилучшего Вам и (название компании)!
  
  С уважением, (Ваше имя).`,
  explain: `Здравствуйте, (Имя HR-менеджера).

  Спасибо за предложение стать частью (название компании) в роли (название позиции). Я ценю предоставленную возможность и Ваш интерес к моей кандидатуре.
  
  К сожалению, я выбрал(а) позицию в другой компании. На данном этапе она лучше всего соответствует моим карьерным ожиданиям и целям.
  
  Еще раз спасибо за Ваше время и приятный опыт собеседования!
  
  С уважением, (Ваше имя)`,
}

module.exports = messageOffer