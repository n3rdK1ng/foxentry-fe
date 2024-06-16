import { json } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query'

import { Customers } from '#components/customers'
import { RouteHeader } from '#components/route-header'
import { Button } from '#components/ui/button'
import type { Customer } from '#utils/api/types'

export async function loader() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['customers'],
		queryFn: () =>
			fetch(`${ENV.API_URL}/customers`).then(
				res => res.json() as Promise<Customer[]>,
			),
	})

	return json({ dehydratedState: dehydrate(queryClient) })
}

export default function UsersRoute() {
	const { dehydratedState } = useLoaderData<typeof loader>()
	const location = useLocation()

	return (
		<HydrationBoundary state={dehydratedState}>
			{/\/customers\/?$/.test(location.pathname) && (
				<>
					<RouteHeader
						title={'Zákazníci'}
						buttonLink={'/create-customer'}
						button={
							<Button className="gap-2">
								🆕
								<p className="hidden sm:block">Přidat zákazníka</p>
							</Button>
						}
						search="customers"
						sortValues={[
							{
								value: 'name',
								label: 'názvu',
							},
							{
								value: 'yield',
								label: 'výnosu',
							},
							{
								value: 'purchases',
								label: 'nákupů',
							},
						]}
					/>
					<Customers />
				</>
			)}
			<Outlet />
		</HydrationBoundary>
	)
}
