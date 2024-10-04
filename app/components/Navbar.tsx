import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="navbar bg-gradient-to-r from-indigo-500 to-purple-600 text-white backdrop-blur-sm fixed top-0 z-10 h-20 shadow-lg bg-opacity-90">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-indigo-500 rounded-box w-52">
            <li><Link href="/" className="py-3 hover:bg-indigo-600">Home</Link></li>
            <li><Link href="/cars" className="py-3 hover:bg-indigo-600">Our Cars</Link></li>
            <li><Link href="/pricing" className="py-3 hover:bg-indigo-600">Pricing</Link></li>
            <li><Link href="/contact" className="py-3 hover:bg-indigo-600">Contact</Link></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl flex items-center px-4">
          <Image src="/images/logo.png" alt="Private Taxi Logo" width={40} height={40} className="mr-2" />
          <span className="font-bold">Private Taxi</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li><Link href="/" className="px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors duration-300">Home</Link></li>
          <li><Link href="/cars" className="px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors duration-300">Our Cars</Link></li>
          <li><Link href="/pricing" className="px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors duration-300">Pricing</Link></li>
          <li><Link href="/contact" className="px-4 py-2 hover:bg-indigo-600 rounded-lg transition-colors duration-300">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
}