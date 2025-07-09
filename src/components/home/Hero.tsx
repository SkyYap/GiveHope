import { motion } from 'framer-motion';
import { ArrowRight, Users, Heart, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const stats = [
    { icon: Heart, value: '$125M+', label: 'Total Raised' },
    { icon: Users, value: '50K+', label: 'Active Donors' },
    { icon: Globe, value: '1.2K+', label: 'NGOs Supported' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-teal-600 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
        <div className="absolute -top-16 -right-16 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Reimagining Donations
              <span className="block text-4xl lg:text-6xl font-extrabold leading-[1.1] pb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Fueling Impact
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-blue-100 mb-8 leading-relaxed"
            >
              From education to environmental conservation, 
              back the sustainable development without sacrificing your principal.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link to="/discover">
                <Button 
                  size="lg" 
                  className="bg-green-600 text-white hover:bg-green-700 hover:text-white w-full sm:w-auto font-semibold shadow-lg"
                >
                  Explore NGOs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/create">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-800 w-full sm:w-auto font-semibold"
                >
                  Start Campaign
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-200" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute -top-8 w-full flex">
              <span className="text-base font-semibold text-white/80 tracking-wide">Powered By</span>
            </div>
            <img
              src="/masverse-hero.png"
              alt="Blockchain for Good x Masverse"
              className="w-full max-w-2xl rounded-2xl shadow-lg border border-white/20"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};