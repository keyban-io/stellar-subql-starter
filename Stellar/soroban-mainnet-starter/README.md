Install

```bash
pnpm i
```

Reset & run

```bash
docker-compose down -v && rm -fr .data && pnpm build && mkdir -p .data/postgres && pnpm dev
```
