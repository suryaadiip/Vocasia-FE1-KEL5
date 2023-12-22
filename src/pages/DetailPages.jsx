import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { getProductById } from "../features/productSlice";
import { useState, React } from "react";
import { addItem } from "../features/cartSlice";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Button from "../components/button/Button";

function DetailPages() {
  const { productId } = useParams();
  const product = useSelector((state) => getProductById(state, productId));
  const [quantity, setQuantity] = useState("1");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isUserLogin = useSelector((state) => state.auth.token);

  const handleAddToCart = () => {
    if (isUserLogin === null) {
      return navigate("/login", { state: location });
    }
    
    const productToAdd = {
      ...product,
      quantity: Number(quantity),
    };
  
    for (let i = 0; i < productToAdd.quantity; i++) {
      dispatch(addItem(productToAdd));
    }
    
  };
  
  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => Number(prevQuantity) + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity <= 1) return;

    setQuantity((quantity) => Number(quantity) - 1);
  }

  const handleQuantityChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove non-numeric characters
    value = Math.min(Number(value), stock); // Ensure value is not larger than stock
    setQuantity(value);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, category, description, image, price, stock } = product;

  return (
    <div 
      className="px-5 py-10 md:grid grid-cols-[1fr_1.5fr] md:grid-rows-[max-content_1fr] gap-x-8 md:max-w-[1000px] md:mx-auto md:px-0 lg:max-w-[1400px]">
      <div className="list-none flex items-center text-gray-500 mb-5 col-start-2 col-end-3">
        <Link to="/" className="text-[#ffa500] hover:underline">
          Home
        </Link>
        <MinusSmallIcon 
          className="w-5 rotate-90" 
        />
        <span>
          {category}
        </span>
      </div>
      <div className="border border-gray-200 p-5 md:p-10 rounded-lg mb-5 col-start-1 col-end-2 row-start-1 row-end-3">
        <img 
          className="mx-auto w-64 md:w-3/5 object-contain"
          src={image} 
          alt={title}
        />
      </div>

      <div className="md:w-2/3 -mt-2">
        <h2 className="text-2xl font-bold mb-2">
          {title}
        </h2>

        <div className="flex items-center text-gray-600 mb-3">
            <StarIcon className="w-4 text-[#DFFF00] -mt-0.5" />
            <span className="text-sm ml-1">
              {product.rating.rate}
            </span>
            <span className="text-sm ml-2">({product.rating.count} ulasan)</span> 
          </div>

        <p className="text-[#d7334c] text-lg font-bold mb-10">
          $ {price}
        </p>

        <div className="flex items-center gap-x-10 mb-5">
          <div 
          className="w-24 flex border border-[#ffa500] rounded-md px-2 py-0.5 text-[#ffa500] font-medium">
            <Button
              onClick={decrementQuantity}>
              <MinusSmallIcon className="w-5" />
            </Button>
            <input
              className="w-10 text-center outline-none border-none"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onBlur={handleQuantityChange}
            />
            <Button
              onClick={incrementQuantity}>
              <PlusSmallIcon className="w-5" />
            </Button>
          </div>
          <p 
            className="text-gray-800 text-base font-medium">
            Stock: {stock}
          </p>
        </div>

        <Button
          className="bg-[#ffa500] hover:bg-[#070707] active:bg-[#ffa500] text-white font-medium text-sm py-3 px-8 rounded-full"
          onClick={handleAddToCart}
        >
          Tambahkan Ke Keranjang
        </Button>
        <div>
          <h3 
            className="font-bold mt-10">
            Detail Produk
          </h3>

          <p 
            className="text-gray-500 mt-2 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailPages;
