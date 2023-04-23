import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const survey = await prisma.survey.create({
    data: {
      name: 'Best beer in the world survey',
      description: 'Tell us which is the best beer in the world in your opinion.',
      options: {
        create: [
          { index: 0, name: 'Heineken' },
          { index: 1, name: 'Modelo Especial' },
          { index: 2, name: 'Zajecarsko' }
        ]
      }
    }
  });
  console.log('Created survey:', survey);
}

seed()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
