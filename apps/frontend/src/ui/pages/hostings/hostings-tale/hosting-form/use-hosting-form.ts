import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { HostingDto } from '@atlantis/core/dtos'
import { DateFormatter } from '@atlantis/core/formatters'

const formSchema = z
  .object({
    accomodationId: z.string({ required_error: 'Acomodação é obrigatório.' }),
    hostId: z.string({ required_error: 'Cliente é obrigatório.' }),
    startDate: z
      .string({ required_error: 'Data de início é obrigatória.' })
      .refine(
        (date) => {
          const parsedDate = new Date(date)
          return !Number.isNaN(parsedDate.getTime())
        },
        { message: 'Data de início deve ser uma data válida.' },
      )
      .refine(
        (date) => {
          const parsedDate = new Date(date)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return parsedDate >= today
        },
        { message: 'Data de início não pode ser no passado.' },
      ),
    endDate: z.string({ required_error: 'Data de término é obrigatória.' }).refine(
      (date) => {
        const parsedDate = new Date(date)
        return !Number.isNaN(parsedDate.getTime())
      },
      { message: 'Data de término deve ser uma data válida.' },
    ),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate)
      const endDate = new Date(data.endDate)
      return endDate > startDate
    },
    {
      message: 'Data de término deve ser posterior à data de início.',
      path: ['endDate'],
    },
  )

type FormData = z.infer<typeof formSchema>

export const useHostingForm = (
  onSubmit: (
    hostId: string,
    accomodationId: string,
    startDate: Date,
    endDate: Date,
    hostingId?: string,
  ) => Promise<void>,
  hosting?: HostingDto,
) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      accomodationId: hosting?.accomodationId,
      hostId: hosting?.hostId,
      startDate: hosting?.startDate ? hosting.startDate.split('T')[0] : '',
      endDate: hosting?.endDate ? hosting.endDate.split('T')[0] : '',
    },
  })

  async function handleSubmit(data: FormData) {
    const startDate = new Date(
      new Date(data.startDate).setDate(new Date(data.startDate).getDate() + 1),
    )
    const endDate = new Date(
      new Date(data.endDate).setDate(new Date(data.endDate).getDate() + 1),
    )

    await onSubmit(data.hostId, data.accomodationId, startDate, endDate, hosting?.id)
    window.dispatchEvent(new Event('form-submit'))
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
