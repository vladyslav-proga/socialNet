'use strict';

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const fs = require('fs');
const http = require('http');
const PORT = process.env.PORT;
const FUNCTIONS = require('./modules/functions.js');
// const analyzes = require('./analyzes/analyzes.js');

const groupID = -1001120268273; //logs function
bot.use(async (ctx, next) => {
  if (ctx.updateSubTypes[0] === 'text') {
    bot.telegram.sendMessage(groupID,
      ctx.from.username + ' написал: ' + ctx.message.text);
  } else if (ctx.updateType === 'callback_query') {
    bot.telegram.sendMessage(groupID,
      ctx.from.username + ' тыкнул кнопку');
  } else {
    bot.telegram.sendMessage(groupID,
      ctx.from.username + ' написал: ' + ctx.updateSubTypes[0]);
  }
  next();
});

const start = ctx => {
  ctx.deleteMessage();
  FUNCTIONS.sendStartMessage(ctx, bot);
};

bot.action('pills', ctx => {
  new Promise(resolve => {
    const doseStore = FUNCTIONS.getDose();
    ctx.deleteMessage();
    resolve(doseStore);
  })
    .then(result => {
      const cells = result;
      result.unshift();
      const dose = cells[0];
      const message = `${dose.val}`;
      const chatID = ctx.update.callback_query.message.chat.id;

      bot.telegram.sendMessage(chatID, message, {
        'reply_markup': {
          'inline_keyboard': [
            [
              { text: 'Вернуться назад', 'callback_data': 'doc' },
            ],
          ]
        }
      });
    });
});

bot.action('doc', ctx => {
  ctx.deleteMessage();
  const infoMessage = 'Узнать информацию. Выберите, что хотите узнать';
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    'reply_markup': {
      'inline_keyboard': [
        [
          { text: 'Прошлые анализы', 'callback_data': 'analyzes' },
        ],
        [
          { text: 'Таблетки', 'callback_data': 'pills' },
        ],
        [
          { text: 'Вернуться в меню', 'callback_data': 'back' },
        ]
      ]
    }

  });
});


bot.action('analyzes', async ctx => {
  ctx.deleteMessage();
  //  ctx.answerCbQuery();
  const photos = await fs.promises.readdir('./analyzes');
  const infoMessage = 'Какие анализы Вас интересуют?';
  const keyboard = [];
  photos.forEach(photo => {
    keyboard.push([{
      text: photo.slice(0, photo.length - 4),
      'callback_data': photo
    }]);
    bot.action(photo, ctx => {
      bot.telegram.sendPhoto(ctx.chat.id, { source: `./analyzes/${photo}` });
    });
  });
  keyboard.push([{ text: 'Вернуться назад', 'callback_data': 'doc' }]);
  bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
    'reply_markup': {
      'inline_keyboard': keyboard
    }
  });
});

bot.action('fact', ctx => {
  new Promise(resolve => {
    const factStore = FUNCTIONS.getFact();
    ctx.deleteMessage();
    resolve(factStore);
  })
    .then(result => {
      const cells = result;
      result.shift();
      const k = Math.floor(Math.random() * cells.length);
      const fact = cells[k];
      const message = `${fact.val}`;
      const chatID = ctx.update.callback_query.message.chat.id;
      bot.telegram.sendMessage(chatID, message, {
        'reply_markup': {
          'inline_keyboard': [
            [
              { text: 'Ещё факт!', 'callback_data': 'fact' },

            ],
            [
              { text: 'Вернуться назад', 'callback_data': 'back' },
            ]
          ]
        }
      });
    });
});

bot.action('back', ctx => start(ctx));
bot.command('start', ctx => start(ctx));

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('I am medical-help-bot');
}).listen(PORT);

bot.launch();
