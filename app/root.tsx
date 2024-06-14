import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import clsx from 'clsx'
import { useState } from 'react'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'

import { Header } from '#components/header'
import { getEnv } from '#utils/env.server'
import { themeSessionResolver } from '#utils/sessions.server'

import tailwindStyleSheetUrl from './tailwind.css?url'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
	{
		rel: 'icon',
		type: 'image/svg+xml',
		sizes: 'any',
		href:
			'data:image/svg+xml,' +
			'<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>' +
			'<text y=%22.9em%22 font-size=%2290%22>🦊</text></svg>',
	},
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
				<main className="flex h-screen flex-col justify-between">
					<Header />

					<div className="container">
						<Outlet />
						<ReactQueryDevtools initialIsOpen={false} />
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

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// With SSR, we usually want to set some default staleTime
						// above 0 to avoid refetching immediately on the client
						staleTime: 60 * 1000,
					},
				},
			}),
	)

	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ThemeProvider>
	)
}
