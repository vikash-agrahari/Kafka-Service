import appConfig from "config/configuration";
import { KAFKA_CONSTANT } from "src/common/kafka.constant";
export const KAFKA_CONFIG = {
    TOPICS: {
        KAFKA_EVENTS: {
            topic: KAFKA_CONSTANT.KAFKA_TOPIC_PRODUCER,
            numPartitions: KAFKA_CONSTANT.KAFKA_PARTITION,
            replicationFactor: KAFKA_CONSTANT.KAFKA_REPLICATION,
        },
    },
};
export const Config = {
    KAFKA_HOST_1: "localhost",
    KAFKA_PORT_1: '9092', 
};
