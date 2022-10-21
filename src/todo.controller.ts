import { Prisma } from "../generated/client/deno/edge.ts";
import type { RouterContext } from "./deps.ts";
import { prisma } from "./server.ts";
import type { CreateTodoInput, UpdateTodoInput } from "./todo.schema.ts";

const createTodoController = async ({
  request,
  response,
}: RouterContext<string>) => {
  try {
    const { title, category, content, published }: CreateTodoInput =
      await request.body().value;

    const todo = await prisma.todo.create({
      data: { title, content, category, published },
    });

    response.status = 201;
    response.body = {
      status: "success",
      todo,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        response.status = 409;
        response.body = {
          status: "error",
          message: "Todo with that title already exists",
        };
        return;
      }
    }
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

const updateTodoController = async ({
  params,
  request,
  response,
}: RouterContext<string>) => {
  try {
    const payload: UpdateTodoInput["body"] = await request.body().value;

    const updatedTodo = await prisma.todo.update({
      where: { id: params.todoId },
      data: payload,
    });

    response.status = 200;
    response.body = {
      status: "success",
      todo: updatedTodo,
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

const findTodoController = async ({
  params,
  response,
}: RouterContext<string>) => {
  try {
    const todo = await prisma.todo.findFirst({ where: { id: params.todoId } });

    if (!todo) {
      response.status = 404;
      response.body = {
        status: "success",
        message: "No todo with that Id exists",
      };
      return;
    }

    response.status = 200;
    response.body = {
      status: "success",
      todo,
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

const findAllTodosController = async ({
  request,
  response,
}: RouterContext<string>) => {
  try {
    const page = request.url.searchParams.get("page");
    const limit = request.url.searchParams.get("limit");
    const intPage = page ? parseInt(page) : 1;
    const intLimit = limit ? parseInt(limit) : 10;
    const skip = (intPage - 1) * intLimit;

    const todos = await prisma.todo.findMany({ skip, take: intLimit });

    response.status = 200;
    response.body = {
      status: "success",
      results: todos.length,
      todos,
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

const deleteTodoController = async ({
  params,
  response,
}: RouterContext<string>) => {
  try {
    const todo = await prisma.todo.delete({ where: { id: params.todoId } });

    if (!todo) {
      response.status = 404;
      response.body = {
        status: "success",
        message: "No todo with that Id exists",
      };
      return;
    }

    response.status = 204;
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

export default {
  createTodoController,
  updateTodoController,
  findTodoController,
  findAllTodosController,
  deleteTodoController,
};
