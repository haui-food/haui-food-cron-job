const cron = require('node-cron');
const express = require('express');
const mongoose = require('mongoose');

const { env } = require('./config');
const { logService, databaseService, dailyAccessService, userService, renderService } = require('./services');

const app = express();

mongoose
  .connect(env.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .then(() => {
    cron.schedule('*/1 * * * *', logService.sendLogs);
  })
  .then(() => {
    cron.schedule('0 9 * * *', userService.autoBirthday);
  })
  .then(() => {
    cron.schedule('0 4 * * *', renderService.restartServices);
  })
  .then(() => {
    cron.schedule('*/5 * * * *', dailyAccessService.updateCount);
  })
  .then(() => {
    cron.schedule('0 */6 * * *', databaseService.backupDatabase);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

app.get('/health-check', (req, res) => res.send({ code: 200, message: 'OK' }));

app.all('*', (req, res) => res.send({ code: 404, message: 'Not found' }));

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
