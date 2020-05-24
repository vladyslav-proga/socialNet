'use strict'

//сделать заполнение анализов автономно
//сделать заполнение данных про таблетки
//сделать рандомные факты
//

const Telegraf = require('telegraf');
const bot = new Telegraf('1145790511:AAFx6ggzoezwJBr7WJ4DLGSGsEkmhM00DK4');


bot.use((ctx, next) => {
    console.log(ctx.answerInlineQuery);
    if (ctx.updateSubTypes[0] == 'text') {
        bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.message.text);
    } else if (ctx.updateType == 'callback_query') {
        bot.telegram.sendMessage(-498566951, ctx.from.username + ' тыкнул кнопку');
    } else {
        bot.telegram.sendMessage(-498566951, ctx.from.username + ' написал: ' + ctx.updateSubTypes[0]);
    }
    next();
})





const sendStartMessage = ctx => {
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

bot.action('start', ctx => {
    ctx.deleteMessage();
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



// bot.use((ctx, next) => {
//     ctx.reply('Что б получить нужную информацию напиши, /info');
//     next(ctx);
// })

bot.command('/info', (ctx) => {
    ctx.reply('123')
});


bot.launch();
