import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { HostingDto } from 'core/dtos'

const formSchema = z.object({
  accomodationId: z.string({ required_error: 'Acomodação é obrigatório.' }),
  hostId: z.string({ required_error: 'Cliente é obrigatório.' }),
  startDate: z.string({ required_error: 'Data de início é obrigatória.' }),
  endDate: z.string({ required_error: 'Data de término é obrigatória.' }),
})

type FormData = z.infer<typeof formSchema>

export const useHostingForm = (
  onSubmit: (
    hostId: string,
    accomodationId: string,
    startDate: Date,
    endDate: Date, 
  ) => Promise<void>,
    hosting?: HostingDto,
) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      accomodationId: hosting?.accomodationId,
      hostId: hosting?.hostId,
    },
  })

  async function handleSubmit(data: FormData) {
    await onSubmit(data.hostId, data.accomodationId, data.startDate, data.endDate, hosting?.id)
    window.dispatchEvent(new Event('form-submit'))
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
