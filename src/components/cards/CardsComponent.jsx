import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import CardItemComponent from "./CardItemComponent";
import Loading from "../Loading";

function CardsComponent({ className }) {
  const dispatch = useDispatch();

  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  const productList = [];
  let lastCategory = null;

  products?.forEach((product) => {
    if (product.category !== lastCategory) {
      productList.push(
        <h3 
          className="text-center sm:text-left col-span-full text-2xl capitalize font-medium mt-10">
          {product.category}
        </h3>
      );
    }

    productList.push(
      <CardItemComponent 
        key={product.id} 
        product={product} 
      />
    );

    lastCategory = product.category;
  })

  return (
    <div className={className} id="product-list">
      {productList}
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default CardsComponent;
