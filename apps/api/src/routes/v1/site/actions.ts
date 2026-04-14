import { OpenAPIHono } from "@hono/zod-openapi"
import { HTTPException } from "hono/http-exception"
import type { AutoLoadRoute } from "hono-autoload/types"
import type { Env } from "../../../types/index.js"
import { SiteService } from "../../../services/site.js"
import { createReviewSchema, listReviewsSchema } from "../../../schema/v1/site.schema.js"

const handler = new OpenAPIHono<Env>()

handler.openapi(listReviewsSchema, async (c) => {
  const prisma = c.get("prisma")
  const query = c.req.valid("query")

  const service = new SiteService({ prisma })
  const result = await service.listReviews({ limit: query.limit })

  return c.json(
    {
      data: {
        items: result.items.map((r: (typeof result.items)[number]) => ({
          ...r,
          company: r.company ?? null,
          title: r.title ?? null,
          message: r.message ?? null,
          createdAt: r.createdAt.toISOString(),
        })),
        total: result.total,
        averageRating: result.averageRating,
      },
    },
    200,
  )
})

handler.openapi(createReviewSchema, async (c) => {
  const prisma = c.get("prisma")
  const payload = c.req.valid("json")

  // Honeypot for basic bot protection
  if (payload.website) {
    throw new HTTPException(400, { message: "Invalid request" })
  }

  try {
    const service = new SiteService({ prisma })
    const created = await service.createReview({
      name: payload.name,
      company: payload.company,
      rating: payload.rating,
      title: payload.title,
      message: payload.message,
    })

    return c.json(
      {
        data: {
          ...created,
          company: created.company ?? null,
          title: created.title ?? null,
          message: created.message ?? null,
          createdAt: created.createdAt.toISOString(),
        },
      },
      201,
    )
  } catch (err) {
    throw new HTTPException(500, {
      message: err instanceof Error ? err.message : "Internal server error",
    })
  }
})

const routeModule: AutoLoadRoute = {
  path: "/api/v1/site",
  handler: handler as unknown as AutoLoadRoute["handler"],
}

export default routeModule

