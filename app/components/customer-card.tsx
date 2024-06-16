import { Link } from '@remix-run/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'

import { Customer } from '#utils/api/types'

import { ErrorAlert } from './error-alert'
import { LoadingSpinner } from './loading-spinner'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

export const CustomerCard = ({ customer }: { customer: Customer }) => {
	const queryClient = useQueryClient()

	const { isPending, error, mutate } = useMutation({
		mutationFn: () =>
			fetch(`${ENV.API_URL}/customers/${customer.id}`, { method: 'DELETE' }),
		onSuccess: () => {
			queryClient.setQueryData(['customers'], (oldData: Customer[]) => {
				return oldData.filter(p => p.id !== customer.id)
			})
		},
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between gap-4">
				<CardTitle>{customer.name}</CardTitle>
				<Button
					variant={'destructive'}
					size={'icon'}
					className="shrink-0"
					onClick={() => mutate()}
				>
					{!isPending ? <TrashIcon className="h-4 w-4" /> : <LoadingSpinner />}
				</Button>
			</CardHeader>
			<CardContent>
				<p>
					<b>Výnos</b>: {customer.yield} Kč
				</p>
				<p>
					<b>Nákupy</b>: {customer.purchases} ks
				</p>
			</CardContent>
			<CardFooter>
				<Link
					className="w-full"
					to={`/customers/${customer.id}`}
					prefetch="intent"
				>
					<Button className="w-full">Detail</Button>
				</Link>

				{error && <ErrorAlert name={error.name} message={error.message} />}
			</CardFooter>
		</Card>
	)
}
