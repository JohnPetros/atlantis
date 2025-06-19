import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { AccommodationDto } from '@atlantis/core/dtos'

const formSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório.' }),
  singleBeds: z.coerce
    .number({ invalid_type_error: 'Camas de solteiro é obrigatório.' })
    .min(0, {
      message: 'Não pode ser negativo.',
    }),
  coupleBeds: z.coerce
    .number({ invalid_type_error: 'Camas de casal é obrigatório.' })
    .min(0, {
      message: 'Não pode ser negativo.',
    }),
  suites: z.coerce.number({ invalid_type_error: 'Suites é obrigatório.' }).min(0, {
    message: 'Não pode ser negativo.',
  }),
  garages: z.coerce.number({ invalid_type_error: 'Garagens é obrigatório.' }).min(0, {
    message: 'Não pode ser negativo.',
  }),
  hasAirConditioning: z.coerce.boolean({
    invalid_type_error: 'Ar-condicionado é obrigatório.',
  }),
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
