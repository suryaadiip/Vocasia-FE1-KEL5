import { setCheckout, clearCart } from "../../features/cartSlice";
import { useNavigate } from "react-router";
import { checkoutProducts } from "../../features/productSlice";
import { useDispatch } from "react-redux";

function CartBoxComponent({ cartProducts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    cartProducts.forEach((item) => {
      dispatch(checkoutProducts({ productId: item.id, quantity: item.qty }));
    });
    
    dispatch(setCheckout(cartProducts));
    dispatch(clearCart());
    navigate("/", {replace: true});
  };

  return (
    <div className="px-6 py-10 border border-gray-300 max-w-full md:max-w-sm h-max rounded-lg grid grid-cols-2 gap-y-5">
      <p className="text-gray-700">
        Quantity Total
      </p>
      <p className="justify-self-end font-medium">
        {cartProducts.reduce((sum, item) => (
          sum + item.qty
        ), 0)}
      </p>
      <p className="text-gray-700">Price</p>
      <p className="justify-self-end font-medium">
        $ {" "}
        {cartProducts.reduce((sum, item) => (
          sum + item.price
        ), 0)}
      </p>
      <p className="text-gray-700">Subtotal</p>
      <p className="justify-self-end font-medium">
        $ {" "}
        {cartProducts
          .reduce((sum, item) => (
            sum + item.qty * item.price
          ), 0)
          .toFixed(2)}
      </p>
      <button
        className="mt-4 bg-[#ffa500] hover:bg-[#070707] active:bg-[#ffa500] text-white font-bold py-3 px-4 rounded-full w-full col-span-full text-sm"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
}

export default CartBoxComponent;
