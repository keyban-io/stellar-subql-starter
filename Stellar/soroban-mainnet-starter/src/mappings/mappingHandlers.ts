import {
  SorobanEvent
} from "@subql/types-stellar";


export async function handleEvent(event: SorobanEvent): Promise<void> {
  logger.info(
    `New deployed event found at block ${event.ledger!.sequence.toString()}`,
  );

  // Get data from the event
  // The transfer event has the following payload \[env, from, to\]
  // logger.info(JSON.stringify(event));
  const {
    topic: [env, from, to],
  } = event;

  logger.info(event.id);
  logger.info(event.txHash);
}
