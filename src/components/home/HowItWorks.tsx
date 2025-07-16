import { motion } from 'framer-motion';
import { Search, Heart, Rocket, Trophy } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Discover NGOs',
      description: 'Browse through verified NGO campaigns and find causes that resonate with your values. Our platform offers a diverse range of humanitarian and development initiatives from around the world.',
      image: 'https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Stake Transparently',
      description: 'Make secure staking to your chosen NGOs with complete transparency. Track exactly how your contribution is being used and see the real impact of your generosity.',
      image: 'https://images.pexels.com/photos/8931674/pexels-photo-8931674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Track Progress',
      description: 'Monitor the impact of your donation in real-time. Follow project milestones, receive transparent updates from the NGOs, and see how your contribution is making a difference.',
      image: 'https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Community & Impact',
      description: 'Join a passionate community of backers. Engage with NGOs, share your impact, and be part of a global movement for social good. Your donation becomes their success.',
      image: 'https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            How Our Stake-to-Donate System Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Experience transparent and impactful giving through our innovative donation tracking system.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div className="lg:w-1/2">
                <img 
                  src={step.image}
                  alt={step.title}
                  className="rounded-xl shadow-lg w-full h-80 object-cover"
                />
              </div>

              {/* Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};