const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = "testauth@example.com";
  const password = "password123";
  
  // 1. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed:", hashedPassword);
  
  // 2. Create user
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      }
    });
    console.log("Created user:", user.email);
  } catch(e) {
    console.log("User might already exist", e.message);
  }
  
  // 3. Fetch user
  const dbUser = await prisma.user.findUnique({ where: { email } });
  console.log("Fetched user passwordHash:", dbUser.passwordHash);
  
  // 4. Compare
  const isValid = await bcrypt.compare(password, dbUser.passwordHash);
  console.log("Password valid:", isValid);
}

main().catch(console.error).finally(() => prisma.$disconnect());
