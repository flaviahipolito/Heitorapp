import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Outlet />
    </div>
  );
}
