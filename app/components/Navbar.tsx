"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const scrollToTop = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            onClick={scrollToTop}
            className="text-lg font-semibold hover:text-[#800000] transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/about"
            className="text-lg font-semibold hover:text-[#800000] transition-colors"
          >
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
}

