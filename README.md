## Useful Links and Tools

| Tool or Link                       | URL                              |
| ---------------------------------- | -------------------------------- |
| Running Kafka on Windows WSL2      | https://www.confluent.io/blog/set-up-and-run-kafka-on-windows-linux-wsl-2/ |
| Kafka Programming for .NET Core 6  | https://developer.confluent.io/get-started/dotnet/#prerequisites |
| Connecting to WSL2 Kafka from Windows side (127.0.0.1 fix) | https://stackoverflow.com/questions/64177422/unable-to-produce-to-kafka-topic-that-is-running-on-wsl-2-from-windows |
| kafkaJS Tutorial                    | https://www.confluent.io/blog/getting-started-with-kafkajs/ |
| WSL2 Based Networking Issues        | https://stackoverflow.com/questions/64177422/unable-to-produce-to-kafka-topic-that-is-running-on-wsl-2-from-windows/65553634 |
|                                     | https://github.com/microsoft/WSL/issues/4851 |
| NVM Installation on WSL Linux       | https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl |
| Install dotnet on WSL2              | https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu |



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

### Running C# Producer and Consumers against WSL2

In a new bash terminal run the following:

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

Keep in mind that these apps can connect on the windows side because of C# compatibility with connecting to WSL listening ports via the `[::1]` ethernet loopback address. <b>Node.js apps on the WINDOWS side do not seem to be able to do the same translation and cannot connect. See the below section for node.js instructions.</b>

## The Crazy Process to Get Node.js apps, WSL Listeners, and VSCode to place nice together on a <b>NON LOCKED DOWN NOTEBOOK</b>

Node.js <b>running on the windows side of a Windows 10 installation</b> do not seem to be able to do the same type of network address translation that C# apps do so that `[::1]` translates into an address and port that can connect to ports of apps running on the WSL2 side. Every attempt to connect (even going through and attempting to bind to all public IP addresses on the windows side via the code of `ip-addresses.js`) has not worked. Therefore I went the route of <b>Running VSCode from the WSL2 side.

1) Install Remote Development plugin for VS Code.
2) Follow install procedure to install nvm and latest LTS version of node in WSL as outlined in a link above.
3) Follow install procedure to install dotnet SDK and runtime in WSL as outlined in a link above.
4) Navigate to folder in WSL2 command line for workspace, ex. my root is c:\dev\[etc] so I got to /mnt/c/dev/[etc].
5) Type `code .`, this will potentially install a VS Code update and then open VSCode in [WSL: Ubuntu] mode (or whatever your linux flavor is).
6) Once open, the standard termina is Ubuntu bash, and running in debug mode debugs the app on the Linux side rather than the windows side.
7) Change any settings from [::1] to 127.0.0.1 and you can now run and debug both node and dotnet apps in the WSL2 side.



