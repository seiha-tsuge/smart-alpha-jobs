import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const hello = async (event) => {
  try {
    const result = await prisma.user.findMany();
    return {
      message: result,
      event,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await prisma.$disconnect();
  }
};

export const main = hello;