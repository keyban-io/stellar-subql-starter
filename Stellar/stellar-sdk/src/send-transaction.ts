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
    Transaction,
  } from "@stellar/stellar-sdk";
import { argv } from "process";

const rpcUrl = process.env.RPC_URL || "http://localhost:8000/soroban/rpc";
const hexPublicKey = argv[2];
const transactionXDR = argv[3];
const signature = argv[4];

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

  // Get the balance of a public key
  const account = await RpcServer.getAccount(keypair.publicKey());

  // Convert hex signature to base64
  const signatureBuffer = Buffer.from(signature, 'hex');
  const signatureBase64 = signatureBuffer.toString('base64');

  // Create a transaction
  const transaction = new Transaction(transactionXDR, (await RpcServer.getNetwork()).passphrase);

  transaction.addSignature(keypair.publicKey(), signatureBase64);

  const response = await RpcServer.sendTransaction(transaction);

  console.log(response);
})();