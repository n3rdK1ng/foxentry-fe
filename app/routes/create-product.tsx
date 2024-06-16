import { ActionFunction } from '@remix-run/node'
import { makeDomainFunction } from 'domain-functions'

import { ProductForm } from '#components/product-form'
import { api } from '#utils/api'
import { formAction } from '#utils/form-action'
import { productSchema } from '#utils/form-schemas'

const mutation = makeDomainFunction(productSchema)(async values => {
	const { response } = await api.createProduct(values)

	if (!response.ok) {
		if (response.status === 409) {
			throw new Error('Produkt již existuje')
		}
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

export default function CreateProduct() {
	return <ProductForm variant={'create'} />
}
