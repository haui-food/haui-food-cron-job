const mongoDbConfig = {
  database: process.env.DATABASE_NAME,
  type: process.env.DATABASE_MONGO_TYPE,
  host: process.env.DATABASE_MONGO_HOST,
  username: process.env.DATABASE_MONGO_USERNAME,
  password: process.env.DATABASE_MONGO_PASSWORD,
  port: parseInt(process.env.DATABASE_MONGO_PORT),
  authSource: process.env.DATABASE_AUTH_SOURCE || 'admin',
};

const { type, host, port, username, password, database, authSource } = mongoDbConfig;

let uri = '';

if (type === 'cloud') {
  uri = `mongodb+srv://${username}:${password}@${host}/${database}?authSource=${authSource}`;
} else {
  uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`;
}

module.exports = {
  uri,
};
