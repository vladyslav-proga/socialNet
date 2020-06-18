'use strict';

const axios = require('axios');


//генерация выплёвывания рандомных фактов
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

module.exports = {
    getFact,
};
