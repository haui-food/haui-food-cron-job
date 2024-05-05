const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const { env } = require('../config');
const sleep = require('../utils/sleep');
const telegramService = require('./telegram.service');
const compressFolder = require('../utils/compressFolder');

const exportDatabase = async (outputFolder) => {
  try {
    console.log('Exporting database...');

    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      const collectionName = collection.collectionName;

      const Model = mongoose.model(collectionName, new mongoose.Schema({}));

      const data = await Model.find({});

      const jsonData = JSON.stringify(data, null, 2);

      fs.writeFileSync(`${outputFolder}/${collectionName}.json`, jsonData);

      console.log(`Data exported to ${collectionName}.json`);

      await sleep(1000);

      console.log('Sleeping for 1 second...');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const backupDatabase = async () => {
  const { backupChatId } = env.telegram;

  const outputFolder = path.join(__dirname, '../../database');
  const zipFilePath = outputFolder + `.zip`;

  await exportDatabase(outputFolder);

  await compressFolder(outputFolder, zipFilePath);

  await telegramService.sendFile(zipFilePath, backupChatId);

  fs.unlink(zipFilePath, (err) => {
    if (err) {
      console.error('Error deleting zip file:', err);
    } else {
      console.log('Zip file deleted successfully');
    }
  });
};

module.exports = { backupDatabase };
