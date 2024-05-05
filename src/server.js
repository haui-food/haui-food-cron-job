const cron = require('node-cron');
const express = require('express');
const mongoose = require('mongoose');

const { env } = require('./config');
const { logService, databaseService, dailyAccessService } = require('./services');

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
    cron.schedule('0 */6 * * *', databaseService.backupDatabase);
  })
  .then(() => {
    cron.schedule('*/5 * * * *', dailyAccessService.updateCount);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

app.get('/health-check', (req, res) => res.send({ code: 200, message: 'OK' }));

app.all('*', (req, res) => res.send({ code: 404, message: 'Not found' }));

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
