import { Project, Category } from '../types';

export const categories: Category[] = [
  { id: 'education', name: 'Education', icon: '📚', color: 'bg-blue-500', value: 0 },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: 'bg-red-500', value: 1 },
  { id: 'environment', name: 'Environment', icon: '🌳', color: 'bg-green-500', value: 2 },
  { id: 'poverty', name: 'Poverty Alleviation', icon: '🤝', color: 'bg-yellow-500', value: 3 },
  { id: 'human_rights', name: 'Human Rights', icon: '⚖️', color: 'bg-purple-500', value: 4 },
  { id: 'community', name: 'Community Development', icon: '🏘️', color: 'bg-indigo-500', value: 5 },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Access to Quality Education',
    description: 'Providing educational resources and infrastructure to underserved communities globally.',
    shortDescription: 'Empowering futures through accessible education',
    coverImage: 'https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg',
    category: categories[0],
    fundingGoal: 5000000,
    currentFunding: 3500000,
    backers: 850,
    timeRemaining: 20,
    creator: {
      name: 'Global Education Fund',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      verified: true,
    },
    status: 'active',
    featured: true,
    tags: ['Education', 'Youth', 'Community'],
  },
  {
    id: '2',
    title: 'Clean Water Initiative',
    description: 'Drilling wells and implementing sustainable water purification systems in drought-affected regions.',
    shortDescription: 'Bringing clean, safe water to rural villages',
    coverImage: 'https://images.pexels.com/photos/2260655/pexels-photo-2260655.jpeg',
    category: categories[2],
    fundingGoal: 7500000,
    currentFunding: 6000000,
    backers: 1500,
    timeRemaining: 12,
    creator: {
      name: 'Water for All Foundation',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      verified: true,
    },
    status: 'active',
    featured: true,
    tags: ['Environment', 'Sustainability', 'Health'],
  },
  {
    id: '3',
    title: 'Healthcare for Remote Areas',
    description: 'Establishing mobile clinics and providing medical supplies to remote populations lacking access to healthcare.',
    shortDescription: 'Delivering vital medical care where it\'s needed most',
    coverImage: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg',
    category: categories[1],
    fundingGoal: 1000000,
    currentFunding: 800000,
    backers: 2000,
    timeRemaining: 25,
    creator: {
      name: 'Doctors Without Borders Aid',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      verified: true,
    },
    status: 'active',
    featured: true,
    tags: ['Health', 'Medical', 'Humanitarian'],
  },
  {
    id: '4',
    title: 'Sustainable Livelihoods Program',
    description: 'Empowering communities through vocational training and micro-enterprise support to combat poverty.',
    shortDescription: 'Building economic resilience in vulnerable communities',
    coverImage: 'https://images.pexels.com/photos/1662159/pexels-photo-1662159.jpeg',
    category: categories[3],
    fundingGoal: 600000,
    currentFunding: 250000,
    backers: 700,
    timeRemaining: 30,
    creator: {
      name: 'Opportunity Knocks NGO',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      verified: true,
    },
    status: 'active',
    featured: true,
    tags: ['Poverty', 'Development', 'Empowerment'],
  },
  {
    id: '5',
    title: 'Protecting Endangered Species',
    description: 'Conservation efforts to protect and rehabilitate endangered species and their habitats worldwide.',
    shortDescription: 'Safeguarding biodiversity for future generations',
    coverImage: 'https://images.pexels.com/photos/347140/pexels-photo-347140.jpeg',
    category: categories[2],
    fundingGoal: 800000,
    currentFunding: 400000,
    backers: 1100,
    timeRemaining: 18,
    creator: {
      name: 'Wildlife Conservation Fund',
      avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
      verified: true,
    },
    status: 'active',
    featured: true,
    tags: ['Environment', 'Wildlife', 'Conservation'],
  },
  {
    id: '6',
    title: 'Youth Empowerment Workshops',
    description: 'Providing leadership training and skill-building workshops for youth in marginalized communities.',
    shortDescription: 'Nurturing young leaders for a brighter tomorrow',
    coverImage: 'https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg',
    category: categories[0],
    fundingGoal: 300000,
    currentFunding: 180000,
    backers: 600,
    timeRemaining: 10,
    creator: {
      name: 'Future Leaders Initiative',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      verified: false,
    },
    status: 'active',
    featured: true,
    tags: ['Education', 'Youth', 'Empowerment'],
  },
  {
    id: '7',
    title: 'Disaster Relief & Recovery',
    description: 'Providing immediate aid and long-term recovery support to communities affected by natural disasters.',
    shortDescription: 'Rapid response and resilient rebuilding',
    coverImage: 'https://images.pexels.com/photos/208589/pexels-photo-208589.jpeg',
    category: categories[5],
    fundingGoal: 1500000,
    currentFunding: 1100000,
    backers: 2500,
    timeRemaining: 7,
    creator: {
      name: 'Emergency Aid Collective',
      avatar: 'https://images.pexels.com/photos/3777561/pexels-photo-3777561.jpeg',
      verified: true,
    },
    status: 'active',
    featured: true,
    tags: ['Community', 'Disaster Relief', 'Humanitarian'],
  },
  {
    id: '8',
    title: 'Advocacy for Refugee Rights',
    description: 'Campaigning for the rights and protection of refugees and asylum seekers worldwide.',
    shortDescription: 'Championing the dignity and rights of displaced persons',
    coverImage: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg',
    category: categories[4],
    fundingGoal: 400000,
    currentFunding: 280000,
    backers: 950,
    timeRemaining: 14,
    creator: {
      name: 'Humanity First Alliance',
      avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
      verified: true,
    },
    status: 'active',
    featured: true,
    tags: ['Human Rights', 'Advocacy', 'Refugees'],
  },
  {
    id: '9',
    title: 'Mental Health Support',
    description: 'Providing accessible mental health services and destigmatizing mental illness in communities.',
    shortDescription: 'Fostering mental well-being and emotional resilience',
    coverImage: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg',
    category: categories[1],
    fundingGoal: 700000,
    currentFunding: 550000,
    backers: 1300,
    timeRemaining: 19,
    creator: {
      name: 'Mind Matters Initiative',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      verified: true,
    },
    status: 'active',
    featured: true,
    tags: ['Health', 'Mental Health', 'Awareness'],
  },
];