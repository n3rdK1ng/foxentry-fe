import { useQuery } from '@tanstack/react-query'

import { ErrorAlert } from '#components/error-alert'
import { LoadingSpinner } from '#components/loading-spinner'
import { RouteHeader } from '#components/route-header'
import type { Order, Product } from '#utils/api/types'

import { DetailOrders } from './detail-orders'

export const ProductDetail = ({ productId }: { productId: string }) => {
	const {
		data: product,
		isPending: productIsPending,
		error: productError,
	} = useQuery({
		queryKey: ['product-' + productId],
		queryFn: () =>
			fetch(`${ENV.API_URL}/products/${productId}`).then(
				res => res.json() as Promise<Product>,
			),
	})

	const {
		data: orders,
		isPending: ordersIsPending,
		error: ordersError,
	} = useQuery({
		queryKey: ['product-' + productId + '-orders'],
		queryFn: () =>
			fetch(
				`${ENV.API_URL}/orders/search/${productId}/productId/${productId}`,
			).then(res => res.json() as Promise<Order[]>),
	})

	if (productIsPending || ordersIsPending) {
		return (
			<div className="flex w-full justify-center">
				<LoadingSpinner />
			</div>
		)
	}

	if (productError) {
		return (
			<ErrorAlert name={productError.name} message={productError.message} />
		)
	}

	if (ordersError) {
		return <ErrorAlert name={ordersError.name} message={ordersError.message} />
	}

	if ('error' in product && 'message' in product) {
		return (
			<ErrorAlert
				name={product.error as string}
				message={product.message as string}
			/>
		)
	}

	return (
		<>
			<RouteHeader title={product.name} />
			<p>
				<b>Cena</b>: {product.price} Kč
			</p>
			<p>
				<b>Zásoby</b>: {product.stock} ks
			</p>
			<DetailOrders id={productId} variant="product" orders={orders} />
		</>
	)
}
