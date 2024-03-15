import { Consumer, ConsumerSubscribeTopics, ConsumerConfig } from "kafkajs";
import { KafkaManager } from "../kafka";
import { IConsumer } from "src/interfaces/kafka.interface";
import { ENUM } from "src/common/enum";
export class KafkaConsumer extends KafkaManager implements IConsumer {
  private consumer: Consumer;
  private topics: ConsumerSubscribeTopics;

  constructor(topics: ConsumerSubscribeTopics, consumerConfig: ConsumerConfig) {
    super();
    this.topics = topics;
    this.consumer = this.kafka.consumer({
      allowAutoTopicCreation: false,
      ...consumerConfig,
    });
  }

  /**
   * @description Consume Message From Topic
   * @param onMessage - Function to be executed on Message
   */
  async consumeEachMessage(
    onMessage: (key: any, value: any) => Promise<void>,
    consumerConcurrency = 1
  ) {
    await this.consumer.subscribe(this.topics);
    await this.consumer.run({
      partitionsConsumedConcurrently: consumerConcurrency || 1,
      autoCommit: true,
      eachMessage: async ({ message, partition }) => {
        try {
          const value = message.value?.toString();
          console.log("value:", value);
          if (value) {
            // Parse the message value
            const data = JSON.parse(value);
            console.log("---data is---__>",data)
            console.log("channel is",data.channel)
            if (data.channel == ENUM.CHANNEL_TYPE.EMAIL) {
              await this.processEmailPayload(data);
            }
          } else {
            console.log("No data Received");
          }
        } catch (err) {
          console.error("Kafka Error consuming message.", err);
        }
      },
    });
  }

  /**
   * @description Open Connection
   */
  async connect() {
    try {
      await this.consumer.connect();
      console.log("Consumer connected to kafka successfully.");
    } catch (err) {
      console.log("Failed to connect to Kafka.", err);
      await this.connect();
    }
  }

  /**
   * @description Close Connection
   */
  async disconnect() {
    await this.consumer.disconnect();
  }


   /**
   * @description To send the email to the user give the implemnetation according to your need
   */

  async processEmailPayload(data:any){
  }
}
