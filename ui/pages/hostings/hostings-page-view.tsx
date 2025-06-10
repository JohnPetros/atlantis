import { useLoaderData } from 'react-router'
import { H1 } from 'ui/components/h1'
import { HostingsTable } from './hostings-tale'
import type { clientLoader } from '~/routes/hostings'
import { useHostingsPage } from './use-hostings-page'

export const HostingsPageView = () => {
  const data = useLoaderData<typeof clientLoader>()
  const { handleDeleteHosting, handleCreateHosting, handleUpdateHosting } =
    useHostingsPage()

  return (
    <div>
      <H1>Hospedagens</H1>
      <div className='mt-4'>
        <HostingsTable
          hostings={data.hostings}
          onDeleteHosting={handleDeleteHosting}
          onCreateHosting={handleCreateHosting}
          onUpdateHosting={handleUpdateHosting}
        />
      </div>
    </div>
  )
}
