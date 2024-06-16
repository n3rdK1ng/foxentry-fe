import { useQuery } from '@tanstack/react-query'

import { CustomerCard } from '#components/customer-card'
import { ErrorAlert } from '#components/error-alert'
import { LoadingSpinner } from '#components/loading-spinner'
import { Customer } from '#utils/api/types'

export const Customers = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['customers'],
		queryFn: () =>
			fetch(`${ENV.API_URL}/customers`).then(
				res => res.json() as Promise<Customer[]>,
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

	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{data.map(customer => (
				<CustomerCard key={customer.id} customer={customer} />
			))}
		</section>
	)
}
