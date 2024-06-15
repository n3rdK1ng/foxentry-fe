import { cn } from '#utils/misc'

import { ErrorAlert } from './error-alert'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

export const SortSelects = ({
	setValue,
	values,
	order,
	setOrder,
	className,
}: {
	setValue: (value: string) => void
	values: {
		value: string
		label: string
	}[]
	order: 'asc' | 'desc'
	setOrder: (order: 'asc' | 'desc') => void
	className?: string
}) => {
	if (values.length === 0) {
		return <ErrorAlert name={'SortSelects'} message="No values provided" />
	}

	return (
		<div className="flex gap-2">
			<Select onValueChange={setValue}>
				<SelectTrigger className={cn('w-[180px]', className)}>
					<SelectValue placeholder={values[0].label} />
				</SelectTrigger>
				<SelectContent>
					{values.map(item => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select onValueChange={setOrder}>
				<SelectTrigger className="w-[120px]">
					<SelectValue
						placeholder={order === 'asc' ? 'vzestupně' : 'sestupně'}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="asc">vzestupně</SelectItem>
					<SelectItem value="desc">sestupně</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
