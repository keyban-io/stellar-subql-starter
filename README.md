# Stellar

## SubQuery x Stellar

Run Stellar & postgres

```bash
cd Stellar/soroban-local-starter
docker-compose down -v && rm -fr .data/postgres && docker-compose up
```

Run Subql-node

```bash
DB_HOST=localhost TZ=UTC pnpm start --db-schema=app --unsafe
```

## Signature

Brace yourself

Go the dap stack and get an access token from web-app

```bash
export ACCESS_TOKEN=ey...
```

Build the EDDSA signer client

```bash
earthly ./signers/eddsa/cli-client+docker
```

Run a dkg with the signer client (and don't stop it!)

```bash
docker run -it --net=host --rm eddsa-cli-client:latest dkg $ACCESS_TOKEN
```

Copy your public key

```bash
Client public key: 21ca5e4cf9edf5ec51cca0a65f20760cd943e6d0f6f7c5937a3547b924597fdd
Server public key: 21ca5e4cf9edf5ec51cca0a65f20760cd943e6d0f6f7c5937a3547b924597fdd
DKG completed successfully!
```

And export it

```bash
export PUBLIC_KEY=21ca5e4cf9edf5ec51cca0a65f20760cd943e6d0f6f7c5937a3547b924597fdd
```

Go to `./Stellar/soroban-local-starter` and (re)start the stellar network

```bash
docker-compose down -v && rm -fr .data/postgres && docker-compose up
```

Go the `./Stellar/stellar-sdk` and initiliaze a transaction

```bash
pnpm run init-transaction $PUBLIC_KEY
```

Get the transaction XDR and hash in hex format

```bash
Transaction XDR: AAAAAgAAAAAhyl5M+e317FHMoKZfIHYM2UPm0Pb3xZN6NUe5JFl/3QAAAGQAAAAWAAAAAQAAAAEAAAAAAAAAAAAAAABnzIeUAAAAAAAAAAEAAAAAAAAAAQAAAAAhyl5M+e317FHMoKZfIHYM2UPm0Pb3xZN6NUe5JFl/3QAAAAAAAAAAAJiWgAAAAAAAAAAA
(...)
Transaction hash (hex): 1176d1264ba7443ddb8bacc3369ca44af10a10d2017206ebbe7e66c5bad76223
```

Go back to the signer client on dap and paste the hash, you will get the signature in hex format. Copy it

```bash
Hex Signature: "3ce3bbf98fbc8d765f040c7c0c197b6cbdcde0486aedb08c8912ca0330eb02fbc0e92bc35f76c3d773cbadbbe81b26e7ffaa1485a8f0132717fdae0442b3a603"
```

Send the transaction with your public key, the transaction XDR and the signature

```bash
pnpm run send-transaction $PUBLIC_KEY AAAAAgAAAAAhyl5M+e317FHMoKZfIHYM2UPm0Pb3xZN6NUe5JFl/3QAAAGQAAAAWAAAAAQAAAAEAAAAAAAAAAAAAAABnzIeUAAAAAAAAAAEAAAAAAAAAAQAAAAAhyl5M+e317FHMoKZfIHYM2UPm0Pb3xZN6NUe5JFl/3QAAAAAAAAAAAJiWgAAAAAAAAAAA 3ce3bbf98fbc8d765f040c7c0c197b6cbdcde0486aedb08c8912ca0330eb02fbc0e92bc35f76c3d773cbadbbe81b26e7ffaa1485a8f0132717fdae0442b3a603
```

You can sign on Testnet by exporting those variables

```bash
export RPC_URL=https://soroban-testnet.stellar.org
export FRIENDBOT_URL=https://friendbot.stellar.org
export HORIZON_URL=https://horizon-testnet.stellar.org
```
