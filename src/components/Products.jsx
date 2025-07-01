export default function Products({ product, handleCart }) {
  return (
    <div>
      <div className="card w-96 bg-gray-700 card-md shadow-sm mt-3.5">
        <div className="card-body">
          <h2 className="card-title justify-center">{product.name}</h2>
          <p className="text-center">Price: {product.price}</p>
          <div className="justify-center card-actions">
            <button onClick={()=> handleCart(product)} className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
