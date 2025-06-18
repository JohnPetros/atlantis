import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSQL({
  url: 'libsql://atlantis-johnpetros.aws-us-east-1.turso.io',
  authToken:
    'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiJkMTBiZTVjNi02NDhhLTQ3YzAtOTZiMi1kYmUwMTgyMjI2ZDkiLCJpYXQiOjE3NTAyNTEwODYsInJpZCI6Ijg5YTllNzdjLWJmNzYtNDBlYy1iMmE1LTQ3OWU3YzhhZjgwOCJ9.hQDKLtix2r_eZvWUe-p77o9luhrVKc7z0XmLyoeedwjuDiOuJ475OxjKgw6QdGY6yi3e97t9jOAPuNadaOSjBw',
})

const prisma = new PrismaClient({ adapter })

export { prisma }
