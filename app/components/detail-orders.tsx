import { RouteHeader } from '#components/route-header'
import type { Order } from '#utils/api/types'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

export const DetailOrders = ({
	id,
	variant,
	orders,
}: {
	id: string
	variant: 'customer' | 'product'
	orders: Order[]
}) => {
	return (
		<div className="mt-8">
			<RouteHeader
				title=""
				search="orders"
				searchOptions={`${variant}Id/${id}`}
				altQueryKey={variant + '-' + id + '-orders'}
				hideTitle
				sortValues={[
					{
						value: 'productName',
						label: 'názvu',
					},
					{
						value: 'customerName',
						label: 'jména',
					},
					{
						value: 'price',
						label: 'ceny',
					},
					{
						value: 'amount',
						label: 'množství',
					},
				]}
			/>
			<Table>
				<TableCaption>
					Seznam objednávek {variant === 'customer' && 'zákazníka'}
					{variant === 'product' && 'produktu'}.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Produkt</TableHead>
						<TableHead>Zákazník</TableHead>
						<TableHead>Množství</TableHead>
						<TableHead className="text-right">Cena</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map(order => (
						<TableRow key={order.id}>
							<TableCell className="font-medium">{order.productName}</TableCell>
							<TableCell>{order.customerName}</TableCell>
							<TableCell>{order.amount}</TableCell>
							<TableCell className="text-right">{order.price} Kč</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
