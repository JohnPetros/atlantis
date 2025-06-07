export class DocumentFormatter {
  static format(documentType: string, documentNumber: string): string {
    switch (documentType) {
      case 'RG':
        return DocumentFormatter.formatRg(documentNumber)
      case 'CPF':
        return DocumentFormatter.formatCpf(documentNumber)
      case 'PASSAPORTE':
        return DocumentFormatter.formatPassport(documentNumber)
      default:
        return documentNumber
    }
  }

  private static formatRg(rg: string): string {
    return `RG: ${rg.slice(0, 2)}.${rg.slice(3, 6)}.${rg.slice(6, 9)}-${rg[8]}`
  }

  private static formatPassport(passaporte: string): string {
    return `Passaporte: ${passaporte.slice(0, 3)}.${passaporte.slice(3, 6)}.${passaporte.slice(6, 9)}-${passaporte.slice(9)}`
  }

  private static formatCpf(cpf: string): string {
    return `CPF: ${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
  }
}
