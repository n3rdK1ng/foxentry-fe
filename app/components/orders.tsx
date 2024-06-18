import { useQuery } from '@tanstack/react-query'

import { ErrorAlert } from '#components/error-alert'
import { LoadingSpinner } from '#components/loading-spinner'
import { Order } from '#utils/api/types'

import { TableLink } from './table-link'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

export const Orders = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['orders'],
		queryFn: () =>
			fetch(`${ENV.API_URL}/orders`).then(
				res => res.json() as Promise<Order[]>,
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
		<Table>
			<TableCaption>Seznam vašich posledních objednávek.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Produkt</TableHead>
					<TableHead>Zákazník</TableHead>
					<TableHead>Množství</TableHead>
					<TableHead className="text-right">Cena</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map(order => (
					<TableRow key={order.id}>
						<TableLink
							id={order.productId}
							name={order.productName}
							variant={'product'}
						/>
						<TableLink
							id={order.customerId}
							name={order.customerName}
							variant={'customer'}
						/>
						<TableCell>{order.amount}</TableCell>
						<TableCell className="text-right">{order.price} Kč</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
