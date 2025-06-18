-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "socialName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "registrationDate" DATETIME NOT NULL,
    "isHosted" BOOLEAN NOT NULL DEFAULT false,
    "parentId" TEXT,
    CONSTRAINT "customers_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "customers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "addresses_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cellphones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ddd" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "cellphones_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expeditionDate" DATETIME NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "documents_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accommodationName" TEXT NOT NULL,
    "singleBeds" INTEGER NOT NULL,
    "coupleBeds" INTEGER NOT NULL,
    "suites" INTEGER NOT NULL,
    "garages" INTEGER NOT NULL,
    "hasAirConditioning" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "hostings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accommodationId" TEXT NOT NULL,
    "accommodationName" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "hostName" TEXT NOT NULL,
    "hostDependentsCount" INTEGER NOT NULL,
    CONSTRAINT "hostings_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "hostings_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "hosting_documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostingId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    CONSTRAINT "hosting_documents_hostingId_fkey" FOREIGN KEY ("hostingId") REFERENCES "hostings" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "hosting_documents_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_customerId_key" ON "addresses"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "hosting_documents_hostingId_documentId_key" ON "hosting_documents"("hostingId", "documentId");
