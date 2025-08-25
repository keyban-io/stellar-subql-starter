Install

```bash
pnpm i
```

Reset & run

```bash
docker-compose down -v && rm -fr .data && pnpm build && mkdir -p .data/postgres && pnpm dev
```

With https://mainnet.sorobanrpc.com

```bash
subquery-node-1   | 2025-08-25T13:57:28.991Z <sandbox-#1> INFO New deployed event found at block 58584418 
subquery-node-1   | 2025-08-25T13:57:28.991Z <sandbox-#1> INFO 0251618159366324224-0000000000 
subquery-node-1   | 2025-08-25T13:57:28.991Z <sandbox-#1> INFO c4a457d70d50ae8d4392dc040105972a85f9296987be9f066c97d909b6a03a7d 
subquery-node-1   | 2025-08-25T13:57:32.605Z <StoreCacheService> ERROR All data sources have been processed up to block number 58584419. Exiting gracefully...
```

With https://stellar-soroban-public.nodies.app

```bash
graphql-engine-1  | 2025-08-25T14:01:42.658Z <nestjs> INFO Nest application successfully started 
subquery-node-1   | 2025-08-25T14:01:50.976Z <WorkerBlockDispatcherService> INFO 
subquery-node-1   | Host Status:
subquery-node-1   |   Total Fetching: 6
subquery-node-1   |   Awaiting process: 0
subquery-node-1   | Worker Status:
subquery-node-1   |   Worker 1 - To Fetch: 6 blocks, Fetched: 0 blocks
subquery-node-1   |  
subquery-node-1   | 2025-08-25T14:01:53.171Z <StoreCacheService> ERROR All data sources have been processed up to block number 58584419. Exiting gracefully... 
```
