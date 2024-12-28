import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Settings, MessageSquare, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-10 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-70 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatter</h1>
            </Link>
          </div>

          {/* setting */}
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Profile & logout for AUth user */}
            {authUser && (
              <>
                <div className="flex items-center gap-2">
                  <Link
                    to={"/profile"}
                    className="btn btn-sm gap-2 transition-colors"
                  >
                    <User className="size-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                </div>
                <button className="flex items-center gap-2" onClick={logout}>
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
