import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Heart, 
  Calendar,
  DollarSign,
  Target,
  Award,
  Bell,
  Settings,
  Plus,
  Eye,
  Edit,
  Share2,
  Download,
  Filter,
  Search,
  ChevronDown,
  Activity,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
  Star,
  Bookmark,
  TrendingDown
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Link } from 'react-router-dom';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Area,
  AreaChart,
  Pie
} from 'recharts';

export const Dashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<'donor' | 'ngo'>('donor');
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Reset active tab when role changes
  useEffect(() => {
    setActiveTab('overview');
  }, [userRole]);

  // Mock data for NGO admin
  const ngoStats = {
    totalRaised: 2450000,
    totalDonors: 1847,
    activeCampaigns: 3,
    completedCampaigns: 7,
    totalImpact: 15420,
    averageDonation: 1327,
    conversionRate: 12.4,
    monthlyGrowth: 23.5
  };

  // Mock data for donor
  const donorStats = {
    totalDonated: 15750,
    ngosSupported: 12,
    impactPoints: 2840,
    donationStreak: 6,
    totalImpact: 847,
    averageDonation: 525,
    monthlyDonations: 3,
    ranking: 156
  };

  const recentDonations = [
    { id: 1, donor: 'Anonymous', amount: 500, campaign: 'Clean Water Initiative', time: '2 hours ago', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
    { id: 2, donor: 'Sarah Chen', amount: 1000, campaign: 'Education for All', time: '4 hours ago', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
    { id: 3, donor: 'Michael Rodriguez', amount: 250, campaign: 'Healthcare Access', time: '6 hours ago', avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg' },
    { id: 4, donor: 'Emma Wilson', amount: 750, campaign: 'Clean Water Initiative', time: '8 hours ago', avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg' },
    { id: 5, donor: 'David Kim', amount: 2000, campaign: 'Education for All', time: '1 day ago', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg' }
  ];

  const myDonations = [
    { id: 1, ngo: 'Clean Water Initiative', amount: 500, date: '2024-01-15', impact: 'Provided clean water for 25 people', status: 'active', image: 'https://images.pexels.com/photos/2260655/pexels-photo-2260655.jpeg' },
    { id: 2, ngo: 'Education for All', amount: 1000, date: '2024-01-10', impact: 'Funded education for 5 children', status: 'completed', image: 'https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg' },
    { id: 3, ngo: 'Healthcare Access', amount: 750, date: '2024-01-05', impact: 'Provided medical care for 15 people', status: 'active', image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg' },
  ];

  const supportedNGOs = [
    { id: 1, name: 'Clean Water Initiative', totalDonated: 1500, lastDonation: '2024-01-15', relationship: '6 months', image: 'https://images.pexels.com/photos/2260655/pexels-photo-2260655.jpeg', category: 'Environment' },
    { id: 2, name: 'Education for All', totalDonated: 2500, lastDonation: '2024-01-10', relationship: '1 year', image: 'https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg', category: 'Education' },
    { id: 3, name: 'Healthcare Access', totalDonated: 1200, lastDonation: '2024-01-05', relationship: '8 months', image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg', category: 'Healthcare' },
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Clean Water Initiative',
      status: 'active',
      raised: 850000,
      goal: 1000000,
      donors: 542,
      daysLeft: 15,
      image: 'https://images.pexels.com/photos/2260655/pexels-photo-2260655.jpeg',
      category: 'Environment'
    },
    {
      id: 2,
      title: 'Education for All',
      status: 'active',
      raised: 650000,
      goal: 800000,
      donors: 789,
      daysLeft: 28,
      image: 'https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg',
      category: 'Education'
    },
    {
      id: 3,
      title: 'Healthcare Access',
      status: 'active',
      raised: 950000,
      goal: 1200000,
      donors: 516,
      daysLeft: 42,
      image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg',
      category: 'Healthcare'
    }
  ];

  const donationData = [
    { month: 'Jan', amount: 45000, donors: 120, personal: 500 },
    { month: 'Feb', amount: 52000, donors: 145, personal: 750 },
    { month: 'Mar', amount: 48000, donors: 132, personal: 600 },
    { month: 'Apr', amount: 61000, donors: 167, personal: 800 },
    { month: 'May', amount: 55000, donors: 151, personal: 900 },
    { month: 'Jun', amount: 67000, donors: 189, personal: 1200 },
    { month: 'Jul', amount: 73000, donors: 203, personal: 1100 },
    { month: 'Aug', amount: 69000, donors: 195, personal: 950 },
    { month: 'Sep', amount: 78000, donors: 218, personal: 1300 },
    { month: 'Oct', amount: 82000, donors: 234, personal: 1400 },
    { month: 'Nov', amount: 89000, donors: 251, personal: 1600 },
    { month: 'Dec', amount: 95000, donors: 267, personal: 1800 }
  ];

  const categoryData = [
    { name: 'Education', value: 35, color: '#3b82f6' },
    { name: 'Healthcare', value: 28, color: '#ef4444' },
    { name: 'Environment', value: 22, color: '#22c55e' },
    { name: 'Poverty', value: 15, color: '#f59e0b' }
  ];

  const impactMetrics = [
    { label: 'People Helped', value: 15420, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Communities Reached', value: 89, icon: Globe, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Projects Completed', value: 7, icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Success Rate', value: 94, icon: Target, color: 'text-orange-600', bg: 'bg-orange-50', suffix: '%' }
  ];

  const donorImpactMetrics = [
    { label: 'People Helped', value: 847, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'NGOs Supported', value: 12, icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Impact Points', value: 2840, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Donation Streak', value: 6, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', suffix: ' months' }
  ];

  // Define tabs based on user role
  const ngoTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'campaigns', label: 'My Campaigns', icon: Heart },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'donations', label: 'Donations', icon: DollarSign },
    { id: 'impact', label: 'Impact', icon: Award }
  ];

  const donorTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'donations', label: 'My Donations', icon: Heart },
    { id: 'ngos', label: 'Supported NGOs', icon: Users },
    { id: 'impact', label: 'My Impact', icon: Award },
    { id: 'discover', label: 'Discover', icon: Search }
  ];

  const currentTabs = userRole === 'ngo' ? ngoTabs : donorTabs;
  const currentStats = userRole === 'ngo' ? ngoStats : donorStats;
  const currentImpactMetrics = userRole === 'ngo' ? impactMetrics : donorImpactMetrics;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Role Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, Sarah! 👋
              </h1>
              <p className="text-xl text-gray-600">
                {userRole === 'ngo' 
                  ? "Here's what's happening with your NGO campaigns"
                  : "Track your donations and see the impact you're making"
                }
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              {/* Role Switcher */}
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${userRole === 'donor' ? 'text-blue-600' : 'text-gray-500'}`}>
                  Donor
                </span>
                <button
                  onClick={() => setUserRole(userRole === 'donor' ? 'ngo' : 'donor')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    userRole === 'ngo' 
                      ? 'bg-green-600 focus:ring-green-500' 
                      : 'bg-blue-600 focus:ring-blue-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      userRole === 'ngo' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${userRole === 'ngo' ? 'text-green-600' : 'text-gray-500'}`}>
                  NGO Admin
                </span>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                {userRole === 'ngo' && (
                  <Link to="/create">
                    <Button className="flex items-center bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      New Campaign
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {userRole === 'ngo' ? (
            <>
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Raised</p>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={currentStats.totalRaised} prefix="RM " />
                    </div>
                    <div className="flex items-center mt-2 text-blue-100">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">+{ngoStats.monthlyGrowth}% this month</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-200" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Donors</p>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={currentStats.totalDonors} />
                    </div>
                    <div className="flex items-center mt-2 text-green-100">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">+156 this week</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-green-200" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Active Campaigns</p>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={currentStats.activeCampaigns} />
                    </div>
                    <div className="flex items-center mt-2 text-purple-100">
                      <Activity className="w-4 h-4 mr-1" />
                      <span className="text-sm">{ngoStats.completedCampaigns} completed</span>
                    </div>
                  </div>
                  <Heart className="w-8 h-8 text-purple-200" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Avg. Donation</p>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={currentStats.averageDonation} prefix="RM " />
                    </div>
                    <div className="flex items-center mt-2 text-orange-100">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">{ngoStats.conversionRate}% conversion</span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-orange-200" />
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Donated</p>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={donorStats.totalDonated} prefix="RM " />
                    </div>
                    <div className="flex items-center mt-2 text-blue-100">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">+{donorStats.monthlyDonations} this month</span>
                    </div>
                  </div>
                  <Heart className="w-8 h-8 text-blue-200" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">NGOs Supported</p>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={donorStats.ngosSupported} />
                    </div>
                    <div className="flex items-center mt-2 text-green-100">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">Across 8 categories</span>
                    </div>
                  </div>
                  <Globe className="w-8 h-8 text-green-200" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Impact Points</p>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={donorStats.impactPoints} />
                    </div>
                    <div className="flex items-center mt-2 text-purple-100">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">Rank #{donorStats.ranking}</span>
                    </div>
                  </div>
                  <Award className="w-8 h-8 text-purple-200" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Donation Streak</p>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={donorStats.donationStreak} suffix=" months" />
                    </div>
                    <div className="flex items-center mt-2 text-orange-100">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">Keep it up!</span>
                    </div>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-200" />
                </div>
              </Card>
            </>
          )}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-2">
            <nav className="flex space-x-2">
              {currentTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? userRole === 'ngo' 
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={`${userRole}-${activeTab}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* NGO Admin Content */}
          {userRole === 'ngo' && activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Donation Trends */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Donation Trends</h3>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="1y">Last year</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={donationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'amount' ? `RM ${value.toLocaleString()}` : value,
                        name === 'amount' ? 'Donations' : 'Donors'
                      ]} />
                      <Area type="monotone" dataKey="amount" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="donors" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                {/* Campaign Performance */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Campaign Performance</h3>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => {
                      const progress = (campaign.raised / campaign.goal) * 100;
                      return (
                        <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={campaign.image}
                              alt={campaign.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{campaign.title}</h4>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {campaign.status}
                                </span>
                              </div>
                              <ProgressBar progress={progress} className="mb-2" />
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>RM {campaign.raised.toLocaleString()} of RM {campaign.goal.toLocaleString()}</span>
                                <span>{campaign.donors} donors • {campaign.daysLeft} days left</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Donations */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Donations</h3>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentDonations.slice(0, 5).map((donation) => (
                      <div key={donation.id} className="flex items-center space-x-3">
                        <img
                          src={donation.avatar}
                          alt={donation.donor}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {donation.donor}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {donation.campaign}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">
                            +RM {donation.amount}
                          </p>
                          <p className="text-xs text-gray-500">
                            {donation.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Impact Metrics */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Overview</h3>
                  <div className="space-y-4">
                    {currentImpactMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${metric.bg} flex items-center justify-center`}>
                          <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">{metric.label}</p>
                          <p className="text-lg font-semibold text-gray-900">
                            <AnimatedCounter 
                              value={metric.value} 
                              suffix={metric.suffix || ''} 
                            />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/create">
                      <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Campaign
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Send Update to Donors
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Donor Overview */}
          {userRole === 'donor' && activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Donation Trends */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Your Donation History</h3>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="1y">Last year</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={donationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`RM ${value}`, 'Personal Donations']} />
                      <Area type="monotone" dataKey="personal" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                {/* Recent Donations */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {myDonations.map((donation) => (
                      <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={donation.image}
                            alt={donation.ngo}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{donation.ngo}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                donation.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {donation.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{donation.impact}</p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>RM {donation.amount}</span>
                              <span>{donation.date}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Impact Summary */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact</h3>
                  <div className="space-y-4">
                    {donorImpactMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${metric.bg} flex items-center justify-center`}>
                          <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">{metric.label}</p>
                          <p className="text-lg font-semibold text-gray-900">
                            <AnimatedCounter 
                              value={metric.value} 
                              suffix={metric.suffix || ''} 
                            />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Supported NGOs Preview */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Supported NGOs</h3>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {supportedNGOs.slice(0, 3).map((ngo) => (
                      <div key={ngo.id} className="flex items-center space-x-3">
                        <img
                          src={ngo.image}
                          alt={ngo.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {ngo.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            RM {ngo.totalDonated} • {ngo.relationship}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/discover">
                      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                        <Search className="w-4 h-4 mr-2" />
                        Discover New NGOs
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Again
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Your Impact
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Additional tab content would go here for other tabs */}
          {activeTab === 'campaigns' && userRole === 'ngo' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Campaigns</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search campaigns..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => {
                  const progress = (campaign.raised / campaign.goal) * 100;
                  return (
                    <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full">
                            {campaign.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            campaign.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{campaign.title}</h3>
                        <ProgressBar progress={progress} className="mb-3" />
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <span>RM {campaign.raised.toLocaleString()}</span>
                          <span>{progress.toFixed(0)}% funded</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <span>{campaign.donors} donors</span>
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Donor specific tabs */}
          {activeTab === 'donations' && userRole === 'donor' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Donations</h2>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myDonations.map((donation) => (
                  <Card key={donation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={donation.image}
                        alt={donation.ngo}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          donation.status === 'active' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                        }`}>
                          {donation.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{donation.ngo}</h3>
                      <p className="text-sm text-gray-600 mb-4">{donation.impact}</p>
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span className="font-semibold text-blue-600">RM {donation.amount}</span>
                        <span>{donation.date}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View Impact
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ngos' && userRole === 'donor' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Supported NGOs</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search NGOs..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportedNGOs.map((ngo) => (
                  <Card key={ngo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={ngo.image}
                        alt={ngo.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full">
                          {ngo.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Button variant="ghost" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{ngo.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Donated:</span>
                          <span className="font-semibold text-blue-600">RM {ngo.totalDonated}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Supporting Since:</span>
                          <span className="text-gray-900">{ngo.relationship}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Donation:</span>
                          <span className="text-gray-900">{ngo.lastDonation}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View NGO
                        </Button>
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Heart className="w-4 h-4 mr-1" />
                          Donate
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {userRole === 'ngo' ? 'Your Impact Dashboard' : 'Your Personal Impact'}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {userRole === 'ngo' 
                    ? 'See the real-world difference your campaigns are making in communities worldwide'
                    : 'Track the positive change you\'re creating through your donations'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentImpactMetrics.map((metric, index) => (
                  <Card key={index} className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${metric.bg} flex items-center justify-center mx-auto mb-4`}>
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      <AnimatedCounter 
                        value={metric.value} 
                        suffix={metric.suffix || ''} 
                      />
                    </div>
                    <p className="text-gray-600">{metric.label}</p>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Impact Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={donationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey={userRole === 'ngo' ? 'donors' : 'personal'} 
                        stroke={userRole === 'ngo' ? '#22c55e' : '#3b82f6'} 
                        strokeWidth={3}
                        dot={{ fill: userRole === 'ngo' ? '#22c55e' : '#3b82f6', strokeWidth: 2, r: 4 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Success Stories</h3>
                  <div className="space-y-4">
                    {userRole === 'ngo' ? (
                      <>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Clean Water Access</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Provided clean water access to 5,420 people across 12 villages in rural areas.
                          </p>
                          <span className="text-xs text-green-600 font-medium">Completed • 3 months ago</span>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Education Initiative</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Built 3 schools and provided education materials for 2,100 children.
                          </p>
                          <span className="text-xs text-blue-600 font-medium">Completed • 6 months ago</span>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Healthcare Program</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Established mobile clinics serving 8,900 people in remote communities.
                          </p>
                          <span className="text-xs text-purple-600 font-medium">Ongoing • Started 2 months ago</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Education Support</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Your donations helped provide education for 45 children this year.
                          </p>
                          <span className="text-xs text-blue-600 font-medium">RM 3,500 donated</span>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Clean Water Project</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Contributed to providing clean water access for 120 people.
                          </p>
                          <span className="text-xs text-green-600 font-medium">RM 2,200 donated</span>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Healthcare Initiative</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Helped provide medical care and supplies for 80 families.
                          </p>
                          <span className="text-xs text-red-600 font-medium">RM 1,800 donated</span>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'discover' && userRole === 'donor' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover New NGOs</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Find new causes to support and expand your impact
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => {
                  const progress = (campaign.raised / campaign.goal) * 100;
                  return (
                    <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full">
                            {campaign.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Button variant="ghost" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{campaign.title}</h3>
                        <ProgressBar progress={progress} className="mb-3" />
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <span>RM {campaign.raised.toLocaleString()}</span>
                          <span>{progress.toFixed(0)}% funded</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <span>{campaign.donors} donors</span>
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            Learn More
                          </Button>
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Heart className="w-4 h-4 mr-1" />
                            Donate
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="text-center">
                <Link to="/discover">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4 mr-2" />
                    Explore All NGOs
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};