import { useState , useContext } from 'react'
import { Listbox } from '@headlessui/react'
import { cartContext } from './../pages';

const people = [
  { name: 1 , active : false},
  { name: 2 , active : false},
  { name: 3 , active : false},
  { name: 4 , active : false},
  { name: 5 , active : false},
  { name: 6 , active : false},
]

export default function Select(props) {
  const productContext = useContext(cartContext);
  const { cartProduct, setCartProduct , selected, setSelected } = productContext;
  setSelected(people[0])
  const {product} = props;
  const selectedQuantity = people.findIndex(item => item.name === product.quantity)
  people.map(person => {
    person.active = false
  })
  people[selectedQuantity].active = true
  

  const addValue = (person) => {
    product = {
      ...product,
      quantity: Number(person.name)
    }
    setCartProduct(prevState => {
      const newProducts = [...prevState.products]
      
      const prevProduct = newProducts.findIndex(item => item.id === product.id)
      
        newProducts[prevProduct] = {
          ...newProducts[prevProduct],
          quantity: newProducts[prevProduct].quantity = Number(person.name)
        }
      
        return {
          ...prevState,
          products: newProducts,
        }
    })
    setSelected(person);
  }

  return (
    <div className="w-20">
      <Listbox value={selected} onChange={addValue}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{product.quantity}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
            </span>
          </Listbox.Button>
          
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map(( person, personIdx ) => (
                <Listbox.Option key={personIdx} className={() =>`cursor-default select-none relative py-2 px-4 ${person.active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}`}
                  onClick={() => addValue(person)}
                  value={person}  
                >
                  {() => (
                    <>
                      <span
                        className={`block truncate ${
                          person.active ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}
