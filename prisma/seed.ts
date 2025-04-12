import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
  for (const member of membersData) {
    const location = member.location?.[0]; // bierzemy pierwszy obiekt lokalizacji

    await prisma.user.create({
      data: {
        email: member.email,
        passwordHash: await hash("password", 10),
        hotelOwner: {
          create: {
            name: member.name,
            photos: {
              create: {
                url: member.image,
              },
            },
            location: location
              ? {
                  create: {
                    city: location.city,
                    postalCode: location.postalCode,
                    street: location.street,
                    latitude: location.latitude,
                    longitude: location.longitude,
                  },
                }
              : undefined,
          },
        },
      },
    });
  }
}

async function main() {
  await seedMembers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
