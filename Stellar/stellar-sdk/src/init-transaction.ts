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
    StrKey,
  } from "@stellar/stellar-sdk";
import { copyFileSync } from "fs";
import { argv } from "process";

const rpcUrl = process.env.RPC_URL || "http://localhost:8000/soroban/rpc";
const friendbotUrl = process.env.FRIENDBOT_URL || "http://localhost:8000/friendbot";
const hexPublicKey = argv[2];

(async () => {
  // Initialize the servers
  const RpcServer = new StellarRpc.Server(rpcUrl, { allowHttp: true });

  // Remove the '0x' prefix and convert hex to buffer
  const publicKeyBuffer = Buffer.from(hexPublicKey, 'hex');

  // Convert buffer to base32-encoded string
  const publicKeyBase32 = StrKey.encodeEd25519PublicKey(publicKeyBuffer);

  // Create Keypair from public key
  const keypair = Keypair.fromPublicKey(publicKeyBase32);

  console.log("Imported Keypair Public Key:", keypair.publicKey());

  // Fund the account
  await fetch(`${friendbotUrl}?addr=${keypair.publicKey()}`).then(
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
    .setTimeout(86400)
    .build();

  console.log("Transaction XDR:", transaction.toXDR());
  const transactionHash = new Uint8Array(transaction.hash().toJSON().data);
  console.log("Transaction hash:", transactionHash);

  // Convert Uint8Array to hex string
  const transactionHashHex = Buffer.from(transactionHash).toString('hex');
  console.log("Transaction hash (hex):", transactionHashHex);
})();