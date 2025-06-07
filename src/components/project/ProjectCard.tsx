import { Link } from 'react-router-dom';
import { Clock, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const progress = (project.currentFunding / project.fundingGoal) * 100;
  const daysLeft = project.timeRemaining;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/project/${project.id}`}>
        <Card hover className="overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${project.category.color}`}>
                {project.category.name}
              </span>
            </div>
            {project.featured && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Creator */}
            <div className="flex items-center space-x-2 mb-3">
              <img
                src={project.creator.avatar}
                alt={project.creator.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{project.creator.name}</span>
              {project.creator.verified && (
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              )}
            </div>

            {/* Title and Description */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Progress */}
            <div className="mb-4">
              <ProgressBar progress={progress} className="mb-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${project.currentFunding.toLocaleString()} raised</span>
                <span>{progress.toFixed(0)}% funded</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{project.backers} backers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{daysLeft} days left</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};