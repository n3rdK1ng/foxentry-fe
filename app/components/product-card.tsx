import { Link } from '@remix-run/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'

import { Product } from '#utils/api/types'

import { ErrorAlert } from './error-alert'
import { LoadingSpinner } from './loading-spinner'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

export const ProductCard = ({ product }: { product: Product }) => {
	const queryClient = useQueryClient()

	const { isPending, error, mutate } = useMutation({
		mutationFn: () =>
			fetch(`${ENV.API_URL}/products/${product.id}`, { method: 'DELETE' }),
		onSuccess: () => {
			queryClient.setQueryData(['products'], (oldData: Product[]) => {
				return oldData.filter(p => p.id !== product.id)
			})
		},
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between gap-4">
				<CardTitle>{product.name}</CardTitle>
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
					<b>Cena</b>: {product.price} Kč
				</p>
				<p>
					<b>Zásoby</b>: {product.stock} ks
				</p>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2">
				<Link
					className="w-full"
					to={`/${product.id}/edit-product`}
					prefetch="intent"
					unstable_viewTransition
				>
					<Button className="w-full" variant={'outline'}>
						Upravit
					</Button>
				</Link>
				<Link className="w-full" to={`/${product.id}`} prefetch="intent">
					<Button className="w-full">Detail</Button>
				</Link>

				{error && <ErrorAlert name={error.name} message={error.message} />}
			</CardFooter>
		</Card>
	)
}
