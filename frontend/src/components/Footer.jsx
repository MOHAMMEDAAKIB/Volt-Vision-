import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">EVGuide SL</h3>
            <p className="text-gray-300 text-sm">
              Your trusted companion for electric vehicle information in Sri Lanka. 
              Find, compare, and choose the perfect EV for your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search" className="text-gray-300 hover:text-primary">Search EVs</Link></li>
              <li><Link to="/compare" className="text-gray-300 hover:text-primary">Compare Models</Link></li>
              <li><Link to="/calculator" className="text-gray-300 hover:text-primary">Cost Calculator</Link></li>
              <li><Link to="/charging-map" className="text-gray-300 hover:text-primary">Charging Map</Link></li>
              <li><Link to="/tips" className="text-gray-300 hover:text-primary">EV Tips</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-primary">Buying Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary">Government Incentives</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary">Charging Network</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">+94 11 234 5678</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">info@evguide.lk</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 EVGuide SL. All rights reserved. Made with ❤️ for Sri Lanka's EV future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
