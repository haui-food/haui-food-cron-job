const cron = require('node-cron');
const mongoose = require('mongoose');

const { env } = require('./config');
const { logService, databaseService } = require('./services');

mongoose
  .connect(env.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .then(() => {
    cron.schedule('*/1 * * * *', logService.sendLogs);
  })
  .then(() => {
    cron.schedule('0 */6 * * *', databaseService.backupDatabase);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
