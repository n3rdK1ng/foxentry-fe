import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDebouncedCallback } from 'use-debounce'

import { Product } from '#utils/api/types'

import { ErrorAlert } from './error-alert'
import { LoadingSpinner } from './loading-spinner'
import { Input } from './ui/input'

export const SearchBar = () => {
	const queryClient = useQueryClient()

	const { isPending, error, mutate } = useMutation({
		mutationFn: (searchQuery: string) =>
			fetch(`${ENV.API_URL}/products/search/${searchQuery}`).then(
				res => res.json() as Promise<Product[]>,
			),
		onSuccess: data => {
			queryClient.setQueryData(['products'], data)
		},
	})

	const debouncedSearch = useDebouncedCallback(value => {
		if (value.trim() === '') {
			queryClient.invalidateQueries({ queryKey: ['products'] })
		} else {
			mutate(value)
		}
	}, 500)

	return (
		<div className="relative flex flex-col gap-4">
			<Input
				placeholder="Hledat..."
				onChange={e => debouncedSearch(e.target.value)}
			/>
			{isPending && <LoadingSpinner className="absolute right-2 top-2" />}
			{error && <ErrorAlert name={error.name} message={error.message} />}
		</div>
	)
}
