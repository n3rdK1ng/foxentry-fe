import { type MetaFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query'

import { Products } from '#components/products'
import { RouteHeader } from '#components/route-header'
import { Button } from '#components/ui/button'
import { type Product } from '#utils/api/types'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Lišákův obchod' },
		{
			name: 'description',
			content:
				'Lišák Petr otevřel obchod v lese, kde prodává různé ovoce, ořechy a zeleninu.' +
				'Tento systém mu pomáhá sledovat jeho prodeje a výdělky.',
		},
	]
}

export async function loader() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['products'],
		queryFn: () =>
			fetch(`${ENV.API_URL}/products`).then(
				res => res.json() as Promise<Product[]>,
			),
	})

	return json({ dehydratedState: dehydrate(queryClient) })
}

export default function Index() {
	const { dehydratedState } = useLoaderData<typeof loader>()

	return (
		<HydrationBoundary state={dehydratedState}>
			<RouteHeader
				title={'Produkty'}
				buttonLink={'/create-product'}
				button={
					<Button className="gap-2">
						🆕
						<p className="hidden sm:block">Přidat produkt</p>
					</Button>
				}
				search="products"
				sortValues={[
					{
						value: 'name',
						label: 'názvu',
					},
					{
						value: 'price',
						label: 'ceny',
					},
					{
						value: 'stock',
						label: 'zásob',
					},
				]}
			/>
			<Products />
		</HydrationBoundary>
	)
}
