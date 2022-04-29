import react from "react";
import { useState , useEffect } from "react";

import ProductCard from "./../components/productCard";
import ShoppingCart from "./../components/ShoppingCart";
export const cartContext = react.createContext();

export default function Home() {
  const [cartProduct, setCartProduct] = useState({products : []});
  const [order , setOrder] = useState({orders : {Subtotal : 0 , tax : 0 , Total : 0}})
  const [selected, setSelected] = useState()

  useEffect(() => {
    setOrder(prevState => {
      const subTotalVal = 0;
      let taxVal = 0;
      cartProduct.products.map(product => {
        subTotalVal += product.price * product.quantity
      })
      subTotalVal > 0 && subTotalVal < 300 ? taxVal = 19 : null
      return {
        orders : {
          Subtotal : subTotalVal ,
          tax : taxVal,
          Total : subTotalVal + taxVal
        }
      }
    })
  },[cartProduct])

  return (
    <cartContext.Provider value={{cartProduct , setCartProduct , selected, setSelected , order , setOrder}}>
      <div className="container mx-auto">
        <div className="products my-12 flex flex-wrap">
          <ProductCard />
        </div>
        <ShoppingCart />
      </div>
    </cartContext.Provider>
  );
}
