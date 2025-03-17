const { PrismaClient } = require('@prisma/client')
const rawData = require('../prisma/MOCK_DATA.json')
const prisma = new PrismaClient()
async function main() {
  const userId = 'user_2tdC7TWok9VThdh57Zz0Nu3GWw8'

  const refineData = rawData.map((data) => {
    return { ...data, clerkId: userId }
  })

  for (const data of refineData) {
    await prisma.job.create({ data })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  })
