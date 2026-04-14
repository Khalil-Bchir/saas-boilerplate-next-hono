import type { PrismaClient } from "@repo/database"

export class SiteService {
  prisma: PrismaClient

  constructor(options: { prisma: PrismaClient }) {
    this.prisma = options.prisma
  }

  async createReview(payload: {
    name: string
    company?: string
    rating: number
    title?: string
    message?: string
  }) {
    return this.prisma.boilerplateReview.create({
      data: {
        name: payload.name,
        company: payload.company,
        rating: payload.rating,
        title: payload.title,
        message: payload.message,
      },
      select: {
        id: true,
        name: true,
        company: true,
        rating: true,
        title: true,
        message: true,
        createdAt: true,
      },
    })
  }

  async listReviews(payload: { limit: number }) {
    const [items, total, avg] = await Promise.all([
      this.prisma.boilerplateReview.findMany({
        orderBy: { createdAt: "desc" },
        take: payload.limit,
        select: {
          id: true,
          name: true,
          company: true,
          rating: true,
          title: true,
          message: true,
          createdAt: true,
        },
      }),
      this.prisma.boilerplateReview.count(),
      this.prisma.boilerplateReview.aggregate({
        _avg: { rating: true },
      }),
    ])

    return {
      items,
      total,
      averageRating: avg._avg.rating ?? 0,
    }
  }
}

