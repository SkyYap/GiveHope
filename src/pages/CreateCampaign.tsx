import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Plus, 
  X, 
  AlertCircle,
  CheckCircle2 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { categories } from '../data/mockData';

interface FormData {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  fundingGoal: number;
  campaignDuration: number;
  coverImage: string;
  teamMembers: Array<{
    name: string;
    role: string;
    bio: string;
  }>;
  rewardTiers: Array<{
    title: string;
    minAmount: number;
    description: string;
    rewards: string[];
  }>;
  socialLinks: {
    website: string;
    twitter: string;
    discord: string;
    github: string;
  };
}

export const CreateCampaign: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();

  const totalSteps = 6;

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Project title and description' },
    { id: 2, title: 'Funding', description: 'Goal and duration' },
    { id: 3, title: 'Media', description: 'Images and videos' },
    { id: 4, title: 'Team', description: 'Team members' },
    { id: 5, title: 'Rewards', description: 'Investment tiers' },
    { id: 6, title: 'Review', description: 'Final review' },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Campaign data:', data);
    // Handle form submission
  };

  const addTeamMember = () => {
    const currentTeam = watch('teamMembers') || [];
    setValue('teamMembers', [...currentTeam, { name: '', role: '', bio: '' }]);
  };

  const removeTeamMember = (index: number) => {
    const currentTeam = watch('teamMembers') || [];
    setValue('teamMembers', currentTeam.filter((_, i) => i !== index));
  };

  const addRewardTier = () => {
    const currentTiers = watch('rewardTiers') || [];
    setValue('rewardTiers', [...currentTiers, { title: '', minAmount: 0, description: '', rewards: [''] }]);
  };

  const removeRewardTier = (index: number) => {
    const currentTiers = watch('rewardTiers') || [];
    setValue('rewardTiers', currentTiers.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Create Campaign
          </h1>
          <p className="text-xl text-gray-600">
            Launch your Web3 project and connect with backers worldwide
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-center p-3 rounded-lg ${
                    step.id === currentStep
                      ? 'bg-blue-50 border border-blue-200'
                      : step.id < currentStep
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      step.id === currentStep
                        ? 'bg-blue-600 text-white'
                        : step.id < currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500 hidden md:block">{step.description}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      {...register('title', { required: 'Project title is required' })}
                      type="text"
                      placeholder="Enter your project title"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description *
                    </label>
                    <input
                      {...register('shortDescription', { required: 'Short description is required' })}
                      type="text"
                      placeholder="Brief description of your project"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.shortDescription && (
                      <p className="mt-1 text-sm text-red-600">{errors.shortDescription.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={6}
                      placeholder="Provide a detailed description of your project..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Funding */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Funding Details</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Funding Goal (USD) *
                    </label>
                    <input
                      {...register('fundingGoal', { 
                        required: 'Funding goal is required',
                        min: { value: 1000, message: 'Minimum funding goal is $1,000' }
                      })}
                      type="number"
                      placeholder="1000000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.fundingGoal && (
                      <p className="mt-1 text-sm text-red-600">{errors.fundingGoal.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Duration (days) *
                    </label>
                    <select
                      {...register('campaignDuration', { required: 'Campaign duration is required' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select duration</option>
                      <option value="30">30 days</option>
                      <option value="45">45 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                    </select>
                    {errors.campaignDuration && (
                      <p className="mt-1 text-sm text-red-600">{errors.campaignDuration.message}</p>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Platform Fee Information</h4>
                        <p className="text-sm text-blue-700">
                          Our platform charges a 5% fee on successfully funded campaigns. This covers smart contract deployment, security audits, and platform maintenance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Media */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Media</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Image *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      <Button variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">Upload</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Team */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                    <Button type="button" onClick={addTeamMember} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                  
                  {watch('teamMembers')?.map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Team Member {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                          </label>
                          <input
                            {...register(`teamMembers.${index}.name`)}
                            type="text"
                            placeholder="Full name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                          </label>
                          <input
                            {...register(`teamMembers.${index}.role`)}
                            type="text"
                            placeholder="e.g. CEO, CTO, Developer"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          {...register(`teamMembers.${index}.bio`)}
                          rows={3}
                          placeholder="Brief bio and experience..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}

                  {(!watch('teamMembers') || watch('teamMembers')?.length === 0) && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">No team members added yet</p>
                      <Button type="button" onClick={addTeamMember} className="mt-4">
                        Add First Team Member
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Rewards */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Investment Tiers</h2>
                    <Button type="button" onClick={addRewardTier} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tier
                    </Button>
                  </div>
                  
                  {watch('rewardTiers')?.map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Tier {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeRewardTier(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tier Title
                          </label>
                          <input
                            {...register(`rewardTiers.${index}.title`)}
                            type="text"
                            placeholder="e.g. Early Supporter"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Amount (USD)
                          </label>
                          <input
                            {...register(`rewardTiers.${index}.minAmount`)}
                            type="number"
                            placeholder="100"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          {...register(`rewardTiers.${index}.description`)}
                          rows={2}
                          placeholder="Describe this investment tier..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}

                  {(!watch('rewardTiers') || watch('rewardTiers')?.length === 0) && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">No investment tiers created yet</p>
                      <Button type="button" onClick={addRewardTier} className="mt-4">
                        Create First Tier
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-green-900 mb-1">Campaign Ready for Review</h4>
                        <p className="text-sm text-green-700">
                          Your campaign will be reviewed by our team within 24-48 hours. You'll receive an email once it's approved and live.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Ready to launch your campaign?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      By submitting, you agree to our terms of service and campaign guidelines.
                    </p>
                    <div className="flex justify-center space-x-4">
                      {/* <Button type="button" variant="outline" onClick={() => setPreview(true)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Campaign
                      </Button> */}
                      <Button type="submit" size="lg">
                        Create Onchain Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 6 && (
                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};