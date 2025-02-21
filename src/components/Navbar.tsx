import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Questions', path: '/questions' },
    { name: 'Simulated Tests', path: '/simulated-tests' },
    { name: 'Performance', path: '/performance' },
    { name: 'Gamification', path: '/gamification' },
  ];

  return (
    <nav className="bg-white shadow p-4 flex gap-4">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`cursor-pointer px-3 py-2 rounded ${
            location.pathname === item.path ? 'bg-blue-500 text-white' : 'text-gray-900 hover:bg-blue-100'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;