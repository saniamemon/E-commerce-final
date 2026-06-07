import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">

      <div className="w-64 bg-black text-white p-5">
        <h1 className="text-2xl font-bold mb-5">Admin</h1>

        <Link to="/admin" className="block mb-2">Dashboard</Link>
        <Link to="/admin/orders" className="block">Orders</Link>
      </div>

      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;