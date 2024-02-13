-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "tagNumber" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_deviceId_key" ON "Tag"("deviceId");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
