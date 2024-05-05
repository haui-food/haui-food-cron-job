const parseArrayToObjects = (listServiceString = '') => {
  return listServiceString.split(',').map((str) => {
    const [idService, apiKeyService] = str.split('|');
    return { idService, apiKeyService };
  });
};

module.exports = parseArrayToObjects;

// '1|2,3|4,5|6'
// [
//   { idService: '1', apiKeyService: '2' },
//   { idService: '3', apiKeyService: '4' },
//   { idService: '5', apiKeyService: '6' }
// ]
