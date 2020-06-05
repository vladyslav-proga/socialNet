'use strict';

const { Telegraf } = require('telegraf');
const bot = new Telegraf('1145790511:AAEngkPt9CZio886GTLus_oo_Oogsno_qaQ');
const axios = require('axios');
const fs = require('fs');
const PORT = process.env.PORT;
const http = require('http');


/* -ДОБАВИТЬ ДЕЙСТВИЯ КНОПКЕ ТАБЛЕТКИ,
СДЕЛАТЬ ТАК, ЧТО Б ДАННЫЕ МОЖНО БЫЛО ИЗМЕНЯТЬ ЧЕРЕЗ ЛОГИ.*/
/*функция которая отвечает за мою личную группу бота с логами
(он туда отправялет всё, что пишут ему другие юзеры,
я в этой группе вижу их ник,
и что они написали, если же они нажали кнопку, я вижу что они её нажали)*/
bot.use(async (ctx, next) => {
  if (ctx.updateSubTypes[0] === 'text') {
    bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.message.text);
  } else if (ctx.updateType === 'callback_query') {
    bot.telegram.sendMessage(-498566951, ctx.from.username + ' тыкнул кнопку');
  } else {
    bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.updateSubTypes[0]);
  }
  next();
});

//функция которая отвечает за первое сообщение, это отвечает бот, когда Вы пишите /start
function sendStartMessage(ctx) {
  let startMessage = 'Здравствуй, этот бот служит личным дневником Дани, в нём записаны все анализы и количество таблеток, которое он выпил на протяжении какого-то времени';
  if (ctx.from.username === 'ddynikov') {
    startMessage = 'Привет хозяин';

  } else if (ctx.from.username === 'tshemsedinov') {
    startMessage = 'Здравствуйте преподователь! Рад Вам представить мою курсовую работу';
  }
  bot.telegram.sendMessage(ctx.chat.id, startMessage,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Я эндокринолог', callback_data: 'doc' }
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
const getFact = async () => {
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


const getDose = async () => {
  const json = await axios('https://spreadsheets.google.com/feeds/cells/1JBUpCCPwOpUOFyPCmeqhUZmbvDoTc_Hytb52RRv_vhE/1/public/full?alt=json');
  const data = json.data.feed.entry;
  // console.log(data);
  const doseStore = [];
  data.forEach(item => {
    doseStore.push({
      row: item.gs$cell.row,
      col: item.gs$cell.col,
      val: item.gs$cell.inputValue,
    });
  });
  return (doseStore)
};

bot.action('pills', ctx => {
  new Promise(resolve => {
    const doseStore = getDose();
    ctx.deleteMessage();
    resolve(doseStore);
  })
    .then(result => {
      const nothing = result;
      result.unshift();
      const dose = nothing[0];
      const message = `${dose.val}`;
      const chatID = ctx.update.callback_query.message.chat.id;
      bot.telegram.sendMessage(chatID, message, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Вернуться назад', callback_data: 'doc' },
            ],
          ]
        }
      });
    });
});

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
          { text: 'Таблетки', callback_data: 'pills' },
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


bot.action('analyzes', async ctx => {
  ctx.deleteMessage();
  const photos = await fs.promises.readdir('./analyzes');
  const infoMessage = 'Какие именно анализы Вас интересуют?';
  const keyboard = [];
  photos.forEach(photo => {
    keyboard.push([{ text: photo.slice(0, photo.length - 4), callback_data: photo }]);
    bot.action(photo, ctx => {
      bot.telegram.sendPhoto(ctx.chat.id, { source: `./analyzes/${photo}` });
    });
  });
  keyboard.push([{ text: 'Вернуться назад', callback_data: 'doc' }]);
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
});




//появление нового диалогового окна с кнопками после нажатия кнопки "Я не доктор"
bot.action('user', ctx => {
  ctx.deleteMessage();
  const infoMessage = 'Тут находятся информация для Даниного доктора, но ты можешь посмотреть интересный факт из медицины';
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Интересные факты о медицине', callback_data: 'fact' },

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

bot.action('fact', ctx => {
  new Promise(resolve => {
    const factStore = getFact();
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
              { text: 'Вернуться назад', callback_data: 'user' },
            ]
          ]
        }
      });
    });
});

bot.action('back', ctx => {
  ctx.deleteMessage();
  sendStartMessage(ctx);
});


bot.command('start', ctx => {
  ctx.deleteMessage();
  sendStartMessage(ctx);
});

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('I am medical-help-bot');
}).listen(PORT);

// bot.telegram.setWebhook(`${process.env.BOT_URL}/bot${process.env.BOT_TOKEN}`);
// bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, process.env.PORT);

bot.launch();
