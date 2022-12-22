const kafka = require('./libs/kafka')

const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID ? process.env.GROUP_ID : 'kafka-js-getting-started',
});

const main = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.TOPIC ? process.env.TOPIC : 'purchases',  
    fromBeginning: true
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // console.log('Received message', {
      //   topic,
      //   partition,
      //   key: message.key.toString(),
      //   value: message.value.toString()
      // });
      console.log(`Consumed event from topic ${topic} with key ${message.key} and value ${message.value}`);
    }
  });
}

main().catch(error => {
  console.error(`Application Error: ${error.message}`, error);
})

const errorTypes = ['unhandledRejection', 'uncaughtException'];
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

errorTypes.forEach(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await consumer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  })
})

signalTraps.forEach(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  })
})
