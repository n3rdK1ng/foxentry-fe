import { Link } from '@remix-run/react'

import { SearchBar } from './search-bar'
import { Button } from './ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

export const RouteHeader = () => {
	return (
		<>
			<div className="mb-8 w-full border-b border-primary/50 pb-4">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">Produkty</h1>
					<Link to={'/create-product'} prefetch="intent">
						<Button className="gap-2">
							🆕
							<p className="hidden sm:block">Přidat produkt</p>
						</Button>
					</Link>
				</div>
			</div>
			<div className="mb-6 flex flex-col gap-4">
				<SearchBar />
				<div className="flex items-center gap-2">
					<p>Seřadit podle</p>
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="názvu" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="name">názvu</SelectItem>
							<SelectItem value="price">ceny</SelectItem>
							<SelectItem value="stock">zásob</SelectItem>
						</SelectContent>
					</Select>
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="vzestupně" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="up">vzestupně</SelectItem>
							<SelectItem value="down">sestupně</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</>
	)
}
