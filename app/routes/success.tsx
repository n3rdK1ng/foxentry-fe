import { Link, useSearchParams } from '@remix-run/react'

import { Button } from '#components/ui/button'

export default function SuccessRoute() {
	const [searchParams] = useSearchParams()

	const variant = searchParams.get('variant')

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<h1 className="text-4xl">✅</h1>
			<h2 className="text-2xl">
				{variant === 'products' && 'Produkt byl úspěšně vytvořen'}
				{variant === 'customers' && 'Zákazník byl úspěšně vytvořen'}
				{variant === 'orders' && 'Objednávka byla úspěšně vytvořena'}
			</h2>
			<Link to={variant !== 'products' ? `/${variant}` : '/'} prefetch="intent">
				<Button>
					Zpátky na {variant === 'products' && 'produkty'}
					{variant === 'customers' && 'zákazníky'}
					{variant === 'orders' && 'objednávky'}
				</Button>
			</Link>
		</div>
	)
}
