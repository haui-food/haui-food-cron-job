const cron = require('node-cron');
const express = require('express');
const mongoose = require('mongoose');

const { env, mongo } = require('./config');
const { TIME_ZONE } = require('./constants');
const {
  logService,
  userService,
  orderService,
  renderService,
  databaseService,
  dailyAccessService,
} = require('./services');

const app = express();

const scheduledTasks = [
  { task: logService.sendLogs, schedule: '*/1 * * * *' },
  { task: userService.autoBirthday, schedule: '0 9 * * *' },
  { task: renderService.restartServices, schedule: '0 4 * * *' },
  { task: dailyAccessService.updateCount, schedule: '*/5 * * * *' },
  { task: databaseService.backupDatabase, schedule: '0 */6 * * *' },
  { task: orderService.getPendingBankOrders, schedule: '*/10 * * * * *' },
];

mongoose
  .connect(mongo.uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .then(() => {
    scheduledTasks.forEach(({ task, schedule }) => {
      cron.schedule(schedule, task, { scheduled: true, timezone: TIME_ZONE });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

app.get('/health-check', (req, res) => res.send({ code: 200, message: 'OK' }));

app.all('*', (req, res) => res.send({ code: 404, message: 'Not found' }));

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
