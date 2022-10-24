db-init:
	deno run -A --unstable npm:prisma init

db-migrate: 
	deno run -A --unstable npm:prisma migrate dev --name todo-entity --create-only

db-generate:
	deno run -A --unstable npm:prisma generate --data-proxy

db-push:
	deno run -A --unstable npm:prisma db push

server:
	denon run --allow-env --allow-net --allow-read --allow-write src/server.ts