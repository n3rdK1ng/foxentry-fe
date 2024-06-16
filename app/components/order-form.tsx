import { Form } from '#utils/form'
import { orderSchema } from '#utils/form-schemas'

import { RouteHeader } from './route-header'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const OrderForm = () => {
	return (
		<section className="flex flex-col items-center">
			<div className="w-full sm:w-2/3">
				<RouteHeader
					title={'Nová objednávka'}
					buttonLink="/orders"
					button={
						<Button variant="outline" size="icon">
							❌
						</Button>
					}
				/>
				<Form
					values={{
						productName: '',
						customerName: '',
						amount: '',
						price: 0,
					}}
					schema={orderSchema}
					buttonComponent={Button}
					className="flex w-full flex-col items-center space-y-6 sm:items-start"
				>
					{({ Field, Errors, Button, register }) => (
						<>
							<Field name="productName" className="w-full">
								{({ Errors }) => (
									<>
										<Label htmlFor="name">Název produktu</Label>
										<Input placeholder="Jahody" {...register('productName')} />
										<Errors className="mt-1 text-sm text-red-800" />
									</>
								)}
							</Field>
							<Field name="customerName" className="w-full">
								{({ Errors }) => (
									<>
										<Label htmlFor="name">Jméno</Label>
										<Input
											placeholder="Jan Novák"
											{...register('customerName')}
										/>
										<Errors className="mt-1 text-sm text-red-800" />
									</>
								)}
							</Field>
							<Field name="amount" className="w-full">
								{({ Errors }) => (
									<>
										<Label htmlFor="amount">Množství</Label>
										<Input
											placeholder="64"
											type="number"
											{...register('amount')}
										/>
										<Errors className="mt-1 text-sm text-red-800" />
									</>
								)}
							</Field>
							<Field name="price" className="hidden">
								{({ SmartInput }) => <SmartInput />}
							</Field>
							<Errors className="text-sm text-red-800" />
							<Button type="submit" className="w-full">
								Vytvořit objednávku
							</Button>
						</>
					)}
				</Form>
			</div>
		</section>
	)
}
