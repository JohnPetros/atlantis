import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { AccommodationDto } from '@atlantis/core/dtos'

const formSchema = z.object({
  name: z.string().min(0, {
    message: 'Nome é obrigatório.',
  }),
  singleBeds: z.coerce.number().min(0, {
    message: 'Camas de solteiro é obrigatório.',
  }),
  coupleBeds: z.coerce.number().min(0, {
    message: 'Camas de casal é obrigatório.',
  }),
  suites: z.coerce.number().min(0, {
    message: 'Suites é obrigatório.',
  }),
  garages: z.coerce.number().min(0, {
    message: 'Garagens é obrigatório.',
  }),
  hasAirConditioning: z.coerce.boolean(),
})

type FormData = z.infer<typeof formSchema>

export const useAccommodationForm = (
  onSubmit: (accommodation: AccommodationDto) => Promise<void>,
  accommodation?: AccommodationDto,
) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: accommodation?.name,
      singleBeds: accommodation?.singleBeds,
      coupleBeds: accommodation?.coupleBeds,
      suites: accommodation?.suites,
      garages: accommodation?.garages,
      hasAirConditioning: accommodation?.hasAirConditioning,
    },
  })

  async function handleSubmit(data: FormData) {
    const accommodationDto: AccommodationDto = {
      id: accommodation?.id,
      name: data.name,
      singleBeds: data.singleBeds,
      coupleBeds: data.coupleBeds,
      suites: data.suites,
      garages: data.garages,
      hasAirConditioning: data.hasAirConditioning,
    }

    await onSubmit(accommodationDto)
    window.dispatchEvent(new Event('form-submit'))
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
