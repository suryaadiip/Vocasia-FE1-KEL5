import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getAllCart } from "../features/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { userLogout } from "../features/authSlice";
import Button from "./button/Button";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

function NavbarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const cartCount = useSelector(getAllCart);
  const {isAuthenticated: isUserAuthenticated, token} = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    setIsOpen(!isOpen);
    navigate("/login", {state: location}); 
  }

  const handleLogoutClick = () => {
    setIsOpen(!isOpen);
    dispatch(userLogout());
    navigate("/", {replace: true});
  }

  let button;

  if (isUserAuthenticated) {
    button = (
      <Button
        className="text-gray-700 font-medium hover:text-[#ffa500] dark:hover:text-[#ffa500] w-full text-left border-b md:w-max md:text-center md:static md:border-none py-3"
        onClick={handleLogoutClick}>
          Logout
      </Button>
    );

  } else {
    button = (
      <Button
        className="text-gray-700 font-medium rounded hover:text-[#ffa500] dark:hover:text-[#ffa500] w-full text-left border-b md:w-max md:text-center md:static md:border-none py-3"
        onClick={handleLoginClick}>
        Login
      </Button>
    )
  }

  return (
    <nav className="sticky top-0 z-10 bg-white flex items-center gap-x-12 px-5 py-5 border-b border-slate-200 md:px-10 xl:px-28">
      <h1 className="text-3xl text-[#ffa500] font-medium">
        <Link to="/"
        className="flex items-center gap-2">
          <ShoppingBagIcon
            className="w-8 inline -mt-1" 
          />
          <span>TokoKita</span>
        </Link>
      </h1>
      <Button
        className="text-gray-500 border border-gray-300 rounded-sm px-1 md:hidden absolute right-5 z-50"
        onClick={toggleMenu}
        type="button"
      >
        {isOpen ?
          <XMarkIcon
            className="w-6 text-[#ffa500]" 
          /> :
          <Bars3Icon
            className="w-6 text-[#ffa500]"
          />
        }
      </Button>
      <ul className={`${isOpen ? "translate-y-0" : "-translate-y-[100vh]"} absolute md:translate-y-0 top-0 right-0 left-0 p-10 md:p-0 h-screen md:h-max bg-white md:static flex justify-start flex-col md:flex-row md:items-center items-start gap-x-8 transition duration-300 ease-in-out`}>
        <li className="mt-12 w-full md:w-max md:mt-0">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) =>
              (`
                block py-3 font-medium border-b md:static md:border-none 
                ${isActive
                  ? "text-[#ffa500] border-b-2 border-[#ffa500] md:bg-transparent"
                  : "text-gray-700 hover:text-[#ffa500"
                }
              `)
            }
          >
            Home
          </NavLink>
        </li>
        <li className="w-full md:w-max">
          {(token === "admin@tokokita.com") ?
            <NavLink
              to="/recap"
              onClick={toggleMenu}
              className={({ isActive }) =>
              (`
                block py-3 font-medium border-b md:static md:border-none 
                ${isActive
                  ? "text-[#ffa500] border-b-2 border-[#ffa500] md:bg-transparent"
                  : "text-gray-700 hover:text-[#ffa500"
                }
              `)
              }
            >
              Recap
            </NavLink> :
            <NavLink
              to="/cart"
              onClick={toggleMenu}
              className={({ isActive }) =>
              (`
                flex items-center gap-x-1 font-medium py-3 border-b md:static md:border-none 
                ${isActive
                  ? "text-[#ffa500] md:bg-transparent border-b-2 border-[#ffa500]"
                  : "text-gray-700 hover:text-[#ffa500"
                }
              `)
              }
            >
              <ShoppingCartIcon
                className="w-5 -mt-1" />
                <span>Keranjang</span>
              {(cartCount?.length !== 0) && (
                <span className="absolute top-0 l text-xs rounded-full bg-[#d7334c] text-white px-1">
                  {cartCount.length}
                </span>
              )}
            </NavLink>
          }
        </li>
        <li className="w-full md:w-max">
          {button}
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
