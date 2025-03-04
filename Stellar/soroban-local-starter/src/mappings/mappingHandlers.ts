import { Account, Credit, Debit, Payment, Transfer } from "../types";
import {
  StellarOperation,
  StellarEffect,
  SorobanEvent,
} from "@subql/types-stellar";
import {
  AccountCredited,
  AccountDebited,
} from "@stellar/stellar-sdk/lib/horizon/types/effects";
import { Horizon } from "@stellar/stellar-sdk";
import { Address, xdr } from "soroban-client";

export async function handleOperation(
  op: StellarOperation<any>
): Promise<void> {
  logger.info(`Indexing operation ${op.id}, type: ${op.type}, ledger: ${op.transaction?.hash}`);
}

export async function handleEvent(event: SorobanEvent): Promise<void> {
  logger.info(
    `New transfer event found at block ${event.ledger!.sequence.toString()}`
  );
}