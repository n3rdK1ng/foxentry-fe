import { type ActionFunction } from '@remix-run/node'
import { useRouteLoaderData } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import { makeDomainFunction } from 'domain-functions'

import { ErrorAlert } from '#components/error-alert'
import { LoadingSpinner } from '#components/loading-spinner'
import { ProductForm } from '#components/product-form'
import { api } from '#utils/api'
import type { Product } from '#utils/api/types'
import { formAction } from '#utils/form-action'
import { productSchema } from '#utils/form-schemas'
import { generateIdFromName } from '#utils/misc'

import { loader as productLoader } from './$product'

const mutation = makeDomainFunction(productSchema)(async values => {
	const updatedValues = {
		...values,
		id: generateIdFromName(values.name),
	}

	const { response } = await api.editProduct(updatedValues)

	if (!response.ok) {
		throw new Error(`Nepodařilo se vytvořit produkt: ${response.statusText}`)
	}
})

export const action: ActionFunction = async ({ request }) =>
	formAction({
		request,
		schema: productSchema,
		mutation,
		successPath: '/',
	})

export default function ProductEditRoute() {
	const { product } =
		useRouteLoaderData<typeof productLoader>('routes/$product')!

	const { data, isPending, error } = useQuery({
		queryKey: ['product-' + product],
		queryFn: () =>
			fetch(`${ENV.API_URL}/products/${product}`).then(
				res => res.json() as Promise<Product>,
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

	return <ProductForm variant={'edit'} product={data} />
}
