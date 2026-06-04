-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "fullDesc" TEXT NOT NULL,
    "image" TEXT,
    "servings" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "instructions" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "count" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fillings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "fillings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ingredients" (
    "id" SERIAL NOT NULL,
    "recipeId" TEXT NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "recipe_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filling_ingredients" (
    "id" SERIAL NOT NULL,
    "fillingId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "filling_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipeSauses" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RecipeSauses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RecipeFilling" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RecipeFilling_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_ingredients_recipeId_ingredientId_key" ON "recipe_ingredients"("recipeId", "ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "filling_ingredients_fillingId_ingredientId_key" ON "filling_ingredients"("fillingId", "ingredientId");

-- CreateIndex
CREATE INDEX "_RecipeSauses_B_index" ON "_RecipeSauses"("B");

-- CreateIndex
CREATE INDEX "_RecipeFilling_B_index" ON "_RecipeFilling"("B");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filling_ingredients" ADD CONSTRAINT "filling_ingredients_fillingId_fkey" FOREIGN KEY ("fillingId") REFERENCES "fillings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filling_ingredients" ADD CONSTRAINT "filling_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeSauses" ADD CONSTRAINT "_RecipeSauses_A_fkey" FOREIGN KEY ("A") REFERENCES "fillings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeSauses" ADD CONSTRAINT "_RecipeSauses_B_fkey" FOREIGN KEY ("B") REFERENCES "recipes"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeFilling" ADD CONSTRAINT "_RecipeFilling_A_fkey" FOREIGN KEY ("A") REFERENCES "fillings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeFilling" ADD CONSTRAINT "_RecipeFilling_B_fkey" FOREIGN KEY ("B") REFERENCES "recipes"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
