const { Kafka } = require('kafkajs');
const namedAddressList = require('./ip-addresses');

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
const ssl = !!sasl

// let ethName = env.ETH_NAME ? env.ETH_NAME ? ''

// Not found in this list on the windows side.
// let localAddress = namedAddressList[Object.keys(namedAddressList)[2]];

// DOESN'T WORK IN WSL2, changes to 127.0.0.1 which is not where is it bound.
let localAddress = "localhost";

//let localAddress = "172.22.102.115";

const broker = process.env.KAFKA_BOOTSTRAP_SERVER ? process.env.KAFKA_BOOTSTRAP_SERVER : `${localAddress}:9092`;

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka({
  clientId: 'kafka-js-producer',
  brokers: [ broker ],
  ssl,
  sasl
});

module.exports = kafka;