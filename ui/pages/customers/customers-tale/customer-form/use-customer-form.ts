import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { CustomerDto, DocumentDto } from 'core/dtos'
import { DocumentType } from 'core/enums/DocumentType'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório.',
  }),
  socialName: z.string().min(1, {
    message: 'Nome social é obrigatório.',
  }),
  birthDate: z.string().min(1, {
    message: 'Data de nascimento é obrigatória.',
  }),
  address: z.object({
    street: z.string().min(1, {
      message: 'Rua é obrigatória.',
    }),
    neighborhood: z.string().min(1, {
      message: 'Bairro é obrigatório.',
    }),
    city: z.string().min(1, {
      message: 'Cidade é obrigatória.',
    }),
    state: z.string().min(1, {
      message: 'Estado é obrigatório.',
    }),
    zipcode: z.string().min(1, {
      message: 'CEP é obrigatório.',
    }),
    country: z.string().min(1, {
      message: 'País é obrigatório.',
    }),
  }),
  cellphones: z.array(
    z.object({
      number: z.string({ required_error: 'Número de celular é obrigatório.' }),
      ddd: z.string({ required_error: 'DDD é obrigatório.' }),
    }),
  ),
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
        .min(9, {
          message: 'Passaporte deve ter 9 dígitos.',
        })
        .max(9, {
          message: 'Passaporte deve ter 9 dígitos.',
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
        street: customer?.address.street,
        neighborhood: customer?.address.neighborhood,
        city: customer?.address.city,
        state: customer?.address.state,
        zipcode: customer?.address.zipcode,
        country: customer?.address.country,
      },
      cellphones: customer?.cellphones.map((cellphone) => ({
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
