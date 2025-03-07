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

const rpcUrl = "http://localhost:8000/soroban/rpc";
const horizonUrl = "http://localhost:8000";

// Get the access token from environment variables
const accessToken = process.env.ACCESS_TOKEN;

if (!accessToken) {
  console.error("Access token is required");
  process.exit(1);
}

(async () => {
  // Initialize the servers
  const RpcServer = new StellarRpc.Server(rpcUrl, { allowHttp: true });
  const horizonServer = new Horizon.Server(horizonUrl, { allowHttp: true });

  // is RPC running fine ?
  console.log(await RpcServer.getHealth());

  // Last block (ledger)
  const ledger = await RpcServer.getLatestLedger();
  console.log("ledger:", ledger);

  // Generate a new keypair for transaction authorization.
  const keypair = Keypair.random();

  // Fund the account
  await fetch(`http://localhost:8000/friendbot?addr=${keypair.publicKey()}`).then(
    () => {
      console.log(`funded account: ${keypair.publicKey()}`);
    },
  );

  // Get the balance of a public key
  const account = await RpcServer.getAccount(keypair.publicKey());

  // Create a transaction
  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: (await RpcServer.getNetwork()).passphrase,
  })
    .addOperation(Operation.payment({
      destination: keypair.publicKey(),
      asset: Asset.native(),
      amount: "1",
    }))
    .setTimeout(30)
    .build();

  //Sign the transaction with keypair
  const signedTransaction = keypair.signDecorated(transaction.hash());

  console.log("Signed transaction with keypair:", signedTransaction.toXDR('base64'));

  transaction.addDecoratedSignature(signedTransaction);

  console.log(transaction.toEnvelope().toXDR('base64'));

  const response = await RpcServer.sendTransaction(transaction);

  console.log(response);
})();