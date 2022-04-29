import { useContext } from "react";
import { cartContext } from "./../pages";
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    price: 90.00,
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    price: 32.00,
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  {
    id: 3,
    name: "Tea Medium Bottle",
    price: 19.00,
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

const ProductCard = () => {
  const productContext = useContext(cartContext);
  const { cartProduct , setCartProduct , setOrder } = productContext;

  const AddToCart = (myProduct, e) => {
    e.preventDefault();
    setCartProduct(prevState => {
      const newProducts = [...prevState.products]
      
      const prevProduct = newProducts.findIndex(item => item.id === myProduct.id)
      if (prevProduct > -1) {
        newProducts[prevProduct] = {
          ...newProducts[prevProduct],
          quantity: newProducts[prevProduct].quantity < 6 ? newProducts[prevProduct].quantity + 1 : newProducts[prevProduct].quantity
        }
      } else {
        newProducts.push(myProduct)
        }
        return {
          ...prevState,
          products: newProducts,
        }
      })
    setOrder(prevState => {
      const subTotalVal =  myProduct.price * myProduct.quantity
      return {
        orders : {
          Subtotal : subTotalVal,
          tax : 19,
          Total : subTotalVal + 19
        }
      }
    })
  };

  return (
    <>
      {products.map((product) => (
        <div className="w-full lg:w-1/3 " key={product.id}>
          <div className="flex flex-col lg:flex-row bg-gray-100 rounded-2xl m-4 ">
          <div className="flex-none w-full h-40 lg:h-auto lg:auto lg:w-48 relative">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              className="absolute inset-0 w-full h-full object-cover rounded-l-2xl"
              layout="fill"
            />
          </div>
          <form className="flex-auto p-6">
            <div className="flex flex-wrap pb-6 border-b border-slate-200">
              <h1 className="flex-auto text-lg font-semibold text-slate-900">
                {product.name}
              </h1>
              <div className="text-lg font-semibold text-slate-500">
                {`$${product.price}`}
              </div>
            </div>
            <div className="flex space-x-4 my-6 text-sm font-medium">
              <div className="flex-auto flex space-x-4">
                <button
                  className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                  onClick={(e) => AddToCart(product, e)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-700">
              Free shipping on all continental US orders.
            </p>
          </form>
        </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
