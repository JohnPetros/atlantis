import type { AccommodationDto } from '@atlantis/core/dtos'
import { useActionContext } from '@/ui/hooks'

export function useAccommodationsPage() {
  const action = useActionContext()

  async function handleCreateAccommodation(accommodation: AccommodationDto) {
    await action.dispatch('create-accommodation', accommodation)
  }

  async function handleUpdateAccommodation(accommodation: AccommodationDto) {
    await action.dispatch('update-accommodation', accommodation)
  }

  async function handleDeleteAccommodation(accommodationId: string) {
    await action.dispatch('delete-accommodation', { accommodationId })
  }

  return {
    handleCreateAccommodation,
    handleUpdateAccommodation,
    handleDeleteAccommodation,
  }
}
