import {
    Keypair,
    rpc as StellarRpc,
    scValToNative,
    TransactionBuilder,
    BASE_FEE,
    Networks,
    Operation,
  } from "@stellar/stellar-sdk";

const rpcUrl = "http://localhost:8000/soroban/rpc";

(async () => {
  // Initialize the rpcServer
  const RpcServer = new StellarRpc.Server(rpcUrl, { allowHttp: true });

  // is RPC running fine ?
  console.log(await RpcServer.getHealth());

  // Last block (ledger)
  const ledger = await RpcServer.getLatestLedger();
  console.log("ledger:", ledger);

  // Generate a new keypair for transaction authorization.
  const keypair = Keypair.random();
  const secret = keypair.secret();
  const publicKey = keypair.publicKey();
  console.log("publicKey:", publicKey);

  // Fund the account
  await fetch(`http://localhost:8000/friendbot?addr=${publicKey}`).then(
    (res) => {
      console.log(`funded account: ${publicKey}`);
    },
  );

  // Load the account (getting the sequence number for the account and making an account object.)
  RpcServer.getAccount(publicKey).then((account) => {
    console.log("accountId:", account.accountId());
    console.log("sequence:", account.sequenceNumber());
  }).catch((e) => {
    console.log("error:", e);
  });
})();