-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "guestName" TEXT,
    "checkOut" DATETIME,
    "price" REAL NOT NULL DEFAULT 89,
    "image" TEXT,
    "description" TEXT
);
INSERT INTO "new_Room" ("checkOut", "floor", "guestName", "id", "roomNumber", "status", "type") SELECT "checkOut", "floor", "guestName", "id", "roomNumber", "status", "type" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_roomNumber_key" ON "Room"("roomNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
