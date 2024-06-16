import { ActionFunction } from '@remix-run/node'
import { makeDomainFunction } from 'domain-functions'

import { CustomerForm } from '#components/customer-form'
import { api } from '#utils/api'
import { formAction } from '#utils/form-action'
import { customerSchema } from '#utils/form-schemas'
import { generateIdFromName } from '#utils/misc'

const mutation = makeDomainFunction(customerSchema)(async values => {
	const updatedValues = {
		...values,
		id: generateIdFromName(values.name),
	}

	const { response } = await api.createCustomer(updatedValues)

	if (!response.ok) {
		if (response.status === 409) {
			throw new Error('Zákazník již existuje')
		}
		throw new Error(`Nepodařilo se vytvořit zákazníka: ${response.statusText}`)
	}
})

export const action: ActionFunction = async ({ request }) =>
	formAction({
		request,
		schema: customerSchema,
		mutation,
		successPath: '/success?variant=customers',
	})

export default function CreateCustomer() {
	return <CustomerForm />
}
