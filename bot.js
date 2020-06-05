'use strict';

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const axios = require('axios');

/* -ДОБАВИТЬ ДЕЙСТВИЯ КНОПКЕ ТАБЛЕТКИ,
СДЕЛАТЬ ТАК, ЧТО Б ДАННЫЕ МОЖНО БЫЛО ИЗМЕНЯТЬ ЧЕРЕЗ ЛОГИ.
-автоматизировать выдачу анализов из бота:
парсить сайт или подконектить бд и начать с ней работу в этом боте
(что б бот считывал данные с My SQL и передавал их,
а не кидал скриншоты анализов)
-автоматизировать всю эту байду с анализами
(сделать так, что б после сдачи,
я сразу смог посмотреть эти данные в боте, задача не из лёгких...)
-сделать заполнение данных про таблетки
-исправить генерацию рандомных фактов
-добавить комманду /stop
-пофиксить спам кнопок, что б бот автоматически удалял их при появлении новых удалял их
-исправить калечные цыклы внизу, сделать всё более интересно*/


/*функция которая отвечает за мою личную группу бота с логами
(он туда отправялет всё, что пишут ему другие юзеры,
я в этой группе вижу их ник,
и что они написали, если же они нажали кнопку, я вижу что они её нажали)*/
// bot.use(async (ctx, next) => {
//   // мои бренные попытки парсить сайт(скорее всего буду юзать бд, нафиг парсинг)
//   // await axios.get('https://patient-docs.com/')
//   //     .then(function (response) {
//   //         //console.log(response.data);
//   //         //console.log(response.status);
//   //         //console.log(response.statusText);
//   //         // console.log(response.headers);
//   //         // console.log(response.config);
//   //     });
//   if (ctx.updateSubTypes[0] === 'text') {
//     bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.message.text);
//   } else if (ctx.updateType === 'callback_query') {
//     bot.telegram.sendMessage(-498566951, ctx.from.username + ' тыкнул кнопку');
//   } else {
//     bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.updateSubTypes[0]);
//   }
//   next();
// });

//функция которая отвечает за первое сообщение, это отвечает бот, когда Вы пишите /start
function sendStartMessage(ctx) {
  let startMessage = 'Здравствуй, этот бот служит личным дневником Дани, в нём записаны все анализы и количество таблеток которое он выпил на протяжении какого то времени';
  if (ctx.from.username === 'ddynikov') {
    startMessage = 'Привет хозяин';

  } else if (ctx.from.username === 'tshemsedinov') {
    startMessage = 'Здравствуйте преподователь! Рад Вам представить мою курсовую работу'
  }
  bot.telegram.sendMessage(ctx.chat.id, startMessage,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Я эндокренолог', callback_data: 'doc' }
          ],
          [
            { text: 'Я не доктор', callback_data: 'user' }
          ],
          [
            { text: 'Информация о болезне', callback_data: 'info' }
          ]
        ]
      }
    });
}

//генерация выплёвывания рандомных фактов
const getData = async () => {
  const json = await axios('https://spreadsheets.google.com/feeds/cells/1JBUpCCPwOpUOFyPCmeqhUZmbvDoTc_Hytb52RRv_vhE/1/public/full?alt=json');
  const data = json.data.feed.entry;
  const factStore = [];
  data.forEach(item => {
    factStore.push({
      row: item.gs$cell.row,
      col: item.gs$cell.col,
      val: item.gs$cell.inputValue,
    });
  });
  return (factStore);
};






//появления новых кнопок, при нажатии кнопки "Я эндокринолог"
bot.action('doc', ctx => {
  ctx.deleteMessage();
  const infoMessage = 'Узнать информацию. Выберите, что хотите узнать';
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Прошлые анализы', callback_data: 'analyzes' },
        ],
        [
          { text: 'Таблетки(В РАЗРАБОТКЕ)', callback_data: 'pills' },
        ],
        [
          { text: 'Вернуться в меню', callback_data: 'back' },
        ]
      ]
    }

  });

});

// bot.command('pills', ctx => {

// })

// bot.action('pills', ctx => {

// })

//появление нового диалогового окна с кнопками после нажатия кнопки "Прошлые анализы"
bot.action('analyzes', ctx => {
  ctx.deleteMessage();
  const infoMessage = 'Какие именно анализы Вас интересуют?';
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Гормональные', callback_data: 'gormons' },

        ],
        [
          { text: 'Общий анализ крови', callback_data: 'general' },
        ],
        [
          { text: 'Химия', callback_data: 'chemist' },
        ],
        [
          { text: 'Вернуться назад', callback_data: 'doc' },
        ],
      ]
    }

  });

});

