import { Link } from '@remix-run/react'

import { cn } from '#utils/misc'

import { TableCell } from './ui/table'

export const TableLink = ({
	id,
	name,
	variant,
}: {
	id: string
	name: string
	variant?: 'customer' | 'product'
}) => (
	<TableCell className={cn(variant === 'product' && 'font-medium')}>
		{!variant ? (
			name
		) : (
			<Link
				className="hover:underline"
				to={'/' + (variant === 'customer' ? 'customers/' : '') + id}
				prefetch="intent"
			>
				{name}
			</Link>
		)}
	</TableCell>
)
