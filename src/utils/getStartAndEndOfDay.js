const moment = require('moment');

const getStartAndEndOfDay = (date = new Date()) => {
  const startOfDay = moment(date).startOf('day');

  const endOfDay = moment(date).endOf('day');

  return { startOfDay: startOfDay.toDate(), endOfDay: endOfDay.toDate() };
};

module.exports = getStartAndEndOfDay;
