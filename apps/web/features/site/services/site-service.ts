import axios from "axios"
import { ApiError } from "@/lib/api-client"

const baseURL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").replace(/\/$/, "")

function normalizeError(err: unknown): ApiError {
  if (err instanceof ApiError) return err
  if (axios.isAxiosError(err)) {
    const status = err.response?.status ?? 0
    const payload = err.response?.data
    let message: string | undefined
    if (payload && typeof payload === "object") {
      const body = payload as Record<string, unknown>
      if (typeof body?.error === "object" && body.error !== null && "message" in body.error) {
        message = (body.error as { message?: string }).message
      }
      if (!message && typeof body?.message === "string") message = body.message
    }
    return new ApiError(message ?? err.message ?? "Request failed", status, payload)
  }
  return new ApiError(err instanceof Error ? err.message : "Request failed", 0, undefined)
}

export type Review = {
  id: string
  name: string
  company: string | null
  rating: number
  title: string | null
  message: string | null
  createdAt: string
}

export async function listReviews(params?: { limit?: number }) {
  try {
    const client = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    const { data } = await client.get<{ data: { items: Review[]; total: number; averageRating: number } }>(
      "/api/v1/site/reviews",
      { params },
    )
    return data.data
  } catch (err) {
    throw normalizeError(err)
  }
}

export async function createReview(payload: {
  name: string
  company?: string
  rating: number
  title?: string
  message?: string
}) {
  try {
    const client = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    const { data } = await client.post<{ data: Review }>("/api/v1/site/reviews", {
      ...payload,
      website: "",
    })
    return data.data
  } catch (err) {
    throw normalizeError(err)
  }
}

