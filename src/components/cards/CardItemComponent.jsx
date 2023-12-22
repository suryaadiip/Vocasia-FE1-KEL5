import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addItem } from "../../features/cartSlice";
import Button from "../button/Button";
import { MinusSmallIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function CardItemComponent({ product }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isUserLogin = useSelector((state) => state.auth.token);

  const handleAddToCart = (product) => {
    if (isUserLogin === null) {
      return navigate("/login", {state: location});
    }

    dispatch(addItem(product));
  }

  return (
    <div className="max-w-xs md:max-w-full justify-self-center rounded-lg overflow-hidden border border-slate-200">
      <Link 
        className="p-5 flex h-[200px]"
        to={`/detail/${product.id}`}>
        <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
      </Link>
      <div className="p-6">
        <Link to={`/detail/${product.id}`}>
          <h4 className="font-medium text-lg mb-2 line-clamp-1">{product.title}</h4>
        </Link>

        <div className="font-medium mb-2 text-[#d7334c]">
          $ {product.price}
        </div>
        <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex justify-between items-center mt-5 flex-wrap gap-y-3">
          <div className="flex items-center text-gray-600">
            <StarIcon className="w-4 text-[#DFFF00] -mt-0.5" />
            <span className="text-sm ml-1">
              {product.rating.rate}
            </span>
            <MinusSmallIcon className="rotate-90 w-5" />
            <span className="text-sm">{product.rating.count} ulasan</span> 
          </div>
          <Button
            className="bg-[#ffa500] hover:bg-[#070707] text-white font-medium text-sm py-2 px-4 rounded-full"
            onClick={() => handleAddToCart(product)}>
              Tambahkan Ke Keranjang
          </Button>
        </div>
      </div>
    </div>
  );
}