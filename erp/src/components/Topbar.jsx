import { useState, useEffect } from "react";
import {
  Bell,
  User,
  Moon,
  Sun,
} from "lucide-react";

export default function Topbar() {
  const [dark, setDark] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="w-full h-14 sticky top-0 right-0 z-50 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      
      {/* LEFT */}
      <div className="flex gap-2">
            <img src="src/assets/Images/p4.jpg" alt="" className="w-10 h-10 rounded-full" />

      <p className="font-semibold text-lg text-gray-800 dark:text-white mt-1">
        Fuel IT Online
      </p>
      </div>


      {/* RIGHT ICONS */}
      <div className="flex items-center gap-4">
        
        {/* Dark / Light Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {dark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700" />
          )}
        </button>

        {/* Notification */}
        <div className="relative cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={18} className="text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile / Login */}
        <div className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <User size={18} className="text-gray-700 dark:text-gray-300" />
          <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:block">
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
