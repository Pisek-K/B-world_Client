import CartCard from '@/components/card/CartCard'
import ProductCard from '@/components/card/ProductCard'
import SearchCard from '@/components/card/SearchCard'
import useEcomStore from '@/store/ecom-store'
import React, { useEffect } from 'react'

const Shop = () => {
  const getProduct = useEcomStore(state => state.getProduct)
  const products = useEcomStore(state => state.products)

  useEffect(() => {
    getProduct()
  }, [])
  
  return (
    <div className='flex'>
      <div className="w-1/4 p-4 bg-purple-200 h-screen">
        <SearchCard />
      </div>
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className='text-2xl font-bold mb-4'>All Product</p>
        <div className="flex flex-wrap gap-4 ">
          {
            products.map((item,index) => (
              <ProductCard key={index} item={item} />
            ))
          }
        </div>
      </div>
      <div className="w-1/4 p-4 bg-blue-100 overflow-y-auto h-screen">
        <CartCard />
      </div>
    </div>
  )
}

export default Shop