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
			fetch(`${ENV.API_URL}/products/${product.name}`, { method: 'DELETE' }),
		onSuccess: () => {
			queryClient.setQueryData(['products'], (oldData: Product[]) => {
				return oldData?.filter(p => p.name !== product.name)
			})
		},
	})

	return (
		<Card key={product.name}>
			<CardHeader className="flex-row justify-between items-center gap-4">
				<CardTitle>{product.name}</CardTitle>
				<Button
					variant={'destructive'}
					size={'icon'}
					className="shrink-0"
					onClick={() => mutate()}
				>
					{!isPending ? <TrashIcon className="w-4 h-4" /> : <LoadingSpinner />}
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
			<CardFooter className="flex-col gap-2 items-start">
				<Button className="w-full">Detail</Button>

				{error && <ErrorAlert name={error.name} message={error.message} />}
			</CardFooter>
		</Card>
	)
}
