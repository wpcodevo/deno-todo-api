import { z } from "./deps.ts";

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
    category: z.string({
      required_error: "Category is required",
    }),
    published: z.boolean().optional(),
  }),
});

const params = {
  params: z.object({
    todoId: z.string(),
  }),
};

export const getTodoSchema = z.object({
  ...params,
});

export const updateTodoSchema = z.object({
  ...params,
  body: z
    .object({
      title: z.string(),
      content: z.string(),
      category: z.string(),
      published: z.boolean(),
    })
    .partial(),
});

export const deleteTodoSchema = z.object({
  ...params,
});

export type CreateTodoInput = z.TypeOf<typeof createTodoSchema>["body"];
export type GetTodoInput = z.TypeOf<typeof getTodoSchema>["params"];
export type UpdateTodoInput = z.TypeOf<typeof updateTodoSchema>;
export type DeleteTodoInput = z.TypeOf<typeof deleteTodoSchema>["params"];
