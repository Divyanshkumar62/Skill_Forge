import { useAuth } from "../features/auth/store";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">SkillForge</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">
          Logout
        </button>
      </header>
      <main className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}
