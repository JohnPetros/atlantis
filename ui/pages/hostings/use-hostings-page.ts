import { useActionContext } from 'ui/hooks'

export function useHostingsPage() {
  const action = useActionContext()

  async function handleCreateHosting(
    hostId: string,
    accomodationId: string,
    startDate: Date,
    endDate: Date,
  ) {
    await action.dispatch('create-hosting', {
      hostId,
      accomodationId,
      startDate,
      endDate,
    })
  }

  async function handleUpdateHosting(
    hostId: string,
    accomodationId: string,
    startDate: Date,
    endDate: Date,
    hostingId?: string,
  ) {
    await action.dispatch('update-hosting', {
      hostId,
      accomodationId,
      hostingId,
      startDate,
      endDate,
    })
  }

  async function handleDeleteHosting(hostingId: string) {
    await action.dispatch('delete-hosting', { hostingId })
  }

  return {
    handleCreateHosting,
    handleUpdateHosting,
    handleDeleteHosting,
  }
}
