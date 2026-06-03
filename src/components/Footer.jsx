import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black text-green-600">
              🏍️ MotoBike
            </h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Discover premium motorcycles, compare models, and find your
              perfect ride with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/bikes" className="hover:text-green-600 transition">
                  All Bikes
                </Link>
              </li>
              <li>
                <Link href="/add-bike" className="hover:text-green-600 transition">
                  Add Bike
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Sports Bike</li>
              <li>Cruiser</li>
              <li>Adventure</li>
              <li>Touring</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>📧 support@motobike.com</li>
              <li>📞 +880 1799-802008</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Green Bottom Bar */}
        <div className="mt-10 bg-green-600 rounded-2xl py-4 px-6 flex flex-col md:flex-row items-center justify-between text-white">
          <p>
            © {new Date().getFullYear()} MotoBike. All Rights Reserved.
          </p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:opacity-80">
              Facebook
            </a>
            <a href="#" className="hover:opacity-80">
              Instagram
            </a>
            <a href="#" className="hover:opacity-80">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;