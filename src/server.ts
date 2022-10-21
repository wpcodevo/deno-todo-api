import { dotenvConfig } from "./deps.ts";
dotenvConfig({ export: true, path: ".env" });
import { PrismaClient } from "../generated/client/deno/edge.ts";
import { Application, Router } from "./deps.ts";
import type { RouterContext } from "./deps.ts";
import todoRouter from "./todo.routes.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL") as unknown as string;
export const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
});

const app = new Application();
const router = new Router();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

router.get<string>("/api/healthchecker", (ctx: RouterContext<string>) => {
  ctx.response.body = {
    status: "success",
    message: "Welcome to Deno and Prisma",
  };
});

app.use(todoRouter.prefix("/api/todos/").routes());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ port, secure }) => {
  console.log(
    `🚀 Server started on ${secure ? "https://" : "http://"}localhost:${port}`
  );
});

const port = 8000;
app.listen({ port });
