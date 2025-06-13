import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  CheckCircle2, 
  Share2, 
  Heart, 
  Globe, 
  Twitter,
  Github,
  MessageSquare,
  Calendar,
  Target,
  Trophy
} from 'lucide-react';
import { mockProjects } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [stakeDurationDays, setStakeDurationDays] = useState('365'); // Default to 1 year

  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link to="/discover">
            <Button>Back to Discover</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = (project.currentFunding / project.fundingGoal) * 100;
  const daysLeft = project.timeRemaining;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'updates', label: 'Updates' },
    { id: 'comments', label: 'Comments (127)' },
    { id: 'backers', label: 'Backers' },
  ];

  const investmentTiers = [
    {
      title: 'Early Supporter',
      minAmount: 100,
      description: 'Join the community and get early access',
      rewards: ['Early access to platform', 'Community discord access', 'Monthly updates'],
      available: 500,
      claimed: 234,
    },
    {
      title: 'Power Backer',
      minAmount: 500,
      description: 'Significant support with exclusive benefits',
      rewards: ['All Early Supporter rewards', 'Platform fee discount', 'Governance tokens', 'Beta testing access'],
      available: 200,
      claimed: 89,
    },
    {
      title: 'Strategic Partner',
      minAmount: 2000,
      description: 'Partnership level with direct team access',
      rewards: ['All previous rewards', 'Direct team consultation', 'Revenue sharing agreement', 'Advisory role opportunity'],
      available: 50,
      claimed: 12,
    },
  ];

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Former blockchain engineer at major DeFi protocols with 5+ years experience.',
    },
    {
      name: 'Sarah Kim',
      role: 'CTO',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      bio: 'Smart contract expert and security researcher with extensive audit experience.',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Product',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      bio: 'Product strategist with successful track record in Web3 UX design.',
    },
  ];

  const milestones = [
    {
      title: 'MVP Development',
      description: 'Core protocol development and initial testing',
      targetDate: new Date('2024-03-15'),
      completed: true,
      fundingRequired: 250000,
    },
    {
      title: 'Security Audit',
      description: 'Professional security audit by leading firm',
      targetDate: new Date('2024-04-30'),
      completed: false,
      fundingRequired: 500000,
    },
    {
      title: 'Mainnet Launch',
      description: 'Official mainnet deployment and public launch',
      targetDate: new Date('2024-06-01'),
      completed: false,
      fundingRequired: 750000,
    },
    {
      title: 'Token Distribution',
      description: 'Community token distribution and governance setup',
      targetDate: new Date('2024-07-15'),
      completed: false,
      fundingRequired: 1000000,
    },
  ];

  const APY = 0.30; // 30% annual yield
  const stake = Number(investmentAmount) || 0;
  const durationDays = Number(stakeDurationDays) || 0;

  const yieldData: { day: number; yield: number }[] = [];

  yieldData.push({ day: 0, yield: 0 }); // Start from day 0 with 0 yield

  if (durationDays > 0) {
    const interval = 30; // Show points every 30 days (approx. monthly)
    for (let d = interval; d < durationDays; d += interval) {
      const timeInMonths = d / 30;
      const yieldAmount = stake * ((1 + APY / 12) ** timeInMonths - 1);
      yieldData.push({ day: d, yield: Math.round(yieldAmount * 100) / 100 });
    }

    // Ensure the final day is included as a data point
    if (yieldData[yieldData.length - 1].day !== durationDays) {
      const timeInMonths = durationDays / 30;
      const yieldAmount = stake * ((1 + APY / 12) ** timeInMonths - 1);
      yieldData.push({ day: durationDays, yield: Math.round(yieldAmount * 100) / 100 });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/discover" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Discover
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Card className="overflow-hidden">
                <div className="relative h-64 bg-gray-200">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-sm font-medium text-white rounded-full ${project.category.color}`}>
                      {project.category.name}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button variant="ghost" size="sm" className="bg-black/20 text-white hover:bg-black/30">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-black/20 text-white hover:bg-black/30">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={project.creator.avatar}
                      alt={project.creator.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{project.creator.name}</span>
                        {project.creator.verified && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-600">Project Creator</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
                  <p className="text-lg text-gray-600 mb-6">{project.shortDescription}</p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8 px-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      {/* Description */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">About This Project</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          Our mission is to revolutionize the DeFi space by providing innovative solutions that bridge traditional finance with decentralized protocols. We're building a comprehensive platform that addresses the current limitations in the market while ensuring security, scalability, and user experience remain at the forefront of our development.
                        </p>
                      </div>

                      {/* Team */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Meet the Team</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {teamMembers.map((member, index) => (
                            <div key={index} className="flex space-x-4">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-16 h-16 rounded-full"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Roadmap */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Roadmap & Milestones</h3>
                        <div className="space-y-4">
                          {milestones.map((milestone, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`}>
                                {milestone.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                ) : (
                                  <span className="text-white text-sm font-medium">{index + 1}</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                                  <span className="text-sm text-gray-500">
                                    {milestone.targetDate.toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{milestone.description}</p>
                                <p className="text-sm font-medium text-blue-600">
                                  Funding Required: RM{milestone.fundingRequired.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'updates' && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No updates yet</h3>
                        <p className="text-gray-600">The project team will post updates here as development progresses.</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'comments' && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Join the discussion</h3>
                        <p className="text-gray-600">Be the first to comment on this project.</p>
                        <Button className="mt-4">Add Comment</Button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'backers' && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {project.backers} Backers
                        </h3>
                        <p className="text-gray-600">Join this amazing community of supporters.</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Funding Progress */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      RM {project.currentFunding.toLocaleString()}
                    </div>
                    <div className="text-gray-600">
                      of RM {project.fundingGoal.toLocaleString()} goal
                    </div>
                  </div>

                  <ProgressBar progress={progress} className="mb-6" />

                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{project.backers}</div>
                      <div className="text-sm text-gray-600">Backers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{daysLeft}</div>
                      <div className="text-sm text-gray-600">Days left</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Enter amount (RM)"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button size="lg" className="w-full">
                      Stake for 6 Months
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Secure payment via smart contract
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Investment Tiers */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Investment Tiers</h3>
                  <div className="space-y-4">
                    {investmentTiers.map((tier, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{tier.title}</h4>
                          <span className="text-sm font-medium text-blue-600">
                            RM{tier.minAmount}+
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                        <ul className="text-xs text-gray-600 space-y-1 mb-3">
                          {tier.rewards.map((reward, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {reward}
                            </li>
                          ))}
                        </ul>
                        <div className="text-xs text-gray-500">
                          {tier.claimed} of {tier.available} claimed
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Project Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created</span>
                      <span className="font-medium">Dec 15, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{project.category.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">Global</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last update</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Yield Projection Graph */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Donation Projection</h3>
            <div className="flex space-x-4 items-end mb-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Stake Amount (RM)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Stake Duration (Days)</label>
                <input
                  type="number"
                  placeholder="Enter days"
                  value={stakeDurationDays}
                  onChange={(e) => setStakeDurationDays(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Button size="lg" className="w-full">
                  Donate Now
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: 0 }} />
                <YAxis label={{ value: 'Donation (RM)', angle: -90, position: 'insideLeft', offset: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="yield" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">
              Projected donation over selected duration at 30% APY.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};