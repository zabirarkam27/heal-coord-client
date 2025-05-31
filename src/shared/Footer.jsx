import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#4b257d] text-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Top Grid Section */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:justify-around md:grid-cols-3 gap-8">
          {/* Services Section */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/logo1.png"
                alt="HealCoord Logo"
                className="w-8 h-8 md:hidden"
              />
              <p className="text-4xl md:block  font-bold">
                Heal<span className="text-white  font-normal">Coord</span>
              </p>
            </Link>
            <p className="text-sm">
              Heal-Coord is dedicated to streamlining medical camp coordination
              by combining digital efficiency with compassionate care,
              empowering organizers and participants alike.
            </p>
          </div>

          {/* Explore Links */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/available-camps" className="hover:underline">
                  Available Camps
                </Link>
              </li>
              <li>
                <Link to="/join-us" className="hover:underline">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section for md+ screen */}
        <div className="max-w-[1440px] mx-auto md:flex md:justify-between md:items-center border-t border-white/20 pt-6">
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@healcoord.com</li>
              <li>Phone: +880 1234-567890</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg mt-4 md:pr-10 md:mt-0">
            <a href="#" className="hover:text-gray-300 border rounded-full p-1">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-300 border rounded-full p-1">
              <FaXTwitter />
            </a>
            <a href="#" className="hover:text-gray-300 border rounded-full p-1">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-300 border rounded-full p-1">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-gray-300 border rounded-full p-1">
              <FaTelegramPlane />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm py-4 border-t border-white/20 px-4 mt-4">
          <p>© {new Date().getFullYear()} HealCoord. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
