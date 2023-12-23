import { useState } from "react";
import Button from "../button/Button";
import { updateStock } from "../../features/productSlice";
import { useDispatch } from "react-redux"

export default function TableRowComponent({className, product }) {
  const dispatch = useDispatch();

  const [stock, setStock] = useState(product.stock);

  const handleStockChange = (event) => {
    setStock(Number(event.target.value));
  }

  const handleUpdateStock = (id) => {
    dispatch(updateStock({id, stock}));
  }

  return (
    <tr className={className}>
      <td className="flex gap-x-3 w-full">
        <img
          className="w-32 object-contain p-3" 
          src={product.image} 
          alt={product.title}
        />
        <div>
          <h4 
            className="font-medium text-lg mb-2">
            {product.title}
          </h4>
          <p 
            className="block text-md mb-2 text-gray-500">
            {product.category}
          </p>
          <div className="flex mt-5 max-w-xs gap-x-3 md:hidden">
            <input
              className="border border-slate-300 w-full px-3 rounded-md focus:outline-none focus:border-2 focus:border-[#ffa500]"
              value={stock} 
              type="text"
              onChange={handleStockChange} />

            <Button
              className="bg-[#ffa500] hover:bg-[#070707] text-white font-bold px-3 py-2 text-sm font-medium rounded-md"
              type="button"
              onClick={() => handleUpdateStock(product.id)}>
                Update
            </Button>
          </div>
        </div>
      </td>
      <td className="hidden md:flex h-max gap-x-3">
        <input
          className="border border-slate-300 max-w-sm px-3 rounded-md focus:outline-none focus:border-2 focus:border-[#ffa500]"
          value={stock} 
          type="text"
          onChange={handleStockChange} />

          <Button
            className="bg-[#ffa500] hover:bg-[#070707] text-white font-bold px-3 py-2 text-sm font-medium rounded-md"
            type="button"
            onClick={() => handleUpdateStock(product.id)}>
              Update
          </Button>
      </td>
      {/* <td className="hidden">
        <Button
          className="bg-blue-700 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={() => handleUpdateStock(product.id)}>
            Update
        </Button>
      </td> */}
    </tr>
  )
}