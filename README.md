## Useful Links and Tools

| Tool or Link                       | URL                              |
| ---------------------------------- | -------------------------------- |
| Running Kafka on Windows WSL2      | https://www.confluent.io/blog/set-up-and-run-kafka-on-windows-linux-wsl-2/ |
| Kafka Programming for .NET Core 6  | https://developer.confluent.io/get-started/dotnet/#prerequisites |
| Connecting to WSL2 Kafka from Windows side (127.0.0.1 fix) | https://stackoverflow.com/questions/64177422/unable-to-produce-to-kafka-topic-that-is-running-on-wsl-2-from-windows |


## Setup Commands

All of these Ops should be done in a WSL Terminal in VSCode

### Terminal One (Zookeeper)

```sh
cd kafka
cd kafka_2.13-3.3.1
bin/zookeeper-server-start.sh config/zookeeper.properties
```

### Terminal Two (First/Only Kafka Broker)

```sh
cd kafka
cd kafka_2.13-3.3.1
bin/kafka-server-start.sh config/server.properties
```

Any other broker setup would need a different server.properties file with at least a different `broker.id` and `log.dirs` settings.

### Local Topic Setup

Terminal 3 in WSL should be opened for running commands. A new topic can be created by the following command:

```sh
bin/kafka-topics.sh --create --topic [TOPIC-NAME] --bootstrap-server [::1]:9092
```

For this tutorial we have created the purchases topic.

### Running Producer and Consumers

In a new bash or WSL terminal run the following:

```sh
cd producer
dotnet run $(pwd)/../bootstrap-local.properties
```

In a new bash or WSL terminal run the following:

```sh
cd consumer
dotnet run $(pwd)/../bootstrap-local.properties
```

Both apps also can be run in VSCode debugging via their launch.json settings.

