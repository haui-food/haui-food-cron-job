const amqp = require('amqplib');

const { env } = require('../config');

class RabbitMQClient {
  constructor() {
    this.queueURL = env.rabbitmqURI;
    this.connection = null;
    this.channel = null;
  }

  async establishConnection() {
    if (!this.connection) {
      this.connection = await amqp.connect(this.queueURL);
      this.channel = await this.connection.createChannel();
    }
  }

  async sendQueue(queueName, data) {
    try {
      await this.establishConnection();
      await this.channel.assertQueue(queueName, { durable: true });

      this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
    } catch (error) {
      logger.error(error);
    }
  }
}

const rabbitmqService = new RabbitMQClient();

module.exports = rabbitmqService;
