import { Link } from '@remix-run/react'

import { ModeToggle } from './mode-toggle'

export const Header = () => {
	return (
		<header className="mb-12 w-full bg-primary py-4 text-secondary shadow-lg">
			<div className="container flex items-center justify-between">
				<Link prefetch="intent" to="/">
					<h1 className="text-5xl font-bold">🦊</h1>
				</Link>
				<div className="flex gap-8">
					<nav className="flex items-center space-x-4">
						<Link prefetch="intent" to="/">
							🌳 Produkty
						</Link>
						<Link prefetch="intent" to="">
							😺 Zákazníci
						</Link>
					</nav>
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}
