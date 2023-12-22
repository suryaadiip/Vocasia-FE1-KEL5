import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableComponent from "../../components/table/TableComponent";
import Loading from "../../components/Loading";
import { fetchProducts } from "../../features/productSlice";

function AdminHomePages() {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="md:container md:mx-auto">
      <Loading isLoading={isLoading} />
      <TableComponent products={products} />
    </div>
  );
}

export default AdminHomePages;
