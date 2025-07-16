import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Plus, 
  X, 
  AlertCircle,
  CheckCircle2,
  Loader2,
  PartyPopper,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { categories } from '../data/mockData';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { abi, config, CROWDFUNDING_CONTRACT_ADDRESS } from '../config/web3';

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
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<FormData>();
  const { address: accountAddress } = useAccount();
  const { data: hash, writeContract, isPending: isWritePending, isError: isWriteError, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, isError: isConfirmError, error: confirmError } = useWaitForTransactionReceipt({ hash, config });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCoverImageFile, setSelectedCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [isUploadingToIPFS, setIsUploadingToIPFS] = useState<boolean>(false);

  const totalSteps = 6;

  const steps = [
    { id: 1, title: 'Basic Info', description: 'NGO details and mission' },
    { id: 2, title: 'Funding', description: 'Goal and duration' },
    { id: 3, title: 'Media', description: 'Images and videos' },
    { id: 4, title: 'Team', description: 'Team members' },
    { id: 5, title: 'Donation Tiers', description: 'Donation options' },
    { id: 6, title: 'Review', description: 'Final review' },
  ];

  const nextStep = async () => {
    let isValid = true;
    if (currentStep === 1) {
      isValid = await trigger(['title', 'shortDescription', 'category', 'description']);
    } else if (currentStep === 2) {
      isValid = await trigger(['fundingGoal', 'campaignDuration']);
    } else if (currentStep === 3) {
      isValid = await trigger('coverImage');
    } else if (currentStep === 4) {
      isValid = await trigger([
        'teamMembers',
        'teamMembers.0.name',
        'teamMembers.0.role',
        'teamMembers.0.bio',
      ]);
    } else if (currentStep === 5) {
      isValid = await trigger([
        'rewardTiers',
        'rewardTiers.0.title',
        'rewardTiers.0.minAmount',
        'rewardTiers.0.description'
      ])
    }

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
      setValue('coverImage', '');
    } else {
      setSelectedCoverImageFile(null);
      setCoverImagePreview(null);
      setValue('coverImage', '');
    }
    trigger('coverImage');
  };

  const onUploadToIPFS = async () => {
    if (!selectedCoverImageFile) {
      alert('Please select a file first.');
      return;
    }

    setIsUploadingToIPFS(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedCoverImageFile);

      const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
      const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET_API_KEY;

      if (!pinataApiKey || !pinataSecretApiKey) {
        throw new Error('Pinata API keys are not set in environment variables.');
      }

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretApiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Pinata upload failed: ${errorData.error}`);
      }

      const data = await response.json();
      const ipfsHash = `ipfs://${data.IpfsHash}`;
      setValue('coverImage', ipfsHash);
    } catch (error: any) {
      console.error('Error uploading to Pinata:', error);
      alert(`Failed to upload image to IPFS: ${error.message}`);
    } finally {
      setIsUploadingToIPFS(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log('Campaign data:', data);

    if (!accountAddress) {
      alert('Please connect your wallet to create a campaign.');
      return;
    }

    if (!data.coverImage || !data.coverImage.startsWith('ipfs://')) {
      alert('Please upload the cover image to IPFS first.');
      return;
    }

    try {
      // Get the enum index for category
      const _category = categories.find(cat => cat.id === data.category)?.value;
      if (_category === undefined) {
        throw new Error('Invalid category selected.');
      }
      // Prepare amounts
      const _goalAmount = parseEther(data.fundingGoal.toString());
      const _deadline = BigInt(Math.floor(Date.now() / 1000) + (data.campaignDuration * 24 * 60 * 60));

      // Prepare team members and investment tiers as structs
      const _teamMembers = data.teamMembers.map(member => ({
        name: member.name,
        role: member.role,
        bio: member.bio,
      }));

      const _investmentTiers = data.rewardTiers.map(tier => ({
        tierTitle: tier.title,
        minimumAmount: parseEther(tier.minAmount.toString()),
        description: tier.description,
      }));

      // Call the contract with correct argument order and types
      writeContract({
        address: CROWDFUNDING_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'createCampaign',
        args: [
          accountAddress,                // address _campaignOwner
          data.title,                    // string _title
          data.shortDescription,         // string _description (short)
          _category,                     // CampaignCategory (enum index)
          data.description,              // string _projectDescription (long)
          _goalAmount,                   // uint256 _goalAmount
          _deadline,                     // uint256 _deadline
          data.coverImage,               // string _image
          _teamMembers,                  // TeamMember[]
          _investmentTiers,              // InvestmentTier[]
        ],
      });
    } catch (err) {
      console.error('Error preparing contract write:', err);
    }
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
    setValue('rewardTiers', [...currentTiers, { title: '', minAmount: 0, description: ''}]);
  };

  const removeRewardTier = (index: number) => {
    const currentTiers = watch('rewardTiers') || [];
    setValue('rewardTiers', currentTiers.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Create NGO Campaign
          </h1>
          <p className="text-xl text-gray-600">
            Launch your humanitarian project and connect with compassionate backers worldwide
          </p>
        </motion.div>

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
              <span className="text-sm font-medium text-green-600">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-300"
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

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">NGO Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NGO Name / Project Title *
                    </label>
                    <input
                      {...register('title', { required: 'NGO name is required' })}
                      type="text"
                      placeholder="Enter your NGO or project name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mission Statement *
                    </label>
                    <input
                      {...register('shortDescription', { required: 'Mission statement is required' })}
                      type="text"
                      placeholder="Brief description of your NGO's mission"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      Detailed Description *
                    </label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={6}
                      placeholder="Provide a detailed description of your NGO's work, impact, and how the funds will be used..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Funding Details</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Funding Goal (USDC) *
                    </label>
                    <input
                      {...register('fundingGoal', { 
                        required: 'Funding goal is required',
                        min: { value: 1000, message: 'Minimum funding goal is RM1,000' }
                      })}
                      type="number"
                      placeholder="1000000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                          Our platform charges a 5% fee on successfully funded campaigns. This covers transaction processing, security verification, and platform maintenance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">NGO Media</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Image *
                    </label>
                    <input
                      type="file"
                      id="coverImageInput"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg, image/jpg"
                    />
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {coverImagePreview ? (
                        <img src={coverImagePreview} alt="Cover Preview" className="max-w-full h-48 object-contain mx-auto mb-4" />
                      ) : (
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      )}
                      <p className="text-gray-600 mb-2">
                        {selectedCoverImageFile ? selectedCoverImageFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      <Button type="button" variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </div>
                    <input
                      type="hidden"
                      {...register('coverImage', {
                        required: 'Cover image is required. Please upload and pin your image to IPFS.'
                      })}
                    />
                    {errors.coverImage && (
                      <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
                    )}
                    {selectedCoverImageFile && !watch('coverImage') && (
                      <div className="mt-4 text-center">
                        <Button 
                          type="button" 
                          onClick={onUploadToIPFS} 
                          disabled={isUploadingToIPFS}
                          className="w-full"
                        >
                          {isUploadingToIPFS ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading to IPFS...</>
                          ) : (
                            <><Upload className="w-4 h-4 mr-2" /> Upload to IPFS</>
                          )}
                        </Button>
                      </div>
                    )}

                    {watch('coverImage') && watch('coverImage').startsWith('ipfs://') && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                        <p className="text-sm text-green-700 font-medium">
                          Image uploaded to IPFS! <a href={`https://ipfs.io/ipfs/${watch('coverImage').replace('ipfs://', '')}`} target="_blank" rel="noopener noreferrer" className="font-mono text-blue-600 underline break-all">{watch('coverImage')}</a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                    <Button type="button" onClick={addTeamMember} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                  {/* Hidden input for teamMembers array validation */}
                  <input
                    type="hidden"
                    {...register('teamMembers', {
                      validate: value => (value && value.length > 0) || 'At least one team member is required'
                    })}
                  />
                  {errors.teamMembers && typeof errors.teamMembers.message === 'string' && (
                    <p className="mt-1 text-sm text-red-600">{errors.teamMembers.message}</p>
                  )}
                  {Array.isArray(watch('teamMembers')) && watch('teamMembers').map((_, index) => (
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
                            {...register(`teamMembers.${index}.name`, { required: index === 0 ? 'Name is required' : false })}
                            type="text"
                            placeholder="Full name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          {Array.isArray(errors.teamMembers) && errors.teamMembers[index]?.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.teamMembers[index]?.name?.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                          </label>
                          <input
                            {...register(`teamMembers.${index}.role`, { required: index === 0 ? 'Role is required' : false })}
                            type="text"
                            placeholder="e.g. Director, Program Manager"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          {Array.isArray(errors.teamMembers) && errors.teamMembers[index]?.role && (
                            <p className="mt-1 text-sm text-red-600">{errors.teamMembers[index]?.role?.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          {...register(`teamMembers.${index}.bio`, { required: index === 0 ? 'Bio is required' : false })}
                          rows={3}
                          placeholder="Brief bio and experience..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {Array.isArray(errors.teamMembers) && errors.teamMembers[index]?.bio && (
                          <p className="mt-1 text-sm text-red-600">{errors.teamMembers[index]?.bio?.message}</p>
                        )}
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

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Donation Tiers</h2>
                    <Button type="button" onClick={addRewardTier} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tier
                    </Button>
                  </div>
                  {/* Hidden input for rewardTiers array validation */}
                  <input
                    type="hidden"
                    {...register('rewardTiers', {
                      validate: value => (value && value.length > 0) || 'At least one donation tier is required'
                    })}
                  />
                  {errors.rewardTiers && typeof errors.rewardTiers.message === 'string' && (
                    <p className="mt-1 text-sm text-red-600">{errors.rewardTiers.message}</p>
                  )}
                  {Array.isArray(watch('rewardTiers')) && watch('rewardTiers').map((_, index) => (
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
                            {...register(`rewardTiers.${index}.title`, { required: 'Title is required' })}
                            type="text"
                            placeholder="e.g. Basic Supporter"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          {Array.isArray(errors.rewardTiers) && errors.rewardTiers[index]?.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.rewardTiers[index]?.title?.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Amount (USDC)
                          </label>
                          <input
                            {...register(`rewardTiers.${index}.minAmount`, { required: 'Minimum amount is required', min: { value: 1, message: 'Minimum must be at least 1' } })}
                            type="number"
                            placeholder="100"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          {Array.isArray(errors.rewardTiers) && errors.rewardTiers[index]?.minAmount && (
                            <p className="mt-1 text-sm text-red-600">{errors.rewardTiers[index]?.minAmount?.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          {...register(`rewardTiers.${index}.description`, { required: 'Description is required' })}
                          rows={2}
                          placeholder="Describe what backers at this tier will receive (e.g., updates, recognition, etc.)..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {Array.isArray(errors.rewardTiers) && errors.rewardTiers[index]?.description && (
                          <p className="mt-1 text-sm text-red-600">{errors.rewardTiers[index]?.description?.message}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {(!watch('rewardTiers') || watch('rewardTiers')?.length === 0) && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">No donation tiers created yet</p>
                      <Button type="button" onClick={addRewardTier} className="mt-4">
                        Create First Tier
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit</h2>
                  
                  {isWritePending && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin mr-3" />
                      <p className="text-sm font-medium text-blue-700">
                        Confirming transaction... Please wait in your wallet.
                      </p>
                    </div>
                  )}

                  {isConfirming && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin mr-3" />
                      <p className="text-sm font-medium text-blue-700">
                        Transaction pending... Waiting for confirmation.
                      </p>
                    </div>
                  )}

                  {isConfirmed && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                      <PartyPopper className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-green-900 mb-1">Campaign Created Successfully!</h4>
                        <p className="text-sm text-green-700">
                          Your campaign transaction is confirmed. Transaction hash: {hash}
                        </p>
                      </div>
                    </div>
                  )}

                  {(isWriteError || isConfirmError) && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                      <Zap className="w-5 h-5 text-red-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-red-900 mb-1">Transaction Failed!</h4>
                        <p className="text-sm text-red-700">
                          {writeError?.message || confirmError?.message || 'Unknown error occurred.'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="text-center py-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Ready to launch your NGO campaign?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      By submitting, you agree to our terms of service and campaign guidelines.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button 
                        type="submit" 
                        size="lg"
                        disabled={isWritePending || isConfirming}
                      >
                        {(isWritePending || isConfirming) ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Launch Campaign"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

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