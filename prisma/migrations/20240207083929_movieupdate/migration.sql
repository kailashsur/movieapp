-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(191) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "profile_img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "banner" TEXT NOT NULL,
    "title" TEXT,
    "genre" TEXT NOT NULL,
    "duration" VARCHAR(50) NOT NULL,
    "release" VARCHAR(50) NOT NULL,
    "language" VARCHAR(50) NOT NULL,
    "cast" VARCHAR(50) NOT NULL,
    "size" VARCHAR(50) NOT NULL,
    "moviestory" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
