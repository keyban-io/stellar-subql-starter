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

const horizonUrl = "http://localhost:8000";

const publicKey = process.env.PUBLIC_KEY;

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