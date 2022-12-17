const messageNego = {
  start: 'Выберите нужный вариант',
  call: 'Вам звонит/пишет HR и сообщает, что работодатель готов сделать оффер!',
  write: 'Запишите все, что HR рассказал по телефону/ сравните текст сообщения с текстом вакансии - информация может немного отличаться от опубликованной в вакансии, то, что озвучил/написал HR имеет большую силу.',
  dnttalk: 'Не говорите сразу же "да, я согласен", попросите выслать оффер в письменном виде, чтобы Вы могли подробно в спокойной обстановке ознакомиться с информацией',
  offer: 'Вы получили письменный оффер (обычно по имейлу в приложении отдельным файлом)',
  boost: {
    text: `Вы получили оффер - для "поднятия" своего рейтинга у других работодателей сообщите всем компаниям, от которых ждете ответ по собеседованиям (особенно тем, в которые очень хотите), что Вы получили оффер`,

    discription: `Пример ответа для "поднятия" своего рейтинга в глазах других работодателей`,

    helper: `Добрый день, _имя рекрутера_,\nХотел(а) бы сделать апдейт по процессу рекрутинга - я на днях  получил(а) оффер, однако Ваша компания для меня приоритетна, и я бы хотел(а) пройти дальнейшие этапы/получить обратную связь по собеседованию как можно скорее. \nПодскажите, пожалуйста, сможете ли Вы до (свой день недели) вернуться с ответом по моей кандидатуре?"`
  },
  timer: {
    text: 'Скажите, что Вам нужно время обдумать их предложение и назовите срок, когда Вы вернетесь с ответом (в идеале не больше 3-4 рабочих дней). Не принимайте оффер сразу же, так как первый оффер от любой компании ВСЕГДА минимален по сумме, он только открывает пространство переговоров по зарплате. Помните, что  зарплата разработчика прежде всего зависит от суммы, в которую он сам себя оценивает',

    discription: `Пример письма для обдумывания их предложения`,
    helper: `Добрый день, _имя рекрутера__,\nБлагодарю, документ получил(а).\nЯ внимательно ознакомлюсь с оффером и вернусь к Вам до день недели/дата. \nБольшое спасибо, что поделились со мной хорошими новостями, будем на связи!`,
  },
  short: {
    text: `Если Вы получили оффер, на который просят ответить за короткое время (24/48/72 часа), а Вы не готовы так быстро принять решение/ждете информации от других работодателей. Не ведитесь на срочность и не переживайте - это просто способ работодателя надавить и поскорее закрыть вакансию. Напишите ответ HR.`,
    discription: `Пример ответа на отсрочку принятия офера`,
    helper: `Добрый день, _имя рекрутера__,\nБлагодарю, документ получил(а). \nК сожалению, принять решение по данному предложению в такой короткий срок/за 24-48-72 часа/1 день/2 дня я не имею возможности, так как нахожусь на финальной стадии переговоров с другими компаниями, и этот процесс займет еще примерно неделю. \nМне понадобится больше времени, чтобы принять взвешенное решение.`,
  },
  shortDisagree: {
    text: `Если компания возвращается с ответом, что это единственный вариант и они не могут предложить других опций по времени, напишите им повторное письмо с просьбой продлить ожидание. \nБольшинство компаний на этом этапе продлят срок или начнут торговаться по сроку. Если этого не происходит - возможно, это не твоя компания.`,
    discription: `Пример ответа на отсрочку принятия офера`,
    helper: `Очень жаль, мне нравится Ваша компания, проект и команда. Решение о выборе работодателя для меня очень важное и ответственное, и я никак не могу его принять за такой короткий срок`,
  },
  goodOffer: `Вам сделали отличное предложение, оффер на большую зарплату, на что Вы рассчитывали`,
  normOffer: `Вам сделали хорошее предложение, оффер на среднюю зарплату`,
  badOffer: `Вам сделали предложение с низкой зарплатой`,
  think: `Прежде чем согласиться, вспомните о том, что первый оффер всегда минимальный, обдумайте и решите, хотите ли попробовать поднять сумму, это возможно!,`,
  dntAgree: `Не соглашайтесь, не попробовав поднять сумму, даже если отчаялись и считаете это первым и последним оффером. Самое страшное, что может произойти, если Вы попробуете договориться о повышении - работодатель ответит, что это финальный оффер и дальнейшие переговоры невозможны.`,
  accept: `Ок, не забудьте про юридическое оформление Вашего сотрудничества`,
  tryAdd: {
    text: `Давай попробуем поднять зп или улучшить условия`,
    discription1: `Пример сообщения, для поднятия суммы зп`,
    helper1: `Я внимательно ознакомился(лась) с Вашим предложением. Должен(а) признать, что оно привлекательно и конкурентоспособно. Мне нравится Ваша компания/проект/команда, и я заинтересован в сотрудничестве с Вами. Однако на днях у меня завершились переговоры с другой компанией, и я получил(а) оффер привлекательнее по размеру заработной платы. Предлагаю пересмотреть размер зарплаты до (сумма).`,
    discription2: `Пример сообщения, для улучшения условий`,
    helper2: `Я внимательно ознакомился(лась) с Вашим предложением. \n Должен(а) признать, что оно привлекательно и конкурентоспособно. Мне нравится Ваша компания/проект/команда, и я заинтересован в сотрудничестве с Вами. Однако я хотел(а) бы обсудить возможность удаленной работы (работы в офисе), возможность получить ДМС со стоматологией (перечислить условия, которые для Вас идеальны). \nПодскажите, пожалуйста, есть ли возможность обсудить варианты обновления оффера?`
  },
  ansFrBdOff: {
    text: `Давай попробуем поднять зп`,
    discription: `Пример сообщения, для поднятия суммы зп`,
    helper: `Я внимательно ознакомился(лась) с Вашим предложением. Мне нравится Ваша компания/проект/команда, и я заинтересован в сотрудничестве с Вами, однако меня смущает уровень заработной платы. В других компаниях, с которыми я веду переговоры, предлагается более высокий уровень дохода. \nДавайте обсудим\предлагаю пересмотреть размер зарплаты до (сумма).`,
  },
}

module.exports = messageNego