import TableRowCompnent from "./TableRowComponent";
import TableHeaderComponent from "./TableHeaderComponent";

function TableComponent({ products }) {
  return (
    <table className="mt-10 xl:max-w-[1400px] mx-auto relative">
      <thead className="sticky top-20 z-50 bg-white">
      <TableHeaderComponent
        className="hidden md:grid grid-cols-[2fr_1fr] py-5 border-b border-gray-200 text-left uppercase text-gray-400 grid gap-x-10"
        titles={["Products", "Stock"]}
      />
      </thead>
      <tbody>
        {products?.map((product) => (
          <TableRowCompnent 
            className="grid grid-cols p-5 md:grid-cols-[2fr_1fr] md:gap-x-10 border-b border-gray-200 even:bg-gray-50"
            product={product} 
            key={product.id} 
          />
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
