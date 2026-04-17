import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminProfile = await prisma.profile.upsert({
    where: { name: "Administrator" },
    update: {},
    create: {
      name: "Administrator",
      description: "Full access to user management"
    }
  });

  const managerProfile = await prisma.profile.upsert({
    where: { name: "Manager" },
    update: {},
    create: {
      name: "Manager",
      description: "Operational access to the backoffice"
    }
  });

  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {
      firstName: "System",
      lastName: "Admin",
      email: "admin@user-manager.local",
      profileId: adminProfile.id,
      status: "ACTIVE"
    },
    create: {
      firstName: "System",
      lastName: "Admin",
      username: "admin",
      email: "admin@user-manager.local",
      password,
      phone: "11999999999",
      profileId: adminProfile.id,
      language: "pt-BR",
      avatarColor: "3B82F6",
      status: "ACTIVE"
    }
  });

  await prisma.user.upsert({
    where: { username: "manager" },
    update: {
      firstName: "Project",
      lastName: "Manager",
      email: "manager@user-manager.local",
      profileId: managerProfile.id,
      status: "ACTIVE"
    },
    create: {
      firstName: "Project",
      lastName: "Manager",
      username: "manager",
      email: "manager@user-manager.local",
      password,
      phone: "11988888888",
      profileId: managerProfile.id,
      language: "pt-BR",
      avatarColor: "22C55E",
      status: "ACTIVE"
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });