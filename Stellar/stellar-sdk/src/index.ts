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
  // Generate a new keypair for transaction authorization.
  const keypair = Keypair.random();
  const secret = keypair.secret();
  const publicKey = keypair.publicKey();
  console.log("publicKey:", publicKey);

//   await fetch(`https://friendbot-testnet.stellar.org/?addr=${publicKey}`).then(
//     (res) => {
//       console.log(`funded account: ${publicKey}`);
//     },
//   );

  // Initialize the rpcServer
  const RpcServer = new StellarRpc.Server(rpcUrl, { allowHttp: true });

  console.log(await RpcServer.getHealth());

  // Load the account (getting the sequence number for the account and making an account object.)
  //const account = await RpcServer.getAccount(publicKey);
  const ledger = await RpcServer.getLatestLedger();
  console.log("ledger:", ledger);
})();