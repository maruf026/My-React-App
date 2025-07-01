import {useState} from 'react'
import Products from './Products';
export default function ProductList() {
  let products = [
    { id: 0, name: "Iphone7", price: 230 },
    { id: 1, name: "Iphone3", price: 430 },
    { id: 2, name: "Iphone54", price: 330 },
  ];
  const [cart, setCart]= useState([]);
  function addtoCart(product){
    setCart((items)=>[...items, product])
  }
  return (
    <div>
      <h1 className="text-4xl text-center">Products</h1>
     {
    products.map((product)=>(
        <Products product={product} handleCart={addtoCart}/>
    ))
     }
      <h2 className="mt-7 text-3xl">Cart Items</h2>
     {
        cart.length=== 0 ? ( <p className="text-center">Cart is Empty</p>): <ul>
            {
                cart.map((item, index)=>(
                    <li key={index}>{item.name} - ${item.price}</li>
                ))
            }
        </ul>
     }
    </div>
  );
}
