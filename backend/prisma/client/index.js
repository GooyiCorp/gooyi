import { PrismaClient } from "@prisma/client";
import addressExt from "./addressExt.js";
import storeExt from "./storeExt.js";

const prisma = new PrismaClient().$extends(addressExt).$extends(storeExt);

export default prisma;

// npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma
