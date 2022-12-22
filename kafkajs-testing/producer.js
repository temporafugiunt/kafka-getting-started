const kafka = require('./libs/kafka')
const producer = kafka.producer()

const main = async () => {
  
  const users = [ "jeby", "dklien", "tjackson", "wmohammed", "tjackson", "jhillmann" ];
  const items = [ "book", "alarm clock", "t-shirts", "gift card", "batteries" ];

  await producer.connect();

  let numProduced = 0;
  const numMessages = 10;
  const topic = process.env.TOPIC ? process.env.TOPIC : 'purchases';
  for (let inc = 0; inc < numMessages; inc++) {
    const user = users[Math.floor(Math.random() * 6)];
    const item = items[Math.floor(Math.random() * 5)];
    try {
      const responses = await producer.send({
        topic,
        messages: [{
          key: user,
          value: item
        }]
      });
      if (responses[0].errorCode) {
        console.log(`Failed to deliver message, error code: ${responses[0].errorCode}`);
      }
      else {
        console.log(`Produced event to topic ${topic}: key = ${user} value = ${item}`);
        numProduced += 1;
      }
  
    } catch (error) {
      console.error('Error publishing message', error)
    }
  }
  console.log(`${numProduced} messages were produced to topic ${topic}`);
  producer.disconnect();
  process.exit(0);
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
