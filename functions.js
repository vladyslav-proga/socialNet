'use strict';

const axios = require('axios');

//генерация выплёвывания рандомных фактов
const getFact = async () => {
  const json = await axios(process.env.GOOGLE_SHEET); const data = json.data.feed.entry;
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

module.exports = {
  getFact,
  getDose,
};
