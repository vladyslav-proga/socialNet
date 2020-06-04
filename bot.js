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
-исправить генерацию рандомных фактов*/


/*функция которая отвечает за мою личную группу бота с логами
(он туда отправялет всё, что пишут ему другие юзеры,
я в этой группе вижу их ник,
и что они написали, если же они нажали кнопку, я вижу что они её нажали)*/
bot.use(async (ctx, next) => {
  // мои бренные попытки парсить сайт с анализами
  // await axios.get('https://patient-docs.com/')
  //     .then(function (response) {
  //         //console.log(response.data);
  //         //console.log(response.status);
  //         //console.log(response.statusText);
  //         // console.log(response.headers);
  //         // console.log(response.config);
  //     });
  if (ctx.updateSubTypes[0] === 'text') {
    bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.message.text);
  } else if (ctx.updateType === 'callback_query') {
    bot.telegram.sendMessage(-498566951, ctx.from.username + ' тыкнул кнопку');
  } else {
    bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.updateSubTypes[0]);
  }
  next();
});

//функция которая отвечает за первое сообщение, это пишет бот, когда Вы пишите /start
function sendStartMessage(ctx) {
  let startMessage = 'Здравствуй, этот бот служит личным дневником Дани, в нём записаны все анализы и количество таблеток которое он выпил на протяжении какого то времени';
  if (ctx.from.username === 'ddynikov') {
    startMessage = 'Привет хозяин';

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

//кривая генерация выплёвывания рандомных фактов
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
  const infoMessage = 'Узнать информацию. Выберите, что хотите узнать';
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Прошлые анализы', callback_data: 'analyzes' },
        ],
        [
          { text: 'Таблетки', callback_data: 'pills' },
        ],
        [
          { text: 'Вернуться в меню', callback_data: 'start' },
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
  const infoMessage = 'Какая дата сдачи Вас интересует?';
  ctx.deleteMessage();
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
          { text: 'Вернуться назад', callback_data: 'doc' },
        ]
      ]
    }

  });

});

//появление нового диалогового окна с кнопками после нажатия кнопки "Я не доктор"
bot.action('user', ctx => {
  const infoMessage = 'Вся суть этого бота в том, что он хранит в себе данные анализов и количество таблеток которые Даня пьёт на данный момент, но ты можешь прочитать рандомный факт х)';
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Рандомный факт', callback_data: 'fact' },

        ],
        [
          { text: 'Всё таки посмотреть анализы', callback_data: 'analyzes' },
        ],
        [
          { text: 'Таблетки', callback_data: 'pills' },
        ],
        [
          { text: 'Вернуться назад', callback_data: 'start' },
        ]
      ]
    }

  });
});

/*кривой выводрандомных фактов, пока что их пять,
эта часть кода в ранней стадии разработки, работает через одно место*/



bot.action('fact', async ctx => {
  const factStore = await getData();
  factStore.shift();


  const k = Math.floor(Math.random() * factStore.length);
  const fact = factStore[k];
  const message = `${fact.val}`;

  ctx.reply(message);
});


/*комманда после которой обнавляется гугл табличка в которой хранятся все факты,
и по нажатию кнопки "Рандомный факт",
нам должно выплёвывать один из пяти фактов которые хранятся
в гугл табличке(пока не работает из-за ошибки с промисами)*/
bot.command('update', async ctx => {
  try {
    ctx.reply('updated');
  } catch (err) {
    console.log(err);
    ctx.reply('ERROR');
  }
});

bot.command('start', ctx => {
  sendStartMessage(ctx);
});

bot.action('start', ctx => {
  ctx.deleteMessage();
  sendStartMessage(ctx);
});

/*обьект в котором хранятся даты сдачи моих анализов
(в папке analyzes они все подписаны и с помощью фор цыкла я выплёвываю те,
которые запросит пользователь); */
const initial = {
  first: '22-05-20',
  second: '01-04-2020',
  third: '30-10-2019',
  fourth: '29-08-2019',

};

for (let i = 1; i <= 4; i++) {
  let date = initial.first;

  bot.action(`gor${i}`, ctx => {
    ctx.deleteMessage();
    bot.telegram.sendPhoto(ctx.chat.id, {
      source: `analyzes/gor${date}.jpg`
    });
  });
  if (i === 2) {
    date = initial.second;
  } else if (i === 3) {
    date = initial.third;
  } else if (i === 4) {
    date = initial.fourth;
  }
}



// bot.command('/info', (ctx) => {
//     ctx.reply('123')
// });


bot.telegram.setWebhook(`${process.env.BOT_URL}/bot${process.env.BOT_TOKEN}`);
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, process.env.PORT);