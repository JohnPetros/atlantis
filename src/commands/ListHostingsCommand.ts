import { Command } from './Command'
import { Storage } from '@/utils/Storage'
import type { Hosting } from '@/entities/Hosting'

export class ListHostingsCommand extends Command {
  private hostings: Hosting[]

  constructor() {
    super()
    this.hostings = Storage.getInstance().hostings
  }
  async execute() {
    if (!this.hostings.length) {
      this.output.error('Nenhuma hospedagem registrada ainda')
      return
    }

    this.output.table(
      this.hostings.map((hosting) => ({
        ID: hosting.id,
        Acomodação: hosting.accomodationName,
        'ID do cliente': hosting.hostId,
        'Nome do cliente': hosting.hostName,
        'Documentos do cliente': hosting.hostDocuments
          .map((document) => document.formattedNumber)
          .join(';'),
        'Nº de dependentes': hosting.hostDependents,
      })),
    )
  }
}
