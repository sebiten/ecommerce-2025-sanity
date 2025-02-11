import React from 'react';
import { Category, Product } from '../../sanity.types';
import ProductGrid from './ProductGrid';

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

export default function ProductsView({ products }: ProductsViewProps) {
    return (
        <div>
            {/* categories */}
            <div className='w-full sm:w-[200px]'>
                {/* <CategoriesSelectorComponent categories={categories} /> */}
            </div>
            {/* products */}
            <div className='flex-1'>
                <div>
                    <ProductGrid products={products} />
                </div>
                <hr className='w-1/2 sm:w-3/4' />
            </div>
        </div>
    );
}