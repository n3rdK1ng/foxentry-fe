import { type MetaFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Button } from '#components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#components/ui/card'
import { api } from '#utils/api'

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	]
}

export async function loader() {
	const { data: products } = await api.getProducts()

	return json({ products })
}

export default function Index() {
	const { products } = useLoaderData<typeof loader>()

	return (
		<section>
			<h1 className="w-full border-b border-primary/50 pb-2 text-3xl font-bold">
				Products
			</h1>
			<section className="mt-8 grid grid-cols-3 gap-4">
				{products.map(product => (
					<Card key={product.name}>
						<CardHeader>
							<CardTitle>{product.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<b>Cena</b>: {product.price} Kč
							</p>
							<p>
								<b>Zásoby</b>: {product.stock} ks
							</p>
						</CardContent>
						<CardFooter className="gap-2">
							<Button>Detail</Button>
							<Button variant={'destructive'}>Smazat</Button>
						</CardFooter>
					</Card>
				))}
			</section>
		</section>
	)
}
