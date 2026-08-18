import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.note.deleteMany();
  await prisma.folder.deleteMany();

  await prisma.folder.create({
    data: {
      name: 'Work',
      notes: {
        create: [{ text: 'Q3 planning kickoff' }],
      },
      children: {
        create: [
          {
            name: 'Projects 1',
            notes: {
              create: [{ text: 'Define project scope' }],
            },
            children: {
              create: [
                {
                  name: 'Website Redesign',
                  notes: {
                    create: [
                      { text: 'Wireframes v1 due Friday' },
                      { text: 'Client feedback: prefers blue palette' },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'Meetings',
            notes: {
              create: [{ text: 'Standup notes 2026-08-04' }],
            },
          },
        ],
      },
    },
  });

  await prisma.folder.create({
    data: {
      name: 'Personal',
      notes: {
        create: [{ text: 'Grocery list' }],
      },
      children: {
        create: [
          {
            name: 'Recipes',
            notes: {
              create: [
                { text: 'Pasta carbonara recipe' },
                { text: 'Sourdough starter feeding schedule' },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.folder.create({ data: { name: 'Archive' } });

  await prisma.note.createMany({
    data: [
      { text: 'Random idea: build a note-taking app' },
      { text: 'Remember to renew passport' },
    ],
  });

  const [_folderCount, _noteCount] = await Promise.all([
    prisma.folder.count(),
    prisma.note.count(),
  ]);
}

main()
  .catch((_e) => {
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
