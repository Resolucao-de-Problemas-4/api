-- CreateTable
CREATE TABLE "cartao" (
    "ID" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "dataValidade" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,

    CONSTRAINT "cartao_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "cartao" ADD CONSTRAINT "cartao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
