-- CreateTable
CREATE TABLE "boilerplate_reviews" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "company" VARCHAR(120),
    "rating" INTEGER NOT NULL,
    "title" VARCHAR(120),
    "message" VARCHAR(2000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boilerplate_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "boilerplate_reviews_createdAt_idx" ON "boilerplate_reviews"("createdAt");
