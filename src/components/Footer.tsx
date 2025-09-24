import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 Kisan Kosh. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-accent-green transition-colors duration-300 text-sm"
            >
              Terms of Service
            </Link>
            <Link 
              href="/help" 
              className="text-gray-400 hover:text-accent-green transition-colors duration-300 text-sm"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}