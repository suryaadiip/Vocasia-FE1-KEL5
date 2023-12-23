import { useSelector } from "react-redux";
import CartBoxComponent from "../components/cart/CartBoxComponent";
import CartItemComponent from "../components/cart/CartItemComponent";
import { getAllCart } from "../features/cartSlice";

function CartPages() {
  const cartProducts = useSelector(getAllCart);

  if (!cartProducts.length) {
    return (
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-center py-10">
          <img src="./images/cart-empty.png" alt="Empty Cart" className="md-auto h-68 mb-4" />
          <p className="text-gray-500 text-lg">Anda belom Belanja Apapun</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols px-5 sm:px-10 md:px-12 xl:max-w-[1400px] md:grid-cols-[2fr_1fr] mx-auto xl:px-0 gap-10 lg:gap-20 md:py-12">
      <CartItemComponent 
        cartProducts={cartProducts} 
      />
      <CartBoxComponent cartProducts={cartProducts} />
    </div>
  );
}

export default CartPages;
