const currentTime = () => {
  return new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
};

module.exports = currentTime;
