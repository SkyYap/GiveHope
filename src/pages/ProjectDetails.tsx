import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  CheckCircle2, 
  Share2, 
  Heart, 
  Globe, 
  Twitter,
  Github,
  MessageSquare,
} from 'lucide-react';
import { mockProjects } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [donationAmount, setDonationAmount] = useState('');
  const [donationDurationDays, setDonationDurationDays] = useState('365'); // Default to 1 year
  const [selectedYieldRatio, setSelectedYieldRatio] = useState(100); // Default to 100%
  const [impactYieldRatio, setImpactYieldRatio] = useState(100); // Default to 100% for impact projection
  const [isStaking, setIsStaking] = useState(false);

  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">NGO Not Found</h1>
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

  const donationTiers = [
    {
      title: 'Basic Supporter',
      minAmount: 100,
      description: 'Help us make a difference',
      rewards: ['Monthly email updates', 'Name on donor wall', 'Impact certificate'],
      available: 500,
      claimed: 234,
    },
    {
      title: 'Champion Donor',
      minAmount: 500,
      description: 'Significant support with exclusive benefits',
      rewards: ['All Basic Supporter benefits', 'Quarterly video updates', 'Personalized thank you letter', 'Digital badge'],
      available: 200,
      claimed: 89,
    },
    {
      title: 'Visionary Partner',
      minAmount: 2000,
      description: 'Partnership level with direct team access',
      rewards: ['All previous benefits', 'Direct consultation with NGO leadership', 'Recognition in annual report', 'Invitation to virtual events'],
      available: 50,
      claimed: 12,
    },
  ];

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Executive Director',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Former international aid worker with 10+ years experience in humanitarian projects.',
    },
    {
      name: 'Sarah Kim',
      role: 'Program Director',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      bio: 'Specialist in community development with extensive field experience in Africa and Asia.',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Outreach Coordinator',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      bio: 'Communications expert focused on building partnerships and donor relations.',
    },
  ];

  const milestones = [
    {
      title: 'Initial Outreach',
      description: 'Community assessment and program design',
      targetDate: new Date('2024-03-15'),
      completed: true,
      fundingRequired: 25000,
    },
    {
      title: 'Resource Acquisition',
      description: 'Procurement of necessary supplies and equipment',
      targetDate: new Date('2024-04-30'),
      completed: false,
      fundingRequired: 50000,
    },
    {
      title: 'Program Launch',
      description: 'Official launch of community services',
      targetDate: new Date('2024-06-01'),
      completed: false,
      fundingRequired: 75000,
    },
    {
      title: 'Impact Assessment',
      description: 'Evaluation of program effectiveness and community feedback',
      targetDate: new Date('2024-07-15'),
      completed: false,
      fundingRequired: 100000,
    },
  ];

  // Impact projection with 10% annual interest, prorated for period and yield-sharing ratio
  const annualInterestRate = 0.10;
  const principal = Number(donationAmount) || 0;
  const duration = Number(donationDurationDays) || 1;
  const yieldRatio = impactYieldRatio / 100;
  const periodInterest = principal * annualInterestRate * (duration / 365);
  const yieldSharedInterest = periodInterest * yieldRatio;
  const dailyInterest = yieldSharedInterest / duration;
  const impactData = Array.from({ length: duration }, (_, i) => ({
    day: i + 1,
    impact: dailyInterest * (i + 1)
  }));

  const handleStakeNow = async () => {
    if (isStaking) return;
    setIsStaking(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Explicitly request account access to ensure MetaMask popup
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractAddress = "0xD7B189A02f6Bc6f041346474B981C856479bFaC0";
      const abi = [
        {
          "inputs": [
            { "internalType": "uint256", "name": "_id", "type": "uint256" }
          ],
          "name": "donateToCampaign",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.donateToCampaign(0, { value: ethers.parseEther("0.01") });
      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      toast.success("Stake successful!");
    } catch (err) {
      console.error(err);
      let errorMsg = "Transaction failed.";
      if (typeof err === "string") {
        errorMsg += " " + err;
      } else if (err && typeof err === "object") {
        if ("message" in err) errorMsg += " " + (err as any).message;
        else if ("reason" in err) errorMsg += " " + (err as any).reason;
        else errorMsg += " " + JSON.stringify(err);
      }
      if ((err as any).code === 4001 || (err as any).code === "ACTION_REJECTED") {
        toast.error("You rejected the wallet request. Please approve it to continue.");
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/discover" 
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
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
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-600">Verified NGO</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
                  <p className="text-lg text-gray-600 mb-6">{project.shortDescription}</p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
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
                            ? 'border-green-500 text-green-600'
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
                        <h3 className="text-xl font-semibold mb-4">About This NGO</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          Our mission is to create sustainable solutions that address critical humanitarian needs while empowering local communities. We work closely with local partners to ensure our programs are culturally appropriate and build long-term resilience rather than dependency.
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
                                <p className="text-green-600 text-sm font-medium mb-2">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Roadmap */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Project Milestones</h3>
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
                                <p className="text-sm font-medium text-green-600">
                                  Funding Required: USD{milestone.fundingRequired.toLocaleString()}
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
                        <p className="text-gray-600">The NGO will post updates here as the project progresses.</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'comments' && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Join the discussion</h3>
                        <p className="text-gray-600">Be the first to comment on this NGO's work.</p>
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
                      USD {project.currentFunding.toLocaleString()}
                    </div>
                    <div className="text-gray-600">
                      of USD {project.fundingGoal.toLocaleString()} target staked amount
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
                      <div className="text-sm text-gray-600">Days since launch</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Enter amount (USDC)"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {/* Lock-in Period Selection */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Select lock-in period:</label>
                      <div className="flex gap-2">
                        {['6 Months', '1 Year', '2 Years'].map((period) => (
                          <button
                            key={period}
                            type="button"
                            className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors focus:outline-none ${donationDurationDays === period ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50'}`}
                            onClick={() => setDonationDurationDays(period)}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Yield-Sharing Ratio Selection */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Select yield-sharing ratio:</label>
                      <div className="flex gap-2">
                        {[50, 75, 100].map((ratio) => (
                          <button
                            key={ratio}
                            type="button"
                            className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors focus:outline-none ${selectedYieldRatio === ratio ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50'}`}
                            onClick={() => setSelectedYieldRatio(ratio)}
                          >
                            {ratio}%
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={handleStakeNow} disabled={isStaking}>
                      {isStaking ? "Processing..." : "Stake Now"}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Secure payment via smart contract
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Donation Tiers */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Donation Tiers</h3>
                  <div className="space-y-4">
                    {donationTiers.map((tier, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{tier.title}</h4>
                          <span className="text-sm font-medium text-green-600">
                            USD{tier.minAmount}+
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
                  <h3 className="text-lg font-semibold mb-4">NGO Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
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

        {/* Impact Projection Graph */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Impact Projection</h3>
            <div className="flex space-x-4 items-end mb-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1"> Amount (USDC)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Time Period (Days)</label>
                <input
                  type="number"
                  placeholder="Enter days"
                  value={donationDurationDays}
                  onChange={(e) => setDonationDurationDays(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Yield-Sharing Ratio (%)</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  step={1}
                  value={impactYieldRatio}
                  onChange={e => setImpactYieldRatio(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={handleStakeNow} disabled={isStaking}>
                  {isStaking ? "Processing..." : "Stake Now"}
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="day" 
                  label={{ value: 'Day', position: 'outsideBottom', offset: 30 }} 
                  ticks={[30, 60, 90, 120, 150, duration]} // Show ticks every 30 days and the last day
                />
                <YAxis label={{ value: 'Actual Donate Amount', angle: -90, position: 'insideBottomLeft', offset: 30 }} />
                <Tooltip 
                  formatter={(value) => [`${Number(value).toFixed(2)} USDC`, 'Actual Donate Amount']} 
                />
                <Line type="monotone" dataKey="impact" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">
              Projected impact based on your stake amount and the NGO's efficiency metrics.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};