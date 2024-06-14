import { type MetaFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
	useQuery,
} from '@tanstack/react-query'

import { ErrorAlert } from '#components/error-alert'
import { LoadingSpinner } from '#components/loading-spinner'
import { Button } from '#components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#components/ui/card'
import { Product } from '#utils/api/types'

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

function Products() {
	const { data, isPending, error } = useQuery({
		queryKey: ['products'],
		queryFn: () =>
			fetch(`${ENV.API_URL}/products`).then(
				res => res.json() as Promise<Product[]>,
			),
	})

	if (isPending) {
		return (
			<div className="flex justify-center w-full">
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return <ErrorAlert name={error.name} message={error.message} />
	}

	return (
		<section className="grid grid-cols-3 gap-4">
			{data.map(product => (
				<Card key={product.name}>
					<CardHeader>
						<CardTitle>{product.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							<b>Cena</b>: {product.price} Kč
						</p>
						<p>
							<b>Zásoby</b>: {product.stock} ks
						</p>
					</CardContent>
					<CardFooter className="gap-2">
						<Button>Detail</Button>
						<Button variant={'destructive'}>Smazat</Button>
					</CardFooter>
				</Card>
			))}
		</section>
	)
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
