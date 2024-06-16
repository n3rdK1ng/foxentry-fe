import { Link } from '@remix-run/react'
import { useState } from 'react'

import { SearchBar } from './search-bar'
import { SortSelects } from './sort-selects'

export const RouteHeader = ({
	title,
	buttonLink,
	button,
	search,
	sortValues,
}: {
	title: string
	buttonLink?: string
	button?: React.ReactNode
	search?: 'products' | 'customers'
	sortValues?: {
		value: string
		label: string
	}[]
}) => {
	const [sortBy, setSortBy] = useState(sortValues?.[0].value ?? '')
	const [order, setOrder] = useState<'asc' | 'desc'>('asc')

	return (
		<>
			<div className="mb-8 w-full border-b border-primary/50 pb-4">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">{title}</h1>
					{buttonLink && (
						<Link to={buttonLink} prefetch="intent">
							{button}
						</Link>
					)}
				</div>
			</div>
			{search && (
				<div className="mb-6 flex flex-col gap-4">
					<SearchBar variant={search} sortBy={sortBy} order={order} />
					{sortValues && (
						<div className="flex flex-wrap items-center gap-2">
							<p>Seřadit podle</p>
							<SortSelects
								setValue={setSortBy}
								values={sortValues}
								order={order}
								setOrder={setOrder}
								className="w-[100px]"
							/>
						</div>
					)}
				</div>
			)}
		</>
	)
}
