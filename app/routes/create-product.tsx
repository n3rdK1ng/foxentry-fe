import { ActionFunction } from '@remix-run/node'
import { makeDomainFunction } from 'domain-functions'
import { z } from 'zod'

import { Button } from '#components/ui/button'
import { Input } from '#components/ui/input'
import { Label } from '#components/ui/label'
import { api } from '#utils/api'
import { Form } from '#utils/form'
import { formAction } from '#utils/form-action'

const schema = z.object({
	name: z
		.string()
		.min(1, 'Název musí obsahovat alespoň 1 znak')
		.max(255, 'Název může obsahovat maximálně 255 znaků'),
	price: z.number().min(0.01, 'Cena musí být větší než 0.01'),
	stock: z
		.number()
		.min(0, 'Počet na skladě musí být větší nebo roven 0')
		.int('Počet na skladě musí být celé číslo'),
})

const mutation = makeDomainFunction(schema)(async values => {
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
		schema,
		mutation,
		successPath: '/',
	})

export default function CreateProduct() {
	return (
		<main className="w-full flex flex-col items-center justify-center h-screen container">
			<Form
				schema={schema}
				buttonComponent={Button}
				className="sm:w-2/3 w-full items-center flex flex-col sm:items-start space-y-6"
			>
				{({ Field, Errors, Button, register }) => (
					<>
						<Field name="name" className="w-full">
							{({ Errors }) => (
								<>
									<Label htmlFor="name">Název produktu</Label>
									<Input placeholder="Jahody" {...register('name')} />
									<Errors className="text-red-800 text-sm mt-1" />
								</>
							)}
						</Field>
						<div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
							<Field name="price" className="w-full">
								{({ Errors }) => (
									<>
										<Label htmlFor="price">Cena (Kč)</Label>
										<Input
											placeholder="299"
											type="number"
											{...register('price')}
										/>
										<Errors className="text-red-800 text-sm mt-1" />
									</>
								)}
							</Field>
							<Field name="stock" className="w-full">
								{({ Errors }) => (
									<>
										<Label htmlFor="stock">Zásoby (ks)</Label>
										<Input
											placeholder="24"
											type="number"
											{...register('stock')}
										/>
										<Errors className="text-red-800 text-sm mt-1" />
									</>
								)}
							</Field>
						</div>
						<Errors className="text-red-800 text-sm" />
						<Button type="submit" className="w-full">
							Vytvořit produkt
						</Button>
					</>
				)}
			</Form>
		</main>
	)
}
