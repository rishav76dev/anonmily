import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('pass123', 10)

  // Create a user
  const user = await prisma.user.create({
    data: {
      username: 'rishavraj',
      email: 'rishav@example.com',
      password: hashedPassword,
      slug: 'rishavraj',
      bio: 'I build cool stuff.',
      image: 'https://example.com/avatar.jpg',
      messages: {
        create: [
          { question: 'What inspired you to start coding?' },
          { question: 'Which tech stack are you most comfortable with?' },
          { question: 'How do you handle burnout?' },
          { question: 'Favorite project you’ve worked on?' },
          { question: 'Tips for junior devs?' },
          { question: 'What’s your daily routine like?' },
        ]
      }
    }
  })

  console.log('User and questions seeded:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
