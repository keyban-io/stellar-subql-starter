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

`--unfinalized-blocks` don't work because of this `parseInt(hash, 10)`, see [discussion](https://keyban.slack.com/archives/C087Y2Z9P7T/p1741087024283799)

```bash
@mainThreadOnly()
protected async getHeaderForHash(hash: string): Promise<Header> {
    return this.getHeaderForHeight(parseInt(hash, 10));
}
```

Hack to be able to use http with soroban until this [PR](https://github.com/subquery/subql-stellar/pull/109) is merged

```bash
class SorobanServer extends stellar_sdk_1.rpc.Server {
    constructor(serverURL, opts) {
        super(serverURL, { ...opts, allowHttp: true });
    }
```

## Signature

secp256k1
https://docs.rs/soroban-sdk/latest/soroban_sdk/crypto/struct.Crypto.html#method.secp256k1_recover
https://github.com/kalepail/soroban-passkey/blob/main/src/lib/vote_send.ts#L6

AA
https://developers.stellar.org/docs/learn/encyclopedia/security/authorization#account-abstraction

secp256r1
https://github.com/kalepail/soroban-passkey/blob/main/contracts/contract-webauthn-secp256r1/src/lib.rs
https://github.com/stellar/rs-soroban-env/issues/684
