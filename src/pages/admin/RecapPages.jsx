import React from "react";
import { useSelector } from "react-redux";
import { getAllCheck } from "../../features/cartSlice";

function RecapPages() {
  const checkProduct = useSelector(getAllCheck);

  return (
    <div className="overflow-x-auto xl:max-w-[1400px] mx-auto my-10">
      <table className="table-auto min-w-full">
        <thead>
          <tr className="uppercase text-left border-b border-gray-300 text-gray-500">
            <th className="py-5">Products</th>
            <th className="px-10 py-5">Harga</th>
            <th className="px-10 py-5">Terjual</th>
            <th className="px-10 py-5">Pendapatan</th>
          </tr>
        </thead>
        <tbody>
          {checkProduct?.map((item) => (
            <tr
              className="even:bg-gray-100" 
              key={item.id}>
              <td className="py-5">
                <div className="flex items-center">
                  <img
                    className="w-24 h-24 object-contain mr-4"
                    src={item.image}
                    alt=""
                  />
                  <div className="px-6">
                    <div className="font-medium text-lg mb-2">{item.title}</div>
                    <div className="block text-md mb-2">{item.category}</div>
                    <p className="text-gray-400 text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-10 py-5">
                <div className="text-left">{item.price}</div>
              </td>
              <td className="px-10 py-5">
                <div className="text-left">{item.qty}</div>
              </td>
              <td className="px-10 py-5">
                <div className="text-left">{item.qty * item.price}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full font-medium py-10 flex justify-between">
        <span className="uppercase text-gray-500">
          Total Pendapatan
        </span>
        <span className="text-gray-500 mr-16">
          Rp {" "}
          {checkProduct
            .reduce((sum, item) => (
              sum + item.qty * item.price
            ), 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default RecapPages;
