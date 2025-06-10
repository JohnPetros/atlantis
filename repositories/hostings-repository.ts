import type { HostingDto } from 'core/dtos'

export const HostingsRepository = () => {
  let hostings: HostingDto[] = []

  return {
    async findAll() {
      return hostings
    },

    async findById(id: string) {
      return hostings.find((hosting) => hosting.id === id)
    },

    async add(hosting: HostingDto) {
      hostings.unshift(hosting)
    },

    async update(hosting: HostingDto) {
      const index = hostings.findIndex(
        (currentHosting) => currentHosting.id === hosting.id,
      )
      console.log(hostings)
      hostings[index] = hosting
    },

    async remove(id: string) {
      hostings = hostings.filter((hosting) => hosting.id !== id)
    },
  }
}
