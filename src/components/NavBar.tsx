import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const activeLink = location.pathname;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/post-traditional", label: "Post-Traditional" },
    { to: "/rq-post", label: "RQ-Post" },
  ];

  return (
    <nav className="bg-gradient-to-r  from-purple-900 via-indigo-900 to-blue-900 shadow-2xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              MyBrand
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  relative px-6 py-2.5 rounded-lg font-semibold text-sm tracking-wide
                  transition-all duration-300 ease-out
                  ${
                    activeLink === link.to
                      ? "bg-white/10 text-white shadow-lg shadow-purple-500/50 backdrop-blur-sm"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }
                  hover:scale-105 hover:shadow-md hover:shadow-cyan-500/30
                  before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
                  before:from-cyan-500 before:to-purple-500 before:opacity-0 
                  hover:before:opacity-20 before:transition-opacity before:duration-300
                `}
              >
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative glow effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
    </nav>
  );
};

export default Navbar;
