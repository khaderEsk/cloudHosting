// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export default prisma;
import { PrismaClient } from "@prisma/client";

// Function to create a new Prisma Client instance
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Declare a global variable for Prisma Client
declare global {
    // eslint-disable-next-line no-var
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Initialize Prisma Client
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Export the Prisma Client instance
export default prisma;

// In development, store the Prisma Client in the global object to reuse it
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
