import {
    Keypair,
    rpc as StellarRpc,
    Horizon,
    scValToNative,
    TransactionBuilder,
    BASE_FEE,
    Networks,
    Operation,
    Asset,
  } from "@stellar/stellar-sdk";
import { argv } from "process";

const horizonUrl = process.env.HORIZON_URL || "http://localhost:8000";
const publicKey = argv[2];

if (!publicKey) {
  console.error("Public Key is required");
  process.exit(1);
}

(async () => {
  const horizonServer = new Horizon.Server(horizonUrl, { allowHttp: true });
  
  horizonServer.loadAccount(publicKey).then((account) => {
    console.log("Balances for account: " + publicKey);
    account.balances.forEach((balance) => {
      console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    });
  }).catch((e) => {
    console.log("error:", e);
  });
})();