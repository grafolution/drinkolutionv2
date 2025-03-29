// lib/kafka.ts
import { Kafka } from 'kafkajs';

/*
// Kafka-Client-Konfiguration
const kafka = new Kafka({
  clientId: 'drinkolutionv2',
  brokers: [process.env.KAFKA_BROKER || ''],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_API_KEY || '',
    password: process.env.KAFKA_API_SECRET || '',
  },
});

// Exportiere eine Funktion, die ein Event sendet
export async function sendKafkaEvent(topic: string, payload: any) {
  const producer = kafka.producer();
  try {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        { value: JSON.stringify(payload) },
      ],
    });
  } finally {
    await producer.disconnect();
  }
}
*/