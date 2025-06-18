import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { CustomerDto, DocumentDto } from 'core/dtos'
import { DocumentType } from 'core/enums/DocumentType'
import { useLoaderData } from 'react-router'

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
      }),
    expeditionDate: z.string({ required_error: 'Data de expedição é obrigatória.' }),
  }),
  rgDocument: z
    .object({
      number: z
        .string()
        .min(9, {
          message: 'RG deve ter 9 dígitos.',
        })
        .max(9, {
          message: 'RG deve ter 9 dígitos.',
        })
        .optional(),
      expeditionDate: z
        .string({ required_error: 'Data de expedição é obrigatória.' })
        .optional(),
    })
    .optional(),
  passportDocument: z
    .object({
      number: z
        .string()
        .min(8, {
          message: 'Passaporte deve ter 8 dígitos.',
        })
        .max(8, {
          message: 'Passaporte deve ter 8 dígitos.',
        })
        .optional(),
      expeditionDate: z
        .string({ required_error: 'Data de expedição é obrigatória.' })
        .optional(),
    })
    .optional(),
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
        expeditionDate: cpfDocument?.expeditionDate,
      },
      rgDocument: {
        number: rgDocument?.number,
        expeditionDate: rgDocument?.expeditionDate,
      },
      passportDocument: {
        number: passportDocument?.number,
        expeditionDate: passportDocument?.expeditionDate,
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

    if (data.rgDocument?.number && data.rgDocument.expeditionDate) {
      documents.push({
        type: DocumentType.RG,
        number: data.rgDocument.number,
        expeditionDate: data.rgDocument.expeditionDate,
      })
    }

    if (data.passportDocument?.number && data.passportDocument.expeditionDate) {
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
