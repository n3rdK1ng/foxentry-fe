import { useQuery } from '@tanstack/react-query'

import { ErrorAlert } from '#components/error-alert'
import { LoadingSpinner } from '#components/loading-spinner'
import { ProductCard } from '#components/product-card'
import { Product } from '#utils/api/types'

export const Products = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['products'],
		queryFn: () =>
			fetch(`${ENV.API_URL}/products`).then(
				res => res.json() as Promise<Product[]>,
			),
	})

	if (isPending) {
		return (
			<div className="flex justify-center w-full">
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return <ErrorAlert name={error.name} message={error.message} />
	}

	return (
		<section className="grid grid-cols-4 gap-4">
			{data.map(product => (
				<ProductCard key={product.name} product={product} />
			))}
		</section>
	)
}