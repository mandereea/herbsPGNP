-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('EARLY_MORNING', 'MORNING', 'MID_DAY', 'AFTERNOON', 'EVENING', 'MID_NIGHT');

-- CreateEnum
CREATE TYPE "Taste" AS ENUM ('SPICY', 'SALTY', 'SOUR', 'BITTER', 'SWEET');

-- CreateTable
CREATE TABLE "Organ" (
    "id" SERIAL NOT NULL,
    "viscera" TEXT NOT NULL,
    "partner" TEXT NOT NULL,
    "senseOrgan" TEXT NOT NULL,
    "tissue" TEXT NOT NULL,

    CONSTRAINT "Organ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "environmentalFactor" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "time" "TimeOfDay" NOT NULL,
    "taste" "Taste" NOT NULL,
    "color" TEXT NOT NULL,
    "sound" TEXT NOT NULL,
    "emotion" TEXT NOT NULL,
    "organId" INTEGER NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Element_organId_key" ON "Element"("organId");

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_organId_fkey" FOREIGN KEY ("organId") REFERENCES "Organ"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
