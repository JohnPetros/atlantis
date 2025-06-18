import { useActionContext } from '@/ui/hooks'

export function useHostingsPage() {
  const action = useActionContext()

  async function handleCreateHosting(hostId: string, accomodationId: string) {
    await action.dispatch('create-hosting', { hostId, accomodationId })
  }

  async function handleUpdateHosting(
    hostId: string,
    accomodationId: string,
    hostingId?: string,
  ) {
    await action.dispatch('update-hosting', { hostId, accomodationId, hostingId })
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
