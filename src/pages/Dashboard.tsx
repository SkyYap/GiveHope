import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Heart, 
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
  Activity,
  Globe,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  X,
  ExternalLink
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
import { ValueType, Payload } from 'recharts/types/component/DefaultTooltipContent';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Dashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<'donor' | 'ngo'>('donor');
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showKycModal, setShowKycModal] = useState(false);
  const [kycNgoName, setKycNgoName] = useState("");
  const [kycAdminEmail, setKycAdminEmail] = useState("");
  const [kycAdminIc, setKycAdminIc] = useState("");
  const [kycStep, setKycStep] = useState(1);
  const [maschainWalletAddress, setMaschainWalletAddress] = useState("");
  const [kycVerificationUrl, setKycVerificationUrl] = useState("");
  const { address: web3WalletAddress } = useAccount();

  // Reset active tab when switching roles
  useEffect(() => {
    setActiveTab('overview');
  }, [userRole]);

  // Generate data based on time range
  const generateDonationData = (range: string) => {
    const baseData = {
      '7d': [
        { period: 'Mon', amount: 1200, backers: 8, date: '2024-01-15' },
        { period: 'Tue', amount: 1800, backers: 12, date: '2024-01-16' },
        { period: 'Wed', amount: 2200, backers: 15, date: '2024-01-17' },
        { period: 'Thu', amount: 1600, backers: 11, date: '2024-01-18' },
        { period: 'Fri', amount: 2800, backers: 19, date: '2024-01-19' },
        { period: 'Sat', amount: 3200, backers: 22, date: '2024-01-20' },
        { period: 'Sun', amount: 2400, backers: 16, date: '2024-01-21' }
      ],
      '30d': [
        { period: 'Week 1', amount: 12000, backers: 80, date: 'Jan 1-7' },
        { period: 'Week 2', amount: 15000, backers: 95, date: 'Jan 8-14' },
        { period: 'Week 3', amount: 18000, backers: 110, date: 'Jan 15-21' },
        { period: 'Week 4', amount: 22000, backers: 130, date: 'Jan 22-28' }
      ],
      '90d': [
        { period: 'Month 1', amount: 45000, backers: 320, date: 'Nov 2023' },
        { period: 'Month 2', amount: 52000, backers: 380, date: 'Dec 2023' },
        { period: 'Month 3', amount: 67000, backers: 450, date: 'Jan 2024' }
      ],
      '1y': [
        { period: 'Q1', amount: 120000, backers: 800, date: 'Q1 2023' },
        { period: 'Q2', amount: 145000, backers: 950, date: 'Q2 2023' },
        { period: 'Q3', amount: 168000, backers: 1100, date: 'Q3 2023' },
        { period: 'Q4', amount: 195000, backers: 1300, date: 'Q4 2023' }
      ]
    };
    return baseData[range as keyof typeof baseData] || baseData['30d'];
  };

  const donationData = generateDonationData(timeRange);

  // Mock data for dashboard
  const ngoStats = {
    totalRaised: 2450000,
    totalBackers: 1847,
    activeCampaigns: 3,
    completedCampaigns: 7,
    totalImpact: 15420,
    averageDonation: 1327,
    conversionRate: 12.4,
    monthlyGrowth: 23.5
  };

  const donorStats = {
    totalDonated: 12500,
    ngosSupported: 8,
    impactPoints: 2340,
    donationStreak: 15,
    monthlyAverage: 850,
    yearlyTotal: 10200,
    favoriteCategory: 'Education',
    lastDonation: '3 days ago'
  };

  const recentDonations = [
    { id: 1, donor: 'Anonymous', amount: 500, campaign: 'Clean Water Initiative', time: '2 hours ago', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', status: 'completed' },
    { id: 2, donor: 'Sarah Chen', amount: 1000, campaign: 'Education for All', time: '4 hours ago', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', status: 'completed' },
    { id: 3, donor: 'Michael Rodriguez', amount: 250, campaign: 'Healthcare Access', time: '6 hours ago', avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg', status: 'pending' },
    { id: 4, donor: 'Emma Wilson', amount: 750, campaign: 'Clean Water Initiative', time: '8 hours ago', avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg', status: 'completed' },
    { id: 5, donor: 'David Kim', amount: 2000, campaign: 'Education for All', time: '1 day ago', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', status: 'completed' }
  ];

  const myDonationHistory = [
    { id: 1, ngo: 'Clean Water Initiative', amount: 500, date: '2024-01-20', status: 'completed', impact: 'Provided clean water for 25 people' },
    { id: 2, ngo: 'Education for All', amount: 1000, date: '2024-01-15', status: 'completed', impact: 'Funded school supplies for 50 children' },
    { id: 3, ngo: 'Healthcare Access', amount: 250, date: '2024-01-10', status: 'completed', impact: 'Supported 10 medical consultations' },
    { id: 4, ngo: 'Environmental Protection', amount: 750, date: '2024-01-05', status: 'completed', impact: 'Planted 150 trees' },
    { id: 5, ngo: 'Poverty Alleviation', amount: 300, date: '2023-12-28', status: 'completed', impact: 'Provided meals for 60 families' }
  ];

  const supportedNGOs = [
    { id: 1, name: 'Clean Water Initiative', totalDonated: 1500, lastDonation: '2024-01-20', campaigns: 3, image: 'https://images.pexels.com/photos/2260655/pexels-photo-2260655.jpeg' },
    { id: 2, name: 'Education for All', totalDonated: 2000, lastDonation: '2024-01-15', campaigns: 2, image: 'https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg' },
    { id: 3, name: 'Healthcare Access', totalDonated: 750, lastDonation: '2024-01-10', campaigns: 1, image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg' },
    { id: 4, name: 'Environmental Protection', totalDonated: 1250, lastDonation: '2024-01-05', campaigns: 4, image: 'https://images.pexels.com/photos/347140/pexels-photo-347140.jpeg' }
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Clean Water Initiative',
      status: 'active',
      raised: 850000,
      goal: 1000000,
      backers: 542,
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
      backers: 789,
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
      backers: 516,
      daysLeft: 42,
      image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg',
      category: 'Healthcare'
    }
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
    { label: 'People Helped', value: 234, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'NGOs Supported', value: 8, icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Impact Points', value: 2340, icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Donation Streak', value: 15, icon: Target, color: 'text-orange-600', bg: 'bg-orange-50', suffix: ' days' }
  ];

  const ngoTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'campaigns', label: 'My Campaigns', icon: Heart },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'donations', label: 'Donations', icon: DollarSign },
    { id: 'impact', label: 'Impact', icon: Award }
  ];

  const donorTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'donations', label: 'My Donations', icon: DollarSign },
    { id: 'ngos', label: 'Supported NGOs', icon: Heart },
    { id: 'impact', label: 'My Impact', icon: Award }
  ];

  const currentTabs = userRole === 'ngo' ? ngoTabs : donorTabs;

  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  const handleKycSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/wallet/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ngoName: kycNgoName, adminEmail: kycAdminEmail, adminIc: kycAdminIc })
      });
      const data = await res.json();
      setMaschainWalletAddress(data.walletAddress || "");
      setKycStep(2);
      // Optionally show success or error message
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    if (kycStep === 2 && web3WalletAddress && !maschainWalletAddress) {
      fetch(`/api/wallet/by-web3/${web3WalletAddress}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
          if (data.maschainWalletAddress) setMaschainWalletAddress(data.maschainWalletAddress);
        })
        .catch(() => {
          setMaschainWalletAddress("");
        });
    }
  }, [kycStep, web3WalletAddress, maschainWalletAddress]);

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
                {userRole === 'ngo' 
                  ? "Here's what's happening with your NGO campaigns"
                  : "Track your donations and see the impact you're making"
                }
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              {/* Role Switcher */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Role:</span>
                <div className="relative">
                  <button
                    onClick={() => setUserRole(userRole === 'donor' ? 'ngo' : 'donor')}
                    className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      userRole === 'ngo' 
                        ? 'bg-green-600 focus:ring-green-500' 
                        : 'bg-blue-600 focus:ring-blue-500'
                    }`}
                  >
                    <span
                      className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                        userRole === 'ngo' ? 'translate-x-11' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <div className="absolute -bottom-6 left-0 right-0 text-center">
                    <span className={`text-xs font-medium ${
                      userRole === 'ngo' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {userRole === 'ngo' ? 'NGO Admin' : 'Donor'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {userRole === 'ngo' && (
                  <>
                    <Link to="#">
                      <Button className="flex items-center bg-green-600 hover:bg-green-700" onClick={() => setShowKycModal(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        e-KYC Your Account
                      </Button>
                    </Link>
                    {showKycModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <Card className="w-full max-w-2xl p-12 relative">
                          <button className="absolute top-5 right-6 text-3xl text-gray-400 hover:text-gray-600" onClick={() => { setShowKycModal(false); setKycStep(1); }}>&times;</button>
                          {/* Stepper */}
                          <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center space-x-8">
                              <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-4 ${kycStep === 1 ? 'bg-blue-600 text-white border-blue-400' : 'bg-gray-200 text-gray-500 border-gray-300'}`}>1</div>
                                <span className={`mt-2 font-semibold ${kycStep === 1 ? 'text-blue-700' : 'text-gray-500'}`}>Step 1</span>
                              </div>
                              <div className="w-12 h-1 bg-blue-200" />
                              <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-4 ${kycStep === 2 ? 'bg-blue-600 text-white border-blue-400' : 'bg-gray-200 text-gray-500 border-gray-300'}`}>2</div>
                                <span className={`mt-2 font-semibold ${kycStep === 2 ? 'text-blue-700' : 'text-gray-500'}`}>Step 2</span>
                              </div>
                              <div className="w-12 h-1 bg-blue-200" />
                              <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-4 ${kycStep === 3 ? 'bg-blue-600 text-white border-blue-400' : 'bg-gray-200 text-gray-500 border-gray-300'}`}>3</div>
                                <span className={`mt-2 font-semibold ${kycStep === 3 ? 'text-blue-700' : 'text-gray-500'}`}>Step 3</span>
                              </div>
                            </div>
                          </div>
                          <h2 className="text-3xl font-bold mb-6 text-center">e-KYC Your Account</h2>
                          {kycStep === 1 && (
                            <form onSubmit={handleKycSubmit} className="space-y-6">
                              <div>
                                <label className="block text-base font-medium mb-2">NGO Name</label>
                                <input type="text" className="w-full border rounded px-4 py-3 text-lg" value={kycNgoName} onChange={e => setKycNgoName(e.target.value)} required />
                              </div>
                              <div>
                                <label className="block text-base font-medium mb-2">Admin Email</label>
                                <input type="email" className="w-full border rounded px-4 py-3 text-lg" value={kycAdminEmail} onChange={e => setKycAdminEmail(e.target.value)} required />
                              </div>
                              <div>
                                <label className="block text-base font-medium mb-2">Admin IC</label>
                                <input type="text" className="w-full border rounded px-4 py-3 text-lg" value={kycAdminIc} onChange={e => setKycAdminIc(e.target.value)} required />
                              </div>
                              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">Next</Button>
                            </form>
                          )}
                          {kycStep === 2 && (
                            <div className="space-y-6">
                              <div>
                                <label className="block text-base font-medium mb-2">Web3 Wallet Address</label>
                                <input type="text" className="w-full border rounded px-4 py-3 text-lg bg-gray-100 text-gray-500" value={web3WalletAddress || ''} disabled />
                              </div>
                              <div>
                                <label className="block text-base font-medium mb-2">Maschain Wallet Address</label>
                                <input type="text" className="w-full border rounded px-4 py-3 text-lg bg-gray-100 text-gray-500" value={maschainWalletAddress} disabled />
                              </div>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3" onClick={() => {
                                // Placeholder for /api/kyc/start integration
                                setKycVerificationUrl('https://ekyc.maschain.com/your-kyc-link');
                                setKycStep(3);
                              }}>Confirm</Button>
                            </div>
                          )}
                          {kycStep === 3 && (
                            <div className="space-y-8 flex flex-col items-center justify-center">
                              <div className="text-2xl font-bold text-center">Proceed to KYC Verification</div>
                              <a
                                href={kycVerificationUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-lg font-medium px-6 py-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition"
                              >
                                Click here to complete your KYC
                              </a>
                            </div>
                          )}
                        </Card>
                      </div>
                    )}
                  </>
                )}
                {userRole === 'donor' && (
                  <Button className="flex items-center bg-purple-600 hover:bg-purple-700">
                    <Clock className="w-4 h-4 mr-2" />
                    Redeem All Expired Stakes
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {web3WalletAddress ? (
          <>
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
                          <AnimatedCounter value={ngoStats.totalRaised} prefix="USD " />
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
                        <p className="text-green-100 text-sm font-medium">Total Backers</p>
                        <div className="text-2xl font-bold">
                          <AnimatedCounter value={ngoStats.totalBackers} />
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
                          <AnimatedCounter value={ngoStats.activeCampaigns} />
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
                          <AnimatedCounter value={ngoStats.averageDonation} prefix="USD" />
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
                          <AnimatedCounter value={donorStats.totalDonated} prefix="USD" />
                        </div>
                        <div className="flex items-center mt-2 text-blue-100">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          <span className="text-sm">Last: {donorStats.lastDonation}</span>
                        </div>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-200" />
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100 text-sm font-medium">NGOs Supported</p>
                        <div className="text-2xl font-bold">
                          <AnimatedCounter value={donorStats.ngosSupported} />
                        </div>
                        <div className="flex items-center mt-2 text-red-100">
                          <Heart className="w-4 h-4 mr-1" />
                          <span className="text-sm">Favorite: {donorStats.favoriteCategory}</span>
                        </div>
                      </div>
                      <Heart className="w-8 h-8 text-red-200" />
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
                          <Award className="w-4 h-4 mr-1" />
                          <span className="text-sm">Monthly avg: USD{donorStats.monthlyAverage}</span>
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
                          <AnimatedCounter value={donorStats.donationStreak} suffix=" days" />
                        </div>
                        <div className="flex items-center mt-2 text-orange-100">
                          <Target className="w-4 h-4 mr-1" />
                          <span className="text-sm">Keep it up!</span>
                        </div>
                      </div>
                      <Target className="w-8 h-8 text-orange-200" />
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
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Donation Trends */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {userRole === 'ngo' ? 'Donation Trends' : 'My Donation History'}
                        </h3>
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
                          <XAxis dataKey="period" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: ValueType, name: "amount" | "backers") => [
                              name === 'amount' ? `USD ${value.toLocaleString()}` : value,
                              name === 'amount' ? 'Amount' : 'Backers'
                            ]}
                            labelFormatter={(label: any, payload: Payload<ValueType, "amount" | "backers">[]) => {
                              if (payload && payload[0]) {
                                return `${label} (${payload[0].payload.date})`;
                              }
                              return label;
                            }}
                          />
                          <Area type="monotone" dataKey="amount" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="backers" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Card>

                    {/* Campaign Performance / My Donations */}
                    {userRole === 'ngo' ? (
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
                                      <span>USD {campaign.raised.toLocaleString()} of USD {campaign.goal.toLocaleString()}</span>
                                      <span>{campaign.backers} backers • {campaign.daysLeft} days since launch</span>
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
                    ) : (
                      <Card className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Donations</h3>
                        <div className="space-y-4">
                          {myDonationHistory.slice(0, 3).map((donation) => (
                            <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{donation.ngo}</h4>
                                <span className="text-lg font-bold text-green-600">
                                  USD {donation.amount}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{donation.impact}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{donation.date}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {donation.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Recent Activity */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleActivityClick(recentDonations[0])}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {recentDonations.slice(0, 5).map((donation) => (
                          <div 
                            key={donation.id} 
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                            onClick={() => handleActivityClick(donation)}
                          >
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
                                +USD {donation.amount}
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {userRole === 'ngo' ? 'Impact Overview' : 'Your Impact'}
                      </h3>
                      <div className="space-y-4">
                        {(userRole === 'ngo' ? impactMetrics : donorImpactMetrics).map((metric, index) => (
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
                        {userRole === 'ngo' ? (
                          <>
                            <Link to="/create">
                              <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Create New Campaign
                              </Button>
                            </Link>
                            <Button variant="outline" className="w-full justify-start">
                              <Bell className="w-4 h-4 mr-2" />
                              Send Update to Backers
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Settings className="w-4 h-4 mr-2" />
                              Account Settings
                            </Button>
                          </>
                        ) : (
                          <>
                            <Link to="/discover">
                              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                                <Search className="w-4 h-4 mr-2" />
                                Find New NGOs
                              </Button>
                            </Link>
                            <Button variant="outline" className="w-full justify-start">
                              <Bell className="w-4 h-4 mr-2" />
                              Notification Settings
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Settings className="w-4 h-4 mr-2" />
                              Account Settings
                            </Button>
                          </>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Other tabs content */}
              {activeTab === 'donations' && userRole === 'donor' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">My Donation History</h2>
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
                              NGO
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Impact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {myDonationHistory.map((donation) => (
                            <tr key={donation.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                  {donation.ngo}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                USD {donation.amount.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {donation.date}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                {donation.impact}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                  {donation.status}
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

              {activeTab === 'ngos' && userRole === 'donor' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Supported NGOs</h2>
                    <Link to="/discover">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Support New NGO
                      </Button>
                    </Link>
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
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{ngo.name}</h3>
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex justify-between">
                              <span>Total Donated:</span>
                              <span className="font-semibold text-green-600">USD {ngo.totalDonated}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Campaigns Supported:</span>
                              <span className="font-medium">{ngo.campaigns}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last Donation:</span>
                              <span className="font-medium">{ngo.lastDonation}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Visit
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* NGO specific tabs */}
              {userRole === 'ngo' && activeTab === 'campaigns' && (
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
                              <span>USD {campaign.raised.toLocaleString()}</span>
                              <span>{progress.toFixed(0)}% funded</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-4">
                              <span>{campaign.backers} backers</span>
                              <span>{campaign.daysLeft} days since launch</span>
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

              {userRole === 'ngo' && activeTab === 'analytics' && (
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
                            label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
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
                        <BarChart data={donationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="period" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`USD ${value.toLocaleString()}`, 'Amount']} />
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
                          <AnimatedCounter value={ngoStats.conversionRate} suffix="%" />
                        </div>
                        <p className="text-gray-600">Conversion Rate</p>
                        <div className="flex items-center justify-center mt-2 text-green-600">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          <span className="text-sm">+2.3% vs last month</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          <AnimatedCounter value={ngoStats.averageDonation} prefix="USD" />
                        </div>
                        <p className="text-gray-600">Average Donation</p>
                        <div className="flex items-center justify-center mt-2 text-green-600">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          <span className="text-sm">+15.7% vs last month</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          <AnimatedCounter value={ngoStats.totalImpact} />
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

              {userRole === 'ngo' && activeTab === 'donations' && (
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
                            USD {donation.amount.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {donation.time}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {donation.status}
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
                    {(userRole === 'ngo' ? impactMetrics : donorImpactMetrics).map((metric, index) => (
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
                          <XAxis dataKey="period" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="backers" 
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
                            {userRole === 'ngo' 
                              ? 'Provided clean water access to 5,420 people across 12 villages in rural areas.'
                              : 'Your donations helped provide clean water access to 234 people in rural communities.'
                            }
                          </p>
                          <span className="text-xs text-green-600 font-medium">Completed • 3 months ago</span>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Education Initiative</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {userRole === 'ngo'
                              ? 'Built 3 schools and provided education materials for 2,100 children.'
                              : 'Contributed to building schools and providing education for 89 children.'
                            }
                          </p>
                          <span className="text-xs text-blue-600 font-medium">Completed • 6 months ago</span>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Healthcare Program</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {userRole === 'ngo'
                              ? 'Established mobile clinics serving 8,900 people in remote communities.'
                              : 'Supported mobile clinics that served 156 people in remote areas.'
                            }
                          </p>
                          <span className="text-xs text-purple-600 font-medium">Ongoing • Started 2 months ago</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-10 mt-10"
          >
            <img src="/placeholder-connect-wallet.svg" alt="Connect Wallet" className="w-32 h-32 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Wallet Not Connected</h2>
            <p className="text-lg text-gray-600 text-center mb-6">
              Please connect your crypto wallet to access your dashboard and view your activity.
            </p>
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <Button onClick={openConnectModal} className="bg-blue-600 hover:bg-blue-700">
                  Connect Wallet
                </Button>
              )}
            </ConnectButton.Custom>
          </motion.div>
        )}

        {/* Activity Detail Modal */}
        {showActivityModal && selectedActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Donation Details</h3>
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedActivity.avatar}
                    alt={selectedActivity.donor}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{selectedActivity.donor}</p>
                    <p className="text-sm text-gray-500">{selectedActivity.time}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-semibold text-green-600">USD {selectedActivity.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Campaign</p>
                      <p className="font-medium">{selectedActivity.campaign}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        selectedActivity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedActivity.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500">Transaction ID</p>
                      <p className="font-mono text-xs">0x1234...5678</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-2">Message from donor:</p>
                  <p className="text-sm text-gray-700 italic">
                    "Happy to support this amazing cause. Keep up the great work!"
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Transaction
                </Button>
                <Button 
                  onClick={() => setShowActivityModal(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};