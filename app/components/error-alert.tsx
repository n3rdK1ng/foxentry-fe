import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export const ErrorAlert = ({
	name,
	message,
}: {
	name: string
	message: string
}) => {
	return (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>{name}</AlertTitle>
			<AlertDescription>{message || 'An error occurred.'}</AlertDescription>
		</Alert>
	)
}
