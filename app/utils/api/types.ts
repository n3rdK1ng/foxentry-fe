export type Product = {
	id: string
	name: string
	price: number
	stock: number
}

export type Customer = {
	id: string
	name: string
	yield: number
	purchases: number
}

export type Order = {
	id: string
	productId: string
	customerId: string
	productName: string
	customerName: string
	price: number
	amount: number
}
