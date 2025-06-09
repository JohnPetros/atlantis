import type { AccommodationDto } from 'core/dtos'
import { Form } from 'ui/components/form'
import { Input } from 'ui/components/input'
import { Button } from 'ui/components/button'
import { Switch } from 'ui/components/switch'
import { useAccommodationForm } from './use-accommodation-form'

type Props = {
  accommodation?: AccommodationDto
  onSubmit: (accommodation: AccommodationDto) => Promise<void>
}

export const AccommodationFormView = ({ accommodation, onSubmit }: Props) => {
  const { form, handleSubmit } = useAccommodationForm(onSubmit, accommodation)

  return (
    <Form.Container {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <Form.Group>
          <Form.Field
            control={form.control}
            name='name'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Nome</Form.Label>
                <Form.Control>
                  <Input placeholder='Nome do cliente' autoFocus {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='singleBeds'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Camas de solteiro</Form.Label>
                <Form.Control>
                  <Input type='number' placeholder='Camas de solteiro' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='coupleBeds'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Camas de casal</Form.Label>
                <Form.Control>
                  <Input type='number' placeholder='Camas de casal' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </Form.Group>

        <Form.Group>
          <Form.Field
            control={form.control}
            name='suites'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Suites</Form.Label>
                <Form.Control>
                  <Input type='number' placeholder='Suites' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='garages'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Garagens</Form.Label>
                <Form.Control>
                  <Input type='number' placeholder='Garagens' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='hasAirConditioning'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Possui ar-condicionado?</Form.Label>
                <Form.Control>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
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
