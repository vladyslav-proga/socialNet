'use strict';

const axios = require('axios');

//generating random facts
const getFact = async () => {
  const json = await axios(process.env.GOOGLE_SHEET);
  const data = json.data.feed.entry;
  const factStore = [];
  data.forEach(item => {
    factStore.push({
      row: item.gs$cell.row,
      col: item.gs$cell.col,
      val: item.gs$cell.inputValue,
    });
  });
  return factStore;
};

const getDose = async () => {
  const json = await axios(process.env.GOOGLE_SHEET);
  const data = json.data.feed.entry;
  const doseStore = [];
  data.forEach(item => {
    doseStore.push({
      row: item.gs$cell.row,
      col: item.gs$cell.col,
      val: item.gs$cell.inputValue,
    });
  });
  return doseStore;
};

function sendStartMessage(ctx, bot) {
  let startMessage = `Здравствуйте!
    Этот бот служит личным дневником Дани,
    в нём хранятся все анализы и дозировка таблеток, 
    так же можно посмотреть рандомный факт из медицины `;
  if (ctx.from.username === 'ddynikov') {
    startMessage = 'Привет хозяин';
  } else if (ctx.from.username === 'tshemsedinov') {
    startMessage = `Здравствуйте преподователь!
      Рад Вам представить мою курсовую работу`;
  }
  bot.telegram.sendMessage(ctx.chat.id, startMessage,
    {
      'reply_markup': {
        'inline_keyboard': [
          [
            { text: 'Просмотреть анализы и дозировку', 'callback_data': 'doc' }
          ],
          [
            { text: 'Интересные факты о медицине', 'callback_data': 'fact' }
          ],
        ]
      }
    });
}

module.exports = {
  getFact,
  getDose,
  sendStartMessage,
};
