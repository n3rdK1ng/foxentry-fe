import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query'

import { Orders } from '#components/orders'
import { RouteHeader } from '#components/route-header'
import { Button } from '#components/ui/button'
import type { Order } from '#utils/api/types'

export async function loader() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['orders'],
		queryFn: () =>
			fetch(`${ENV.API_URL}/orders`).then(
				res => res.json() as Promise<Order[]>,
			),
	})

	return json({ dehydratedState: dehydrate(queryClient) })
}

export default function UsersRoute() {
	const { dehydratedState } = useLoaderData<typeof loader>()

	return (
		<HydrationBoundary state={dehydratedState}>
			<RouteHeader
				title={'Objednávky'}
				buttonLink={'/create-order'}
				button={
					<Button className="gap-2">
						🆕
						<p className="hidden sm:block">Přidat objednávku</p>
					</Button>
				}
				search="orders"
				sortValues={[
					{
						value: 'productName',
						label: 'názvu',
					},
					{
						value: 'customerName',
						label: 'jména',
					},
					{
						value: 'price',
						label: 'ceny',
					},
					{
						value: 'amount',
						label: 'množství',
					},
				]}
			/>
			<Orders />
		</HydrationBoundary>
	)
}
