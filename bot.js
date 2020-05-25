'use strict'
const Telegraf = require('telegraf');
const bot = new Telegraf('1145790511:AAFx6ggzoezwJBr7WJ4DLGSGsEkmhM00DK4');
const axios = require('axios');

//сделать заполнение анализов автоматическим
//сделать заполнение данных про таблетки
//сделать рандомные факты
//раскидать функции по модулям
//исправить говнокод

bot.use(async (ctx, next) => {
    axios.get('https://patient-docs.com/')
        .then(function (response) {
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
        });
    if (ctx.updateSubTypes[0] == 'text') {
        bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.message.text);
    } else if (ctx.updateType == 'callback_query') {
        bot.telegram.sendMessage(-498566951, ctx.from.username + ' тыкнул кнопку');
    } else {
        bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.updateSubTypes[0]);
    }
    next();
})


function sendStartMessage(ctx) {
    let startMessage = `Здравствуй, этот бот служит личным дневником Дани, в нём записаны все анализы и количество таблеток которое он выпил на протяжении какого то времени`;

    if (ctx.from.username === "ddynikov") {
        startMessage = `Привет хозяин`;

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
        })
}


bot.command('start', ctx => {
    sendStartMessage(ctx);
})




bot.action('doc', ctx => {
    let infoMessage = `Узнать информацию. Выберите, что хотите узнать`;
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

    })

})

bot.action('analyzes', (ctx) => {
    let infoMessage = `Какая дата сдачи Вас интересует?`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, infoMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Гормоны 22-05-2020', callback_data: 'gor1' },
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

    })

})

bot.action('user', (ctx) => {
    let infoMessage = `Вся суть этого бота в том, что он хранит в себе данные анализов и количество таблеток которые Даня выпил на протяжении, но ты можешь прочитать рандомный факт х)`;
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

    })
})
let factStore = [];

bot.action('fact', ctx => {
    let maxRow = factStore.filter(item => {
        return (item.row == '1' && item.col == '2');
    })[0].val;

    let k = Math.floor(Math.random() * maxRow) + 1;
    let fact = factStore.filter(item => {
        return (item.row == k && item.col == '5');
    })[0];
    let message = `${fact.val}`

    ctx.reply(message)
})

bot.command('update', async ctx => {
    try {
        await getData();
        ctx.reply('updated')
    } catch (err) {
        console.log(err)
        ctx.reply('ERROR')
    }
})

bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
})

for (let i = 1; i <= 4; i++) {
    let date = '22-05-20';

    bot.action(`gor${i}`, ctx => {
        bot.telegram.sendPhoto(ctx.chat.id, {
            source: `analyzes/gor${date}.jpg`
        })
    });
    if (i === 2) {
        date = '01-04-2020';
    }
    if (i === 3) {
        date = '30-10-2019';
    }
    if (i === 4) {
        date = '29-08-2019';
    }
}

async function getData() {
    try {
        let res = await axios('https://spreadsheets.google.com/feeds/cells/1JBUpCCPwOpUOFyPCmeqhUZmbvDoTc_Hytb52RRv_vhE/1/public/full?alt=json');
        let data = res.data.feed.entry;
        factStore = [];
        data.forEach(item => {
            factStore.push({
                row: item.gs$cell.row,
                col: item.gs$cell.col,
                val: item.gs$cell.inputValue,
            })
        })
    } catch (err) {
        console.log(err);
        throw new Error;

    }

}


// bot.command('/info', (ctx) => {
//     ctx.reply('123')
// });


bot.telegram.setWebhook(`/bot${'1145790511:AAFx6ggzoezwJBr7WJ4DLGSGsEkmhM00DK4'}`);
bot.startWebhook(null, process.env.PORT)



bot.launch();
