import { createRoute, z } from "@hono/zod-openapi"

const errorResponseSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
  }),
})

const reviewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  company: z.string().nullable().optional(),
  rating: z.number().int().min(1).max(5),
  title: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  createdAt: z.string(),
})

export const listReviewsSchema = createRoute({
  method: "get",
  path: "/reviews",
  tags: ["Site"],
  summary: "List boilerplate reviews",
  request: {
    query: z.object({
      limit: z.coerce.number().int().min(1).max(50).optional().default(12),
    }),
  },
  responses: {
    200: {
      description: "Reviews list",
      content: {
        "application/json": {
          schema: z.object({
            data: z.object({
              items: z.array(reviewSchema),
              total: z.number().int(),
              averageRating: z.number().min(0).max(5),
            }),
          }),
        },
      },
    },
  },
})

export const createReviewSchema = createRoute({
  method: "post",
  path: "/reviews",
  tags: ["Site"],
  summary: "Create a new boilerplate review",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string().min(2).max(120),
            company: z.string().min(2).max(120).optional(),
            rating: z.number().int().min(1).max(5),
            title: z.string().min(2).max(120).optional(),
            message: z.string().min(2).max(2000).optional(),
            // Simple anti-bot honeypot (must be empty)
            website: z.string().max(0).optional(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Created review",
      content: {
        "application/json": {
          schema: z.object({
            data: reviewSchema,
          }),
        },
      },
    },
    400: {
      description: "Invalid request",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
    500: {
      description: "Unexpected error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
})

