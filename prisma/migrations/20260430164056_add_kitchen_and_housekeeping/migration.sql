-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KitchenOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomNumber" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Preparing',
    "orderTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_KitchenOrder" ("id", "items", "orderTime", "roomNumber", "status") SELECT "id", "items", "orderTime", "roomNumber", "status" FROM "KitchenOrder";
DROP TABLE "KitchenOrder";
ALTER TABLE "new_KitchenOrder" RENAME TO "KitchenOrder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
