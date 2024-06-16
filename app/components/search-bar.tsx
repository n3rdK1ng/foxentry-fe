import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { ErrorAlert } from './error-alert'
import { LoadingSpinner } from './loading-spinner'
import { Input } from './ui/input'

export const SearchBar = ({
	variant,
	sortBy,
	order,
	options,
	altQueryKey,
}: {
	variant: 'products' | 'customers' | 'orders'
	sortBy: string
	order: 'asc' | 'desc'
	options?: string
	altQueryKey?: string
}) => {
	const [searchQuery, setSearchQuery] = useState('')

	const queryClient = useQueryClient()

	const generateUrl = (searchQuery: string, options?: string) => {
		const url = new URL(`${ENV.API_URL}/${variant}`)

		if (options) {
			url.pathname += `/search/${options}`
		}

		if (searchQuery.trim()) {
			if (!options) {
				url.pathname += '/search'
			}

			url.pathname += `/${searchQuery.trim()}`
		}

		url.searchParams.append('sort-by', sortBy)
		url.searchParams.append('order', order)

		return url.toString()
	}

	const { isPending, error, mutate } = useMutation({
		mutationFn: (url: string) => fetch(url).then(res => res.json()),
		onSuccess: data => {
			queryClient.setQueryData([!altQueryKey ? variant : altQueryKey], data)
		},
	})

	const debouncedSearch = useDebouncedCallback(value => {
		if (value.trim() === '' && !altQueryKey) {
			queryClient.invalidateQueries({
				queryKey: [variant],
			})
		} else {
			mutate(generateUrl(value, options))
		}
	}, 500)

	useEffect(() => {
		mutate(generateUrl(searchQuery, options))
	}, [sortBy, order])

	return (
		<div className="relative flex flex-col gap-4">
			<Input
				placeholder="Hledat..."
				onChange={e => {
					setSearchQuery(e.target.value)
					debouncedSearch(e.target.value)
				}}
			/>
			{isPending && <LoadingSpinner className="absolute right-2 top-2" />}
			{error && <ErrorAlert name={error.name} message={error.message} />}
		</div>
	)
}
