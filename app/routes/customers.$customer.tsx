import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query'

import { CustomerDetail } from '#components/customer-detail'
import type { Customer } from '#utils/api/types'

export async function loader({ params }: LoaderFunctionArgs) {
	const queryClient = new QueryClient()

	if (!params.customer) {
		throw new Error('Customer ID is required')
	}

	await queryClient.prefetchQuery({
		queryKey: ['customer-' + params.customer],
		queryFn: () =>
			fetch(`${ENV.API_URL}/customers/${params.customer}`).then(
				res => res.json() as Promise<Customer>,
			),
	})

	return json({
		dehydratedState: dehydrate(queryClient),
		customer: params.customer,
	})
}

export default function CustomerDetailRoute() {
	const { dehydratedState, customer } = useLoaderData<typeof loader>()

	return (
		<HydrationBoundary state={dehydratedState}>
			<CustomerDetail customer={customer} />
			<Outlet />
		</HydrationBoundary>
	)
}
