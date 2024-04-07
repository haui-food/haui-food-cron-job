const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * Nén một thư mục và tạo ra một tập tin nén.
 * @param {string} folderPath - Đường dẫn đến thư mục cần nén.
 * @param {string} zipFilePath - Đường dẫn đến tập tin nén sau khi nén.
 */
const compressFolder = (folderPath, zipFilePath) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
};

module.exports = compressFolder;
