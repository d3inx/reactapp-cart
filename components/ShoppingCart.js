/* This example requires Tailwind CSS v2.0+ */
import {  useContext } from "react";
import Select from "./Select";
import { cartContext } from "./../pages";
import Image from "next/image"



export default function ShoppingCart() {

  const productContext = useContext(cartContext)
  const {cartProduct , setCartProduct ,  order } = productContext;
  const {orders} = order;

  const deleteProduct = (product) => {
    const newProducts = cartProduct.products.filter(item => item.id !== product.id)
    setCartProduct(prevState => {
      return {
        products : [
          ...newProducts
        ]
      }
    })
  }

  return (
    <>
      <div className=" font-sans font-bold">
        <div className="pointer-events-none flex flex-col">
          <div className="flex items-start justify-between">
            <div className="text-3xl font-medium text-gray-900 my-6">
              {" "}
              Shopping cart{" "}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-10 lg:space-x-10">
            <div className="pointer-events-auto w-full lg:w-3/5">
              <div className="flex h-full flex-col bg-white ">
                <div className="sm:px-6 lg:px-0">
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6">
                        {cartProduct.products.map((product) => (
                          <li
                            key={product.id}
                            className="flex py-6 border-t-2 border-gray-200"
                          >
                            <div className="h-48 w-h-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center"
                                width={200}
                                height={200}
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a
                                      href={product.href}
                                      className="text-gray-500 font-bold"
                                    >
                                      {" "}
                                      {product.name}{" "}
                                    </a>
                                  </h3>

                                  <Select product={product} />

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    onClick={() => deleteProduct(product)}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.color}
                                </p>
                                <p>{`$${product.price}`}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {product.quantity}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 p-6 bg-slate-100 rounded-3xl h-max">
              <div className="text-2xl mb-4">Order Summery</div>
              <div className="flex flex-col divide-y-2 divide-gray-200">
                <div className="flex justify-between w-full py-4">
                  <div className="text-gray-500">Subtotal</div>
                  <div>${orders.Subtotal}</div>
                </div>
                <div className="flex justify-between w-full py-4">
                  <div className="text-gray-500">Tax</div>
                  <div>${orders.tax}</div>
                </div>
                <div className="flex justify-between w-full py-4">
                  <div className="text-gray-500">shipping</div>
                  <div>$0.00</div>
                </div>
                <div className="flex justify-between w-full py-4">
                  <div className="text-lg">Order Total</div>
                  <div>${orders.Total}</div>
                </div>
              </div>
              <button className="w-full py-4 rounded-xl mt-4 text-white bg-indigo-800">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
