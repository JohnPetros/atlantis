import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { HostingDto } from 'core/dtos'

const formSchema = z.object({
  accomodationId: z.string().uuid({
    message: 'Nome da acomodação é obrigatório.',
  }),
  hostId: z.string().uuid({
    message: 'Host é obrigatório.',
  }),
})

type FormData = z.infer<typeof formSchema>

export const useHostingForm = (
  onSubmit: (hostId: string, accomodationId: string) => Promise<void>,
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
    await onSubmit(data.hostId, data.accomodationId)
  }

  console.log(form.formState.errors)

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
