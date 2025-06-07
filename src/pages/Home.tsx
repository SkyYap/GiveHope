import { Hero } from '../components/home/Hero';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { Categories } from '../components/home/Categories';
import { HowItWorks } from '../components/home/HowItWorks';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProjects />
      <Categories />
      <HowItWorks />
    </div>
  );
};