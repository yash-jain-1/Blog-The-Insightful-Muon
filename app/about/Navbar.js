// Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-bold">The Insightful Muon</div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-gray-300">Home
              </Link>
            </li>
            <li>
              <Link href="page.js" className="text-white hover:text-gray-300">About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-gray-300">Contact
              </Link>
            </li>
            {/* Add more links here */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
