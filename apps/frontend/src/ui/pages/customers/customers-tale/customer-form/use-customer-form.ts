import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { CustomerDto, DocumentDto } from '@atlantis/core/dtos'
import { DocumentType } from '@atlantis/core/enums'

const formSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório.' }),
  socialName: z.string({ required_error: 'Nome social é obrigatório.' }),
  birthDate: z.string({ required_error: 'Data de nascimento é obrigatória.' }),
  address: z.object({
    street: z.string({ required_error: 'Rua é obrigatória.' }),
    neighborhood: z.string({ required_error: 'Bairro é obrigatória.' }),
    city: z.string({ required_error: 'Cidade é obrigatória.' }),
    state: z.string({ required_error: 'Estado é obrigatória.' }),
    zipcode: z.string({ required_error: 'CEP é obrigatório.' }),
    country: z.string({ required_error: 'País é obrigatório.' }),
  }),
  cellphones: z
    .array(
      z.object({
        number: z.string({ required_error: 'Número de celular é obrigatório.' }),
        ddd: z.string({ required_error: 'DDD é obrigatório.' }),
      }),
    )
    .min(1, {
      message: 'Pelo menos um número de celular é obrigatório.',
    }),
  cpfDocument: z.object({
    number: z
      .string({ required_error: 'CPF é obrigatório.' })
      .min(11, {
        message: 'CPF deve ter 11 dígitos.',
      })
      .max(11, {
        message: 'CPF deve ter 11 dígitos.',
      })
      .regex(/^\d+$/, {
        message: 'CPF deve conter apenas números.',
      }),
    expeditionDate: z.string({ required_error: 'Data de expedição é obrigatória.' }),
  }),
  rgDocument: z
    .object({
      number: z.string().optional(),
      expeditionDate: z.string().optional(),
    })
    .optional()
    .refine(
      (data) => {
        const hasNumber = data?.number?.trim()
        const hasDate = data?.expeditionDate?.trim()

        if (!hasNumber && !hasDate) return true

        if (hasNumber && hasDate && hasNumber.length === 9 && /^\d+$/.test(hasNumber))
          return true

        return false
      },
      {
        message:
          'Se preencher o RG, ambos número (9 dígitos numéricos) e data de expedição são obrigatórios.',
        path: ['number'],
      },
    ),
  passportDocument: z
    .object({
      number: z.string().optional(),
      expeditionDate: z.string().optional(),
    })
    .optional()
    .refine(
      (data) => {
        const hasNumber = data?.number?.trim()
        const hasDate = data?.expeditionDate?.trim()

        if (!hasNumber && !hasDate) return true

        if (hasNumber && hasDate && hasNumber.length === 8 && /^\d+$/.test(hasNumber))
          return true

        return false
      },
      {
        message:
          'Se preencher o passaporte, ambos número (8 dígitos numéricos) e data de expedição são obrigatórios.',
        path: ['number'],
      },
    ),
})

type FormData = z.infer<typeof formSchema>

export const useCustomerForm = (
  onSubmit: (customer: CustomerDto) => Promise<void>,
  isDependent: boolean,
  customer?: CustomerDto,
) => {
  const cpfDocument = customer?.documents.find(
    (document) => document.type === DocumentType.CPF,
  )
  const rgDocument = customer?.documents.find(
    (document) => document.type === DocumentType.RG,
  )
  const passportDocument = customer?.documents.find(
    (document) => document.type === DocumentType.PASSAPORTE,
  )

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: customer?.name,
      socialName: customer?.socialName,
      birthDate: customer?.birthDate.split('T')[0],
      address: {
        street: isDependent ? 'fake-address' : customer?.address.street,
        neighborhood: isDependent ? 'fake-neighborhood' : customer?.address.neighborhood,
        city: isDependent ? 'fake-city' : customer?.address.city,
        state: isDependent ? 'fake-state' : customer?.address.state,
        zipcode: isDependent ? 'fake-zipcode' : customer?.address.zipcode,
        country: isDependent ? 'fake-country' : customer?.address.country,
      },
      cellphones: isDependent
        ? [{ ddd: '11', number: '999999999' }]
        : customer?.cellphones.map((cellphone) => ({
            number: cellphone.number,
            ddd: cellphone.ddd,
          })),
      cpfDocument: {
        number: cpfDocument?.number,
        expeditionDate: cpfDocument?.expeditionDate.split('T')[0],
      },
      rgDocument: {
        number: rgDocument?.number,
        expeditionDate: rgDocument?.expeditionDate.split('T')[0],
      },
      passportDocument: {
        number: passportDocument?.number,
        expeditionDate: passportDocument?.expeditionDate.split('T')[0],
      },
    },
  })

  const {
    fields: cellphonesFields,
    append: appendCellphone,
    remove: removeCellphone,
  } = useFieldArray({
    control: form.control,
    name: 'cellphones',
  })

  async function handleSubmit(data: FormData) {
    const documents: DocumentDto[] = []
    if (data.cpfDocument.number) {
      documents.push({
        type: DocumentType.CPF,
        number: data.cpfDocument.number,
        expeditionDate: data.cpfDocument.expeditionDate,
      })
    }

    if (data.rgDocument?.number?.trim() && data.rgDocument.expeditionDate?.trim()) {
      documents.push({
        type: DocumentType.RG,
        number: data.rgDocument.number,
        expeditionDate: data.rgDocument.expeditionDate,
      })
    }

    if (
      data.passportDocument?.number?.trim() &&
      data.passportDocument.expeditionDate?.trim()
    ) {
      documents.push({
        type: DocumentType.PASSAPORTE,
        number: data.passportDocument.number,
        expeditionDate: data.passportDocument.expeditionDate,
      })
    }

    const customerDto: CustomerDto = {
      id: customer?.id,
      name: data.name,
      socialName: data.socialName,
      birthDate: data.birthDate,
      address: data.address,
      cellphones: data.cellphones,
      documents,
      registrationDate: customer?.registrationDate ?? new Date().toISOString(),
      dependents: [],
    }

    await onSubmit(customerDto)

    window.dispatchEvent(new Event('form-submit'))
  }

  function handleAppendCellphone() {
    appendCellphone({ ddd: '', number: '' })
  }

  function handleRemoveCellphone(index: number) {
    if (cellphonesFields.length === 1) {
      return
    }

    removeCellphone(index)
  }

  return {
    form,
    cellphonesFields,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleAppendCellphone,
    handleRemoveCellphone,
  }
}
