import { z } from 'zod'

const schema = z.object({
	NODE_ENV: z.enum(['production', 'development'] as const),
	API_URL: z.enum([
		'http://localhost:3000',
		'https://foxentry-be.vercel.app',
	] as const),
})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof schema> {}
	}
}

export async function initEnv() {
	const parsed = schema.safeParse(process.env)

	if (parsed.success === false) {
		console.error(
			'❌ Invalid environment variables:',
			parsed.error.flatten().fieldErrors,
		)

		throw new Error('Invalid environment variables')
	}

	try {
		const apiServerCheck = await fetch(parsed.data.API_URL)

		const bodyString = await apiServerCheck.text()
		if (bodyString !== 'Hello World!') {
			throw new Error('API server is not available')
		}
	} catch (error) {
		console.error(error)
		throw new Error('API server is not available')
	}
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
	return {
		MODE: process.env.NODE_ENV,
		API_URL: process.env.API_URL,
	}
}

type ENV = ReturnType<typeof getEnv>

declare global {
	// eslint-disable-next-line no-var
	var ENV: ENV
	interface Window {
		ENV: ENV
	}
}
