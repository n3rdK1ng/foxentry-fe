import { useQuery } from '@tanstack/react-query'

import { ErrorAlert } from '#components/error-alert'
import { LoadingSpinner } from '#components/loading-spinner'
import { RouteHeader } from '#components/route-header'
import type { Customer } from '#utils/api/types'

export const CustomerDetail = ({ customer }: { customer: string }) => {
	const { data, isPending, error } = useQuery({
		queryKey: ['customer-' + customer],
		queryFn: () =>
			fetch(`${ENV.API_URL}/customers/${customer}`).then(
				res => res.json() as Promise<Customer>,
			),
	})

	if (isPending) {
		return (
			<div className="flex w-full justify-center">
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return <ErrorAlert name={error.name} message={error.message} />
	}

	if ('error' in data && 'message' in data) {
		return (
			<ErrorAlert
				name={data.error as string}
				message={data.message as string}
			/>
		)
	}

	return (
		<>
			<RouteHeader title={data.name} />
			<p>
				<b>Výnos</b>: {data.yield} Kč
			</p>
			<p>
				<b>Nákupy</b>: {data.purchases} ks
			</p>
		</>
	)
}
