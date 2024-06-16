import { ActionFunction } from '@remix-run/node'
import { makeDomainFunction } from 'domain-functions'
import { v4 as uuidv4 } from 'uuid'

import { OrderForm } from '#components/order-form'
import { api } from '#utils/api'
import { formAction } from '#utils/form-action'
import { orderSchema } from '#utils/form-schemas'
import { generateIdFromName } from '#utils/misc'

const mutation = makeDomainFunction(orderSchema)(async values => {
	const updatedValues = {
		...values,
		productId: generateIdFromName(values.productName),
		customerId: generateIdFromName(values.customerName),
		id: uuidv4(),
	}

	const { response } = await api.createOrder(updatedValues)

	if (!response.ok) {
		if (response.status === 409) {
			throw new Error('Objednávka již existuje')
		}
		if (response.status === 404) {
			throw new Error('Produkt nebo zákazník neexistuje')
		}
		if (response.status === 400) {
			throw new Error('Dané množství není dostupné')
		}

		throw new Error(`Nepodařilo se vytvořit objednávka: ${response.statusText}`)
	}
})

export const action: ActionFunction = async ({ request }) =>
	formAction({
		request,
		schema: orderSchema,
		mutation,
		successPath: '/success?variant=orders',
	})

export default function CreateOrderRoute() {
	return <OrderForm />
}
