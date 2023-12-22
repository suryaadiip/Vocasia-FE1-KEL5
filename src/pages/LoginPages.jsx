import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useLocation, Navigate } from "react-router";
import { userLogin } from "../features/authSlice";
import Button from "../components/button/Button";
import Loading from "../components/Loading";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function LoginPages() {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.pathname || "/";
  const auth = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(userLogin({ username, password }));
  };

  if (auth.token === "admin@tokokita.com") {
    return <Navigate to="/" />;
  }

  if (auth.isAuthenticated) {
    return <Navigate to={from} />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100 -mt-6">
      <form
        className="w-11/12 px-6 sm:w-[380px] lg-[480px] bg-white sm:px-8 py-12 rounded-lg shadow-md -mt-10"
        onSubmit={handleOnSubmit}
      >
        <h1 className="text-3xl text-center font-semibold">Selamat Datang!</h1>
        <p className="text-sm text-center text-slate-500 mt-2">
          Silahkan masuk untuk menggunakan akun anda
        </p>

        <div className="mb-5 mt-12">
          <label
            className="block text-gray-700 font-medium mb-2 text-sm"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:outline-none  focus:ring-[#32c091] focus:border-[#32c091] block w-full p-2.5 focus:border-[#ffa500] focus:transition focus:duration-120"
            id="username"
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="off"
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 font-bold mb-2 text-sm font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none  focus:ring-[#32c091] focus:border-[#32c091] block w-full p-2.5 focus:border-[#ffa500] focus:transition focus:duration-120"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="off"
            />
            <Button
              className={
                password.length ? "w-5 absolute right-0 top-2" : "hidden"
              }
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </Button>
          </div>
        </div>
        <Button
          className="w-full bg-[#32c091] hover:bg-[#339474] active:bg-[#215e49] text-white font-medium py-2 px-4 rounded-md focus:outline-none"
          type="submit"
        >
          Masuk
        </Button>
        {auth.errorMessage && (
          <p className="mt-5 text-[#d7334c] text-sm -mb-2 text-center">
            {auth.errorMessage}
          </p>
        )}
      </form>
      <Loading isLoading={auth.isLoading} />
    </div>
  );
}

export default LoginPages;
