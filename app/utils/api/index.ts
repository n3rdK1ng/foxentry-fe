import { combineHeaders } from '#utils/misc'

import { Customer, Order, Product } from './types'

export type ErrorResponse = {
	error: unknown
}

const baseFetch = async <TData>(url: string, options: RequestInit = {}) => {
	const response = await fetch(`${ENV.API_URL}/${url}`, {
		...options,
		headers: combineHeaders(
			{ 'Content-Type': 'application/json' },
			options?.headers,
		),
	})

	const data = (await response.json()) as TData | ErrorResponse

	if (typeof data === 'object' && data && 'error' in data) {
		throw new Error(`API returned error: ${data.error}`)
	}

	return { response, data }
}

export const api = {
	getProducts: () => baseFetch<Product[]>('products'),
	createProduct: (product: Product) =>
		baseFetch<Product>(`products/${product.id}`, {
			method: 'POST',
			body: JSON.stringify(product),
		}),
	editProduct: (product: Product) =>
		baseFetch<Product>(`products/${product.id}`, {
			method: 'PATCH',
			body: JSON.stringify(product),
		}),
	createCustomer: (customer: Customer) =>
		baseFetch<Customer>(`customers/${customer.id}`, {
			method: 'POST',
			body: JSON.stringify(customer),
		}),
	createOrder: (order: Order) =>
		baseFetch<Order>(`orders/${order.id}`, {
			method: 'POST',
			body: JSON.stringify(order),
		}),
}
