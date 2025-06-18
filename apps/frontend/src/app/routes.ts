import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

import { ROUTES } from 'constants/routes'

export default [
  layout('layout.tsx', [
    index('routes/index.tsx'),
    route(ROUTES.customers, 'routes/customers.tsx'),
    route(ROUTES.accommodations, 'routes/accommodations.tsx'),
    route(ROUTES.hostings, 'routes/hostings.tsx'),
  ]),
] satisfies RouteConfig
