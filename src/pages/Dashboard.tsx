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
  LineChart
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
  AreaChart
} from 'recharts';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data for dashboard
  const userStats = {
    totalRaised: 2450000,
    totalDonors: 1847,
    activeCampaigns: 3,
    completedCampaigns: 7,
    totalImpact: 15420,
    averageDonation: 1327,
    conversionRate: 12.4,
    monthlyGrowth: 23.5
  };

  const recentDonations = [
    { id: 1, donor: 'Anonymous', amount: 500, campaign: 'Clean Water Initiative', time: '2 hours ago', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
    { id: 2, donor: 'Sarah Chen', amount: 1000, campaign: 'Education for All', time: '4 hours ago', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
    { id: 3, donor: 'Michael Rodriguez', amount: 250, campaign: 'Healthcare Access', time: '6 hours ago', avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg' },
    { id: 4, donor: 'Emma Wilson', amount: 750, campaign: 'Clean Water Initiative', time: '8 hours ago', avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg' },
    { id: 5, donor: 'David Kim', amount: 2000, campaign: 'Education for All', time: '1 day ago', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg' }
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
    { month: 'Jan', amount: 45000, donors: 120 },
    { month: 'Feb', amount: 52000, donors: 145 },
    { month: 'Mar', amount: 48000, donors: 132 },
    { month: 'Apr', amount: 61000, donors: 167 },
    { month: 'May', amount: 55000, donors: 151 },
    { month: 'Jun', amount: 67000, donors: 189 },
    { month: 'Jul', amount: 73000, donors: 203 },
    { month: 'Aug', amount: 69000, donors: 195 },
    { month: 'Sep', amount: 78000, donors: 218 },
    { month: 'Oct', amount: 82000, donors: 234 },
    { month: 'Nov', amount: 89000, donors: 251 },
    { month: 'Dec', amount: 95000, donors: 267 }
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'campaigns', label: 'My Campaigns', icon: Heart },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'donations', label: 'Donations', icon: DollarSign },
    { id: 'impact', label: 'Impact', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
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
                Here's what's happening with your NGO campaigns
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <Button variant="outline" className="flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Link to="/create">
                <Button className="flex items-center bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Campaign
                </Button>
              </Link>
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
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Raised</p>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={userStats.totalRaised} prefix="RM " />
                </div>
                <div className="flex items-center mt-2 text-blue-100">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span className="text-sm">+{userStats.monthlyGrowth}% this month</span>
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
                  <AnimatedCounter value={userStats.totalDonors} />
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
                  <AnimatedCounter value={userStats.activeCampaigns} />
                </div>
                <div className="flex items-center mt-2 text-purple-100">
                  <Activity className="w-4 h-4 mr-1" />
                  <span className="text-sm">{userStats.completedCampaigns} completed</span>
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
                  <AnimatedCounter value={userStats.averageDonation} prefix="RM " />
                </div>
                <div className="flex items-center mt-2 text-orange-100">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">{userStats.conversionRate}% conversion</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-orange-200" />
            </div>
          </Card>
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
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
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
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
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
                    {impactMetrics.map((metric, index) => (
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

          {activeTab === 'campaigns' && (
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

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Donation Categories */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Donations by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </Card>

                {/* Monthly Comparison */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={donationData.slice(-6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`RM ${value.toLocaleString()}`, 'Amount']} />
                      <Bar dataKey="amount" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Detailed Analytics */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      <AnimatedCounter value={userStats.conversionRate} suffix="%" />
                    </div>
                    <p className="text-gray-600">Conversion Rate</p>
                    <div className="flex items-center justify-center mt-2 text-green-600">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">+2.3% vs last month</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      <AnimatedCounter value={userStats.averageDonation} prefix="RM " />
                    </div>
                    <p className="text-gray-600">Average Donation</p>
                    <div className="flex items-center justify-center mt-2 text-green-600">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">+15.7% vs last month</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      <AnimatedCounter value={userStats.totalImpact} />
                    </div>
                    <p className="text-gray-600">People Impacted</p>
                    <div className="flex items-center justify-center mt-2 text-green-600">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="text-sm">+8.9% vs last month</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Donation History</h2>
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

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Donor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Campaign
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentDonations.map((donation) => (
                        <tr key={donation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={donation.avatar}
                                alt={donation.donor}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <span className="text-sm font-medium text-gray-900">
                                {donation.donor}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {donation.campaign}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                            RM {donation.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {donation.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Impact Dashboard</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  See the real-world difference your campaigns are making in communities worldwide
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {impactMetrics.map((metric, index) => (
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
                        dataKey="donors" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Success Stories</h3>
                  <div className="space-y-4">
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
                  </div>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};