bot.action('gormons', ctx => {
  ctx.deleteMessage();
  const infoMessage = 'Выберите дату';
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Гормоны 22-05-2020', callback_data: 'gor1' },

        ],
        [
          { text: 'Гормоны 01-04-2020', callback_data: 'gor2' },

        ],
        [
          { text: 'Гормоны 30-10-2019', callback_data: 'gor3' },
        ],
        [
          { text: 'Гормоны 29-08-2019', callback_data: 'gor4' },

        ],
        [
          { text: 'Вернуться назад', callback_data: 'analyzes' },
        ]
      ]
    }

  });
});


bot.action('general', ctx => {
  ctx.deleteMessage();
  const infoMessage = 'Выберите дату';
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Общий анализ крови 22-05-2020', callback_data: 'general1' },

        ],
        [
          { text: 'Общий анализ крови 01-04-2020', callback_data: 'general2' },

        ],
        [
          { text: 'Общий анализ крови 30-10-2019', callback_data: 'general3' },
        ],
        [
          { text: 'Вернуться назад', callback_data: 'analyzes' },
        ]
      ]
    }

  });
});

bot.action('chemist', ctx => {
  ctx.deleteMessage();
  const infoMessage = 'Выберите дату';
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Химия 01-04-2020', callback_data: 'chemist1' },

        ],
        [
          { text: 'Вернуться назад', callback_data: 'analyzes' },
        ]
      ]
    }

  });
});



//появление нового диалогового окна с кнопками после нажатия кнопки "Я не доктор"
bot.action('user', ctx => {
  ctx.deleteMessage();
  const infoMessage = 'Привет, тут находятся информация для Даниного доктора, но ты можешь посмотреть интересный факт из медицины';
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Рандомный факт', callback_data: 'fact' },

        ],
        [
          { text: 'Информация о болезне(В РАЗРАБОТКЕ)', callback_data: 'info' },
        ],
        [
          { text: 'Вернуться назад', callback_data: 'back' },
        ]
      ]
    }

  });
});


bot.on('callback_query', ctx => {
  const data = ctx.update.callback_query.data;
  if (data === 'fact') {
    new Promise(resolve => {
      const factStore = getData();
      ctx.deleteMessage();
      resolve(factStore);
    })
      .then(result => {
        const nothing = result;
        result.shift();
        const k = Math.floor(Math.random() * nothing.length);
        const fact = nothing[k];
        const message = `${fact.val}`;
        const chatID = ctx.update.callback_query.message.chat.id;
        bot.telegram.sendMessage(chatID, message, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Ещё факт!', callback_data: 'fact' },

              ],
              [
                { text: 'Вернуться назад', callback_data: 'back' },
              ]
            ]
          }

        });
      });
  } else if (data === 'back') {
    ctx.deleteMessage();
    sendStartMessage(ctx);
  }
});



// bot.command('pills', ctx => {

// })

bot.command('start', ctx => {
  sendStartMessage(ctx);
});


/*обьект в котором хранятся даты сдачи моих анализов
(в папке analyzes они все подписаны и с помощью цыкла я выплёвываю те,
которые запросит пользователь); */
const initial = {
  firstgor: '22-05-20',
  secondgor: '01-04-2020',
  thirdgor: '30-10-2019',
  fourthgor: '29-08-2019',
  firstgeneral: '22-05-2020',
  secondgeneral: '01-04-2020',
  thirdgeneral: '30-10-2019',
  firstchemist: '01-04-2020',
};

for (let i = 1; i <= 4; i++) {
  let dategor = initial.firstgor;

  bot.action(`gor${i}`, ctx => {
    console.log('debug');
    bot.telegram.sendPhoto(ctx.chat.id, {
      source: `analyzes/gor${dategor}.jpg`
    });
  });
  if (i === 2) {
    dategor = initial.secondgor;
  } else if (i === 3) {
    dategor = initial.thirdgor;
  } else if (i === 4) {
    dategor = initial.fourthgor;
  }
}

for (let i = 1; i <= 3; i++) {
  let dategeneral = initial.firstgeneral;
  bot.action(`general${i}`, ctx => {
    console.log('debug2')
    bot.telegram.sendPhoto(ctx.chat.id, {
      source: `analyzes/general${dategeneral}.jpg`
    });
  });
  if (i === 2) {
    dategeneral = initial.secondgeneral;
  } else if (i === 3) {
    dategeneral = initial.thirdgeneral;
  }
}

for (let i = 1; i <= 3; i++) {
  let datechemist = initial.firstchemist;
  bot.action(`chemist${i}`, ctx => {
    console.log('debug3')
    bot.telegram.sendPhoto(ctx.chat.id, {
      source: `analyzes/chemist${datechemist}.jpg`
    });
  });
  if (i === 2) {
    datechemist = initial.secondchemist;
  } else if (i === 3) {
    datechemist = initial.thirdchemist;
  }
}

bot.telegram.setWebhook(`${process.env.BOT_URL}/bot${process.env.BOT_TOKEN}`);
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, process.env.PORT);
