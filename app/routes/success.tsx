import { Link } from '@remix-run/react'

import { Button } from '#components/ui/button'

export default function SuccessRoute() {
	return (
		<div className="flex w-full flex-col items-center gap-4">
			<h1 className="text-4xl">✅</h1>
			<Link to="/" prefetch="intent">
				<Button>Zpátky</Button>
			</Link>
		</div>
	)
}
