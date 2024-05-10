const RENDER_API = 'https://api.render.com/v1/services';

const RENDER_SERVICE_ACTION = {
  DEPLOY: 'deploy',
  RESUME: 'resume',
  SUSPEND: 'suspend',
  RESTART: 'restart',
};

const TIME_ZONE = 'Asia/Ho_Chi_Minh';

module.exports = {
  TIME_ZONE,
  RENDER_API,
  RENDER_SERVICE_ACTION,
};
