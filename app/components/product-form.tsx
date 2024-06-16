import type { Product } from '#utils/api/types'
import { Form } from '#utils/form'
import { productSchema } from '#utils/form-schemas'

import { ErrorAlert } from './error-alert'
import { RouteHeader } from './route-header'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const ProductForm = ({
	variant,
	product,
}: {
	variant: 'create' | 'edit'
	product?: Product
}) => {
	if (variant === 'edit' && !product) {
		return <ErrorAlert name="Produktový formulář" message="Produkt nenalezen" />
	}

	return (
		<section className="flex flex-col items-center">
			<div className="w-full sm:w-2/3">
				<RouteHeader
					title={variant === 'edit' ? product?.name ?? '' : 'Nový produkt'}
					buttonLink=".."
					button={
						<Button variant="outline" size="icon">
							❌
						</Button>
					}
				/>
				<Form
					values={
						variant === 'edit'
							? {
									name: product?.name,
									price: product?.price,
									stock: product?.stock,
								}
							: undefined
					}
					schema={productSchema}
					buttonComponent={Button}
					className="flex w-full flex-col items-center space-y-6 sm:items-start"
				>
					{({ Field, Errors, Button, register }) => (
						<>
							<Field name="name" className="w-full">
								{({ Errors, SmartInput }) => (
									<>
										<Label htmlFor="name">Název produktu</Label>
										<Input
											placeholder="Jahody"
											disabled={variant === 'edit'}
											{...register('name')}
										/>
										{variant === 'edit' && <SmartInput className="hidden" />}
										<Errors className="mt-1 text-sm text-red-800" />
									</>
								)}
							</Field>
							<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
								<Field name="price" className="w-full">
									{({ Errors }) => (
										<>
											<Label htmlFor="price">Cena (Kč)</Label>
											<Input
												placeholder="299"
												type="number"
												{...register('price')}
											/>
											<Errors className="mt-1 text-sm text-red-800" />
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
											<Errors className="mt-1 text-sm text-red-800" />
										</>
									)}
								</Field>
							</div>
							<Errors className="text-sm text-red-800" />
							<Button type="submit" className="w-full">
								{variant === 'create' ? 'Vytvořit' : 'Upravit'} produkt
							</Button>
						</>
					)}
				</Form>
			</div>
		</section>
	)
}
