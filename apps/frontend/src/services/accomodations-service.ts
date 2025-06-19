import type { AccommodationDto } from '@atlantis/core/dtos'
import { BACKEND_BASE_URL } from '@/constants'

export const AccommodationsService = () => {
  return {
    async getAllAccommodations() {
      const response = await fetch(`${BACKEND_BASE_URL}/accommodations`)
      return response.json() as Promise<AccommodationDto[]>
    },

    async getAccommodationById(accommodationId: string) {
      const response = await fetch(
        `${BACKEND_BASE_URL}/accommodations/${accommodationId}`,
      )
      return response.json() as Promise<AccommodationDto>
    },

    async createAccommodation(accommodation: AccommodationDto) {
      return await fetch(`${BACKEND_BASE_URL}/accommodations`, {
        method: 'POST',
        body: JSON.stringify(accommodation),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },

    async updateAccommodation(accommodation: AccommodationDto) {
      return await fetch(`${BACKEND_BASE_URL}/accommodations/${accommodation.id}`, {
        method: 'PUT',
        body: JSON.stringify(accommodation),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },

    async deleteAccommodation(accommodationId: string) {
      return await fetch(`${BACKEND_BASE_URL}/accommodations/${accommodationId}`, {
        method: 'DELETE',
      })
    },
  }
}
