interface ProductPageProps {
  params: { products: string[] }
}

const ProductPage = ({ params }: ProductPageProps) => {
  return (
    <div className='fix-height text-3xl font-bold p-5 '>
      ProductPage
      <ul className="mt-7">
        {params.products.map(route => (
          <li className="font-normal text-xl text-gray-600" key={route}>{route}</li>
        ))}
      </ul>
    </div >
  )
}

export default ProductPage