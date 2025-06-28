import type { HostingDto } from '@atlantis/core/dtos'
import { BACKEND_BASE_URL } from '@/constants'

export const HostingsService = () => {
  return {
    async getAllHostings() {
      const response = await fetch(`${BACKEND_BASE_URL}/hostings`)
      return response.json() as Promise<HostingDto[]>
    },

    async getHostingById(hostingId: string) {
      const response = await fetch(`${BACKEND_BASE_URL}/hostings/${hostingId}`)
      return response.json() as Promise<HostingDto>
    },

    async createHosting(
      accomodationId: string,
      hostId: string,
      startDate: Date,
      endDate: Date,
    ) {
      return await fetch(`${BACKEND_BASE_URL}/hostings`, {
        method: 'POST',
        body: JSON.stringify({ accomodationId, hostId, startDate, endDate }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },

    async updateHosting(
      hostingId: string,
      accomodationId: string,
      hostId: string,
      startDate: Date,
      endDate: Date,
    ) {
      return await fetch(`${BACKEND_BASE_URL}/hostings/${hostingId}`, {
        method: 'PUT',
        body: JSON.stringify({ accomodationId, hostId, startDate, endDate }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },

    async deleteHosting(hostingId: string) {
      return await fetch(`${BACKEND_BASE_URL}/hostings/${hostingId}`, {
        method: 'DELETE',
      })
    },
  }
}
