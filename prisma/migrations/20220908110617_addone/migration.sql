-- CreateEnum
CREATE TYPE "Temperament" AS ENUM ('COLD', 'COOL', 'NEUTRAL', 'WARM', 'HOT');

-- CreateTable
CREATE TABLE "Herb" (
    "id" SERIAL NOT NULL,
    "latin" TEXT NOT NULL,
    "ro" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "tcm" TEXT NOT NULL,
    "folk" TEXT[],
    "images" TEXT[],
    "temperament" "Temperament" NOT NULL,
    "quality" TEXT[],
    "taste" "Taste"[],
    "category" TEXT NOT NULL,
    "skills" TEXT[],
    "enemies" TEXT[],
    "dontUse" TEXT[],
    "available" BOOLEAN NOT NULL,

    CONSTRAINT "Herb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Potion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "use" TEXT[],
    "bestSeason" TEXT NOT NULL,
    "potionType" TEXT NOT NULL,
    "methodDescription" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,

    CONSTRAINT "Potion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ratio" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "isHerb" BOOLEAN NOT NULL,
    "potionId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HerbToPotion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HerbToPotion_AB_unique" ON "_HerbToPotion"("A", "B");

-- CreateIndex
CREATE INDEX "_HerbToPotion_B_index" ON "_HerbToPotion"("B");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_potionId_fkey" FOREIGN KEY ("potionId") REFERENCES "Potion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HerbToPotion" ADD CONSTRAINT "_HerbToPotion_A_fkey" FOREIGN KEY ("A") REFERENCES "Herb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HerbToPotion" ADD CONSTRAINT "_HerbToPotion_B_fkey" FOREIGN KEY ("B") REFERENCES "Potion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
