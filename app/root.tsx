import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import clsx from 'clsx'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'

import { Header } from '#components/header'
import { getEnv } from '#utils/env.server'
import { themeSessionResolver } from '#utils/sessions.server'

import tailwindStyleSheetUrl from './tailwind.css?url'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
]

export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request)
	return {
		ENV: getEnv(),
		theme: getTheme(),
	}
}

export function App() {
	const data = useLoaderData<typeof loader>()
	const [theme] = useTheme()

	return (
		<html lang="en" className={clsx(theme)}>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				<Links />
			</head>
			<body>
				<main className="flex flex-col justify-between h-screen">
					<Header />

					<div className="container">
						<Outlet />
					</div>

					<footer className="py-10"></footer>
				</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
			<App />
		</ThemeProvider>
	)
}
