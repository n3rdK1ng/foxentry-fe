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
}: {
	variant: 'products' | 'customers' | 'orders'
	sortBy: string
	order: 'asc' | 'desc'
}) => {
	const [searchQuery, setSearchQuery] = useState('')

	const queryClient = useQueryClient()

	const generateUrl = (searchQuery: string) => {
		const url = new URL(`${ENV.API_URL}/${variant}`)

		if (searchQuery.trim()) {
			url.pathname += `/search/${searchQuery.trim()}`
		}

		url.searchParams.append('sort-by', sortBy)
		url.searchParams.append('order', order)

		return url.toString()
	}

	const { isPending, error, mutate } = useMutation({
		mutationFn: (url: string) => fetch(url).then(res => res.json()),
		onSuccess: data => {
			queryClient.setQueryData([variant], data)
		},
	})

	const debouncedSearch = useDebouncedCallback(value => {
		if (value.trim() === '') {
			queryClient.invalidateQueries({ queryKey: [variant] })
		} else {
			mutate(generateUrl(value))
		}
	}, 500)

	useEffect(() => {
		mutate(generateUrl(searchQuery))
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
