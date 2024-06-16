import { ActionFunction } from '@remix-run/node'
import { makeDomainFunction } from 'domain-functions'

import { ProductForm } from '#components/product-form'
import { api } from '#utils/api'
import { formAction } from '#utils/form-action'
import { productSchema } from '#utils/form-schemas'
import { generateIdFromName } from '#utils/misc'

const mutation = makeDomainFunction(productSchema)(async values => {
	const updatedValues = {
		...values,
		id: generateIdFromName(values.name),
	}

	const { response } = await api.createProduct(updatedValues)

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
		successPath: '/success?variant=products',
	})

export default function CreateProduct() {
	return <ProductForm variant={'create'} />
}
