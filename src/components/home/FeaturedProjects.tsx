import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '../project/ProjectCard';
import { mockProjects } from '../../data/mockData';
import { Button } from '../ui/Button';

export const FeaturedProjects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProjects = mockProjects.filter(project => project.featured);
  
  const projectsPerPage = 3;
  const totalPages = Math.ceil(featuredProjects.length / projectsPerPage);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + projectsPerPage) % featuredProjects.length);
  };
  
  const prevProject = () => {
    setCurrentIndex((prev) => (prev - projectsPerPage + featuredProjects.length) % featuredProjects.length);
  };

  useEffect(() => {
    const timer = setInterval(nextProject, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Featured NGOs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover the most impactful NGO campaigns that are making a real difference in communities worldwide
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {featuredProjects.slice(currentIndex, currentIndex + projectsPerPage).map((project, index) => (
                <motion.div
                  key={`${project.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevProject}
              className="rounded-full p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => setCurrentIndex(pageIndex * projectsPerPage)}
                  className={`w-2 h-2 rounded-full transition-colors ${pageIndex * projectsPerPage === currentIndex ? 'bg-green-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextProject}
              className="rounded-full p-2"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};