-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_pic" TEXT NOT NULL DEFAULT 'Leaves.jpg',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "anime_pic" TEXT NOT NULL DEFAULT 'Leaves.jpg',
    "avg_rank" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime_user_rank" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "rank" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "anime_pic" TEXT NOT NULL DEFAULT 'Leaves.jpg',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anime_user_rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime_user_planned" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "isPlanned" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anime_user_planned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monthly_planner" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Monthly_planner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monthly_to_do_list" (
    "id" SERIAL NOT NULL,
    "monthly_planner_id" INTEGER NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Monthly_to_do_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Daily_planner" (
    "id" SERIAL NOT NULL,
    "monthly_planner_id" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "weekday" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Daily_planner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Daily_to_do_list" (
    "id" SERIAL NOT NULL,
    "daily_planner_id" INTEGER NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Daily_to_do_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Daily_most_important" (
    "id" SERIAL NOT NULL,
    "daily_planner_id" INTEGER NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Daily_most_important_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToUser_AB_unique" ON "_AnimeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToUser_B_index" ON "_AnimeToUser"("B");

-- AddForeignKey
ALTER TABLE "Anime_user_rank" ADD CONSTRAINT "Anime_user_rank_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime_user_rank" ADD CONSTRAINT "Anime_user_rank_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime_user_planned" ADD CONSTRAINT "Anime_user_planned_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime_user_planned" ADD CONSTRAINT "Anime_user_planned_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly_planner" ADD CONSTRAINT "Monthly_planner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly_to_do_list" ADD CONSTRAINT "Monthly_to_do_list_monthly_planner_id_fkey" FOREIGN KEY ("monthly_planner_id") REFERENCES "Monthly_planner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily_planner" ADD CONSTRAINT "Daily_planner_monthly_planner_id_fkey" FOREIGN KEY ("monthly_planner_id") REFERENCES "Monthly_planner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily_to_do_list" ADD CONSTRAINT "Daily_to_do_list_daily_planner_id_fkey" FOREIGN KEY ("daily_planner_id") REFERENCES "Daily_planner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily_most_important" ADD CONSTRAINT "Daily_most_important_daily_planner_id_fkey" FOREIGN KEY ("daily_planner_id") REFERENCES "Daily_planner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUser" ADD CONSTRAINT "_AnimeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUser" ADD CONSTRAINT "_AnimeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
