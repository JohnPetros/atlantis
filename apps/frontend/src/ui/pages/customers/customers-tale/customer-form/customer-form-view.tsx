import { Plus, Trash } from 'lucide-react'

import type { CustomerDto } from '@atlantis/core/dtos'
import { Form } from '@/ui/components/form'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { useCustomerForm } from './use-customer-form'

type Props = {
  customer?: CustomerDto
  isDependent: boolean
  isLoading: boolean
  onSubmit: (customer: CustomerDto) => Promise<void>
}

export const CustomerFormView = ({
  customer,
  isDependent = false,
  isLoading = false,
  onSubmit,
}: Props) => {
  const {
    form,
    cellphonesFields,
    handleAppendCellphone,
    handleRemoveCellphone,
    handleSubmit,
  } = useCustomerForm(onSubmit, isDependent, customer)

  return (
    <Form.Container {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <Form.Group className='grid-cols-2 md:grid-cols-3'>
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
            name='socialName'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Nome social</Form.Label>
                <Form.Control>
                  <Input placeholder='Nome do cliente' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='birthDate'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Data de nascimento</Form.Label>
                <Form.Control>
                  <Input type='date' placeholder='Nome do cliente' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </Form.Group>

        {!isDependent && (
          <>
            <Form.GroupTitle>Endereço</Form.GroupTitle>

            <Form.Group className='grid-cols-2 md:grid-cols-3'>
              <Form.Field
                control={form.control}
                name='address.street'
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Rua</Form.Label>
                    <Form.Control>
                      <Input placeholder='Rua Solimoes' {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name='address.neighborhood'
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control>
                      <Input placeholder='Bairro Solimoes' {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name='address.city'
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control>
                      <Input placeholder='São José do Rio Preto' {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name='address.zipcode'
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>CEP</Form.Label>
                    <Form.Control>
                      <Input placeholder='123456789' {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name='address.state'
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control>
                      <Input placeholder='SP' {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name='address.country'
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>País</Form.Label>
                    <Form.Control>
                      <Input placeholder='Brasil' {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </Form.Group>
          </>
        )}
        <Form.GroupTitle>Documentos</Form.GroupTitle>

        <Form.Group className='grid-cols-2 mt-3'>
          <Form.Field
            control={form.control}
            name='cpfDocument.number'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>CPF</Form.Label>
                <Form.Control>
                  <Input placeholder='Brasil' maxLength={11} {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='cpfDocument.expeditionDate'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Data de expedição</Form.Label>
                <Form.Control>
                  <Input type='date' placeholder='Brasil' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </Form.Group>

        <Form.Group className='grid-cols-2 mt-6'>
          <Form.Field
            control={form.control}
            name='rgDocument.number'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>RG (Opcional)</Form.Label>
                <Form.Control>
                  <Input placeholder='Brasil' minLength={9} maxLength={9} {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='rgDocument.expeditionDate'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Data de expedição</Form.Label>
                <Form.Control>
                  <Input
                    type='date'
                    placeholder='Brasil'
                    minLength={9}
                    maxLength={9}
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </Form.Group>

        <Form.Group className='grid-cols-2 mt-6'>
          <Form.Field
            control={form.control}
            name='passportDocument.number'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Passaporte (Opcional)</Form.Label>
                <Form.Control>
                  <Input placeholder='Brasil' maxLength={9} {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name='passportDocument.expeditionDate'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Data de expedição</Form.Label>
                <Form.Control>
                  <Input type='date' placeholder='Brasil' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </Form.Group>

        {!isDependent && (
          <>
            <Form.GroupTitle>Telefones</Form.GroupTitle>

            {cellphonesFields.map((field, index) => (
              <Form.Group key={field.id} className='grid-cols-5 mt-3'>
                <Form.Field
                  control={form.control}
                  name={`cellphones.${index}.ddd`}
                  render={({ field }) => (
                    <Form.Item className='col-span-2'>
                      <Form.Label>Tel. {index + 1} - DDD</Form.Label>
                      <Form.Control>
                        <Input placeholder='Telefone' {...field} />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name={`cellphones.${index}.number`}
                  render={({ field }) => (
                    <Form.Item className='col-span-2'>
                      <Form.Label>Tel. {index + 1} - Número</Form.Label>
                      <Form.Control>
                        <Input placeholder='Telefone' {...field} />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />

                <Button
                  type='button'
                  variant='outline'
                  className='mt-7 col-span-1'
                  onClick={() => handleRemoveCellphone(index)}
                >
                  <Trash className='text-xs' />
                  <span className='hidden sm:block'>Remover</span>
                </Button>
              </Form.Group>
            ))}

            {form.formState.errors.cellphones && (
              <p className='text-destructive text-sm mt-3'>
                {form.formState.errors.cellphones.message}
              </p>
            )}

            <Button
              type='button'
              variant='outline'
              className='mt-6'
              onClick={handleAppendCellphone}
            >
              <Plus />
              Adicionar telefone
            </Button>
          </>
        )}

        <Button type='submit' size='lg' className='mt-6 self-end' isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Form.Container>
  )
}
