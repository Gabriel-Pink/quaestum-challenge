import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FiUser, FiLogOut } from "react-icons/fi";

export function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Quaestum</h1>

      <div className="relative" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-600 text-lg" />
          </div>
          <span className="text-gray-800 font-medium hidden sm:block">{user?.fullName || "Usuário"}</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-md z-20 animate-fade-in">
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FiLogOut />
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
