const kafka = require('./libs/kafka');

const admin = kafka.admin();


const main = async () => {
  const topic = process.env.TOPIC ? process.env.TOPIC : 'purchase';
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic }],
    waitForLeaders: true,
  });
}


main().catch(error => {
  console.error(error);
  process.exit(1);
});