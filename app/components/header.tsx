import { Link } from '@remix-run/react'

import { ModeToggle } from './mode-toggle'

export const Header = () => {
	return (
		<header className="mb-12 w-full bg-primary py-4 text-secondary shadow-lg">
			<div className="container flex items-center justify-between">
				<Link prefetch="intent" to="/">
					<div className="text-5xl font-bold">🦊</div>
				</Link>
				<div className="flex gap-4 sm:gap-8">
					<nav className="flex items-center space-x-4">
						<Link className="flex gap-2" prefetch="intent" to="/">
							🌳 <div className="hidden sm:block">Produkty</div>
						</Link>
						<Link className="flex gap-2" prefetch="intent" to="/">
							😺 <div className="hidden sm:block">Zákazníci</div>
						</Link>
					</nav>
					<ModeToggle />
				</div>
			</div>
		</header>
	)
}
