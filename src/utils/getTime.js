/**
 * Hàm trả về thời gian hiện tại theo giờ và format Việt Nam
 */
const currentTime = () => {
  return new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
};

module.exports = currentTime;
