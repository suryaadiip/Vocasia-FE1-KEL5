import { useSelector } from "react-redux";
import AdminHomePages from "../pages/admin/AdminHomePages";
import HomePages from '../pages/HomePages';

export default function ProtectedPage() {
  const token = useSelector((state) => state.auth.token);

  if (token === "admin@tokokita.com") {
    return <AdminHomePages />
  }

  return <HomePages />;
}