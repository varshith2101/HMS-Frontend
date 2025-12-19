import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/patients', label: 'Patients' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/beds', label: 'Beds' },
  ];

  return (
    <nav className="bg-white border-b-8 border-black shadow-neo-lg mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 bg-pink-400 border-4 border-black px-4 py-2 shadow-neo">
            <Activity className="h-8 w-8 stroke-[3]" />
            <span className="text-2xl font-black text-gray-900">Hospital MS</span>
          </div>
          <div className="flex space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2 border-4 border-black text-sm font-bold uppercase tracking-wide transition-all shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
                  location.pathname === item.path
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white text-gray-900 hover:bg-cyan-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
