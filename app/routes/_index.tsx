import { type MetaFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query'

import { Products } from '#components/products'
import { type Product } from '#utils/api/types'

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
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
		<section>
			<h1 className="w-full border-b border-primary/50 pb-2 text-3xl font-bold mb-8">
				Products
			</h1>
			<HydrationBoundary state={dehydratedState}>
				<Products />
			</HydrationBoundary>
		</section>
	)
}
