import { z } from 'zod'

export const productSchema = z.object({
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

export const customerSchema = z.object({
	name: z
		.string()
		.min(1, 'Jméno musí obsahovat alespoň 1 znak')
		.max(255, 'Jméno může obsahovat maximálně 255 znaků'),
	yield: z.number(),
	purchases: z.number(),
})

export const orderSchema = z.object({
	productName: z
		.string()
		.min(1, 'Název produktu musí obsahovat alespoň 1 znak')
		.max(255, 'Název může obsahovat maximálně 255 znaků'),
	customerName: z
		.string()
		.min(1, 'Jméno zákazníka musí obsahovat alespoň 1 znak')
		.max(255, 'Název může obsahovat maximálně 255 znaků'),
	price: z.number(),
	amount: z
		.number()
		.min(1, 'Množství musí být větší než 1')
		.int('Množství musí být celé číslo'),
})
