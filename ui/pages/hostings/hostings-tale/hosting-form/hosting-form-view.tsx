import type { AccommodationDto, CustomerDto, HostingDto } from 'core/dtos'
import { Form } from 'ui/components/form'
import { Button } from 'ui/components/button'
import { Select } from 'ui/components/select'
import { useHostingForm } from './use-hosting-form'

type Props = {
  hosting?: HostingDto
  customers: CustomerDto[]
  accommodations: AccommodationDto[]
  onSubmit: (hostId: string, accomodationId: string) => Promise<void>
}

export const HostingFormView = ({
  hosting,
  accommodations,
  customers,
  onSubmit,
}: Props) => {
  const { form, handleSubmit } = useHostingForm(onSubmit, hosting)

  return (
    <Form.Container {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <Form.Group>
          <Form.Field
            control={form.control}
            name='hostId'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Acomodação</Form.Label>
                <Form.Control>
                  <Select.Container>
                    <Select.Trigger
                      className='w-[180px]'
                      value={field.value}
                      onChange={(event) => {
                        field.onChange()
                      }}
                    >
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
                  <Select.Container>
                    <Select.Trigger
                      className='w-[180px]'
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <Select.Value placeholder='Cliente' />
                    </Select.Trigger>
                    <Select.Content>
                      {customers?.map((customer) => (
                        <Select.Item key={customer.id} value={String(customer.id)}>
                          {customer.name}
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

        <Button type='submit' size='lg' className='mt-6 self-end'>
          Salvar
        </Button>
      </form>
    </Form.Container>
  )
}
