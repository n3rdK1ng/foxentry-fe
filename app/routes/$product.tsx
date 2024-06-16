import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query'

import { ProductDetail } from '#components/product-detail'
import type { Product } from '#utils/api/types'

export async function loader({ params }: LoaderFunctionArgs) {
	const queryClient = new QueryClient()

	if (!params.product) {
		throw new Error('Product ID is required')
	}

	await queryClient.prefetchQuery({
		queryKey: ['product-' + params.product],
		queryFn: () =>
			fetch(`${ENV.API_URL}/products/${params.product}`).then(
				res => res.json() as Promise<Product>,
			),
	})

	return json({
		dehydratedState: dehydrate(queryClient),
		product: params.product,
	})
}

export default function ProductDetailRoute() {
	const { dehydratedState, product } = useLoaderData<typeof loader>()
	const location = useLocation()

	return (
		<HydrationBoundary state={dehydratedState}>
			{!location.pathname.includes('edit-product') && (
				<ProductDetail product={product} />
			)}
			<Outlet />
		</HydrationBoundary>
	)
}
