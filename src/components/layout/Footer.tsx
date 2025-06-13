import { Link } from 'react-router-dom';
import { Twitter, Github, Disc as Discord, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Discover NGOs', href: '/discover' },
        { name: 'Create Campaign', href: '/create' },
        { name: 'How it Works', href: '/how-it-works' },
        { name: 'Success Stories', href: '/success-stories' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'NGO Guidelines', href: '/guidelines' },
        { name: 'Security', href: '/security' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Discord', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'GitHub', href: '#' },
        { name: 'Forum', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Disclaimer', href: '/disclaimer' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GiveHope</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              The leading platform connecting NGOs with donors worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 GiveHope. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <span className="text-sm text-gray-500">Supported by</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">UNICEF</span>
                <span className="text-sm font-medium text-gray-700">Red Cross</span>
                <span className="text-sm font-medium text-gray-700">WHO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};