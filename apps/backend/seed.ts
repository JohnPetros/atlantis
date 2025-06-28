import { prisma } from './src/database/prisma'
import { accommodationsRepository } from './src/database/repositories'

async function seed() {
  await accommodationsRepository.seed()
}

seed()
  .then(() => console.log('Database seeded successfully'))
  .catch((error) => console.error(`Error during seeding: ${error}`))
  .finally(() => prisma.$disconnect())
