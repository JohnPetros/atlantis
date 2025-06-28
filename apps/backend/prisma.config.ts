import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    async adapter() {
      return new PrismaLibSQL({
        url: 'libsql://atlantis-johnpetros.aws-us-east-1.turso.io',
        authToken:
          'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiJkMTBiZTVjNi02NDhhLTQ3YzAtOTZiMi1kYmUwMTgyMjI2ZDkiLCJpYXQiOjE3NTAyNTEwODYsInJpZCI6Ijg5YTllNzdjLWJmNzYtNDBlYy1iMmE1LTQ3OWU3YzhhZjgwOCJ9.hQDKLtix2r_eZvWUe-p77o9luhrVKc7z0XmLyoeedwjuDiOuJ475OxjKgw6QdGY6yi3e97t9jOAPuNadaOSjBw',
      })
    },
  },
})
