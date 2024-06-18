import { useQuery } from '@tanstack/react-query'

import { ErrorAlert } from '#components/error-alert'
import { LoadingSpinner } from '#components/loading-spinner'
import { RouteHeader } from '#components/route-header'
import type { Customer, Order } from '#utils/api/types'

import { DetailOrders } from './detail-orders'

export const CustomerDetail = ({ customerId }: { customerId: string }) => {
	const {
		data: customer,
		isPending: customerIsPending,
		error: customerError,
	} = useQuery({
		queryKey: ['customer-' + customerId],
		queryFn: () =>
			fetch(`${ENV.API_URL}/customers/${customerId}`).then(
				res => res.json() as Promise<Customer>,
			),
	})

	const {
		data: orders,
		isPending: ordersIsPending,
		error: ordersError,
	} = useQuery({
		queryKey: ['customer-' + customerId + '-orders'],
		queryFn: () =>
			fetch(
				`${ENV.API_URL}/orders/search/${customerId}/customerId/${customerId}`,
			).then(res => res.json() as Promise<Order[]>),
	})

	if (customerIsPending || ordersIsPending) {
		return (
			<div className="flex w-full justify-center">
				<LoadingSpinner />
			</div>
		)
	}

	if (customerError) {
		return (
			<ErrorAlert name={customerError.name} message={customerError.message} />
		)
	}

	if (ordersError) {
		return <ErrorAlert name={ordersError.name} message={ordersError.message} />
	}

	if ('error' in customer && 'message' in customer) {
		return (
			<ErrorAlert
				name={customer.error as string}
				message={customer.message as string}
			/>
		)
	}

	return (
		<>
			<RouteHeader title={customer.name} />
			<p>
				<b>Výnos</b>: {customer.yield} Kč
			</p>
			<p>
				<b>Nákupy</b>: {customer.purchases}
			</p>
			<DetailOrders id={customerId} variant="customer" orders={orders} />
		</>
	)
}
