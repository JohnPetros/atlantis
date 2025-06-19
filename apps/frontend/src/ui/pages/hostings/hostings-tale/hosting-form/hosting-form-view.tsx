import type { AccommodationDto, CustomerDto, HostingDto } from '@atlantis/core/dtos'
import { DocumentFormatter } from '@atlantis/core/formatters'

import { Form } from '@/ui/components/form'
import { Button } from '@/ui/components/button'
import { Select } from '@/ui/components/select'
import { useHostingForm } from './use-hosting-form'

type Props = {
  isLoading: boolean
  hosting?: HostingDto
  customers: CustomerDto[]
  accommodations: AccommodationDto[]
  onSubmit: (hostId: string, accomodationId: string) => Promise<void>
}

export const HostingFormView = ({
  isLoading,
  hosting,
  accommodations,
  customers,
  onSubmit,
}: Props) => {
  const { form, handleSubmit } = useHostingForm(onSubmit, hosting)

  return (
    <Form.Container {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <Form.Group className='grid-cols-1 md:grid-cols-3'>
          <Form.Field
            control={form.control}
            name='accomodationId'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Acomodação</Form.Label>
                <Form.Control>
                  <Select.Container onValueChange={field.onChange} value={field.value}>
                    <Select.Trigger className='w-full'>
                      <Select.Value placeholder='Acomodação' />
                    </Select.Trigger>
                    <Select.Content>
                      {accommodations?.map((accommodation) => (
                        <Select.Item
                          key={accommodation.id}
                          value={String(accommodation.id)}
                        >
                          {accommodation.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Container>
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='hostId'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Cliente</Form.Label>
                <Form.Control>
                  <Select.Container onValueChange={field.onChange} value={field.value}>
                    <Select.Trigger className='w-full md:w-[280px]'>
                      <Select.Value placeholder='Cliente' />
                    </Select.Trigger>
                    <Select.Content>
                      {customers?.map((customer) => (
                        <Select.Item key={customer.id} value={String(customer.id)}>
                          {customer.name} |{' '}
                          {customer.documents
                            .map((document) =>
                              DocumentFormatter.format(document.type, document.number),
                            )
                            .join('; ')}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Container>
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </Form.Group>

        <Button type='submit' size='lg' className='mt-6 self-end' disabled={isLoading}>
          Salvar
        </Button>
      </form>
    </Form.Container>
  )
}
