import { useQuery } from '@tanstack/react-query';
import { ErrorAlert } from '#components/error-alert';
import { LoadingSpinner } from '#components/loading-spinner';
import { RouteHeader } from '#components/route-header';
import { Button } from '#components/ui/button';
import type { Product } from '#utils/api/types';


export const ProductDetail = ({ product }: { product: string; }) => {
	const { data, isPending, error } = useQuery({
		queryKey: ['product-' + product],
		queryFn: () => fetch(`${ENV.API_URL}/products/${product}`).then(
			res => res.json() as Promise<Product>
		),
	});

	if (isPending) {
		return (
			<div className="flex w-full justify-center">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <ErrorAlert name={error.name} message={error.message} />;
	}

	return (
		<>
			<RouteHeader
				title={data.name}
				buttonLink={'edit-product'}
				button={<Button className="gap-2">
					⚙️
					<p className="hidden sm:block">Upravit produkt</p>
				</Button>} />
			<p>
				<b>Cena</b>: {data.price} Kč
			</p>
			<p>
				<b>Zásoby</b>: {data.stock} ks
			</p>
		</>
	);
};
