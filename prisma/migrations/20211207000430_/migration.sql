-- CreateTable
CREATE TABLE "race" (
    "id" TEXT NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "idDriver" INTEGER NOT NULL,
    "dataViagem" TIMESTAMP(3) NOT NULL,
    "HoraSolcitacao" TEXT NOT NULL,
    "horaInicial" TEXT,
    "horaFinal" TEXT,
    "pagamentoAutorizado" BOOLEAN,
    "latitudeOrigem" TEXT NOT NULL,
    "longitudeOrigem" TEXT NOT NULL,
    "latitudeFinal" TEXT NOT NULL,
    "longitudeFinal" TEXT NOT NULL,
    "avaliacaoViagem" INTEGER,
    "viagemConcluida" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "race_pkey" PRIMARY KEY ("id")
);
