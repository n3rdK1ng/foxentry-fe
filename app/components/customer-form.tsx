import { Form } from '#utils/form'
import { customerSchema } from '#utils/form-schemas'

import { RouteHeader } from './route-header'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const CustomerForm = () => {
	return (
		<section className="flex flex-col items-center">
			<div className="w-full sm:w-2/3">
				<RouteHeader
					title={'Nový zákazník'}
					buttonLink="/customers"
					button={
						<Button variant="outline" size="icon">
							❌
						</Button>
					}
				/>
				<Form
					values={{
						name: '',
						yield: 0,
						purchases: 0,
					}}
					schema={customerSchema}
					buttonComponent={Button}
					className="flex w-full flex-col items-center space-y-6 sm:items-start"
				>
					{({ Field, Errors, Button, register }) => (
						<>
							<Field name="name" className="w-full">
								{({ Errors }) => (
									<>
										<Label htmlFor="name">Jméno</Label>
										<Input placeholder="Jan Novák" {...register('name')} />
										<Errors className="mt-1 text-sm text-red-800" />
									</>
								)}
							</Field>
							<div className="hidden">
								<Field name="yield">{({ SmartInput }) => <SmartInput />}</Field>
								<Field name="purchases">
									{({ SmartInput }) => <SmartInput />}
								</Field>
							</div>
							<Errors className="text-sm text-red-800" />
							<Button type="submit" className="w-full">
								Vytvořit zákazníka
							</Button>
						</>
					)}
				</Form>
			</div>
		</section>
	)
}
