// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    address public owner;
    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    enum CampaignStatus { Active, Successful, Failed, Cancelled }
    enum CampaignCategory { Education, Healthcare, Environment, Poverty_Alleviation, Human_Rights, Animal_Welfare }

    struct TeamMember {
        string name;
        string role;
        string bio;
    }

    struct InvestmentTier {
        string tierTitle;
        uint256 minimumAmount;
        string description;
    }

    struct Campaign {
        address campaignOwner; // Renamed from 'owner' to avoid conflict with contract owner
        string title;
        string description;
        CampaignCategory category;
        string projectDescription;
        uint256 goalAmount;
        uint256 deadline;
        string image;
        TeamMember[] teamMembers;
        InvestmentTier[] investmentTiers;
        uint256 currentAmount;
        address[] donators;
        uint256[] donations;
        CampaignStatus status;
    }

    // Modifiers
    modifier isCampaignOwner(uint256 _id) {
        require(campaigns[_id].campaignOwner == msg.sender, "Only the campaign owner can perform this action.");
        _;
    }

    modifier campaignExists(uint256 _id) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        _;
    }

    modifier campaignValidForInteraction(uint256 _id) {
        require(campaigns[_id].status == CampaignStatus.Active, "Campaign is not active.");
        require(block.timestamp < campaigns[_id].deadline, "Campaign deadline has passed.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Internal Helper Function
    function _checkAndSetCampaignStatus(uint256 _id) internal campaignExists(_id) {
        Campaign storage campaign = campaigns[_id];
        if (campaign.status == CampaignStatus.Active && block.timestamp >= campaign.deadline) {
            if (campaign.currentAmount >= campaign.goalAmount) {
                campaign.status = CampaignStatus.Successful;
            } else {
                campaign.status = CampaignStatus.Failed;
            }
        }
    }

    // Core Functions (Write Operations)
    function createCampaign(
        address _campaignOwner,
        string memory _title,
        string memory _description,
        CampaignCategory _category,
        string memory _projectDescription,
        uint256 _goalAmount,
        uint256 _deadline,
        string memory _image,
        TeamMember[] calldata _teamMembers,
        InvestmentTier[] calldata _investmentTiers
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be in the future.");
        require(_goalAmount > 0, "Goal amount must be greater than zero.");
        require(_campaignOwner != address(0), "Campaign owner cannot be zero address.");

        Campaign storage newCampaign = campaigns[numberOfCampaigns];

        newCampaign.campaignOwner = _campaignOwner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.category = _category;
        newCampaign.projectDescription = _projectDescription;
        newCampaign.goalAmount = _goalAmount;
        newCampaign.deadline = _deadline;
        newCampaign.image = _image;
        newCampaign.teamMembers = _teamMembers;
        newCampaign.investmentTiers = _investmentTiers;
        newCampaign.status = CampaignStatus.Active;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable campaignExists(_id) campaignValidForInteraction(_id) {
        require(msg.value > 0, "Must send a non-zero amount.");

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.currentAmount += msg.value;
    }

    function withdrawFunds(uint256 _id) public campaignExists(_id) isCampaignOwner(_id) {
        _checkAndSetCampaignStatus(_id); 
        Campaign storage campaign = campaigns[_id];
        require(campaign.status == CampaignStatus.Successful, "Campaign not successful.");
        require(campaign.currentAmount > 0, "No funds to withdraw.");
        
        uint256 amountToWithdraw = campaign.currentAmount;
        campaign.currentAmount = 0;
        // No change to status here, it remains Successful

        (bool success, ) = payable(msg.sender).call{value: amountToWithdraw}("");
        require(success, "Failed to transfer funds.");
    }

    function endCampaign(uint256 _id) public isCampaignOwner(_id) campaignExists(_id) {
        _checkAndSetCampaignStatus(_id); 
        // Potentially add logic for refunding donations if desired before ending the campaign
    }

    function cancelCampaign(uint256 _id) public campaignExists(_id) isCampaignOwner(_id) campaignValidForInteraction(_id) {
        Campaign storage campaign = campaigns[_id];
        campaign.status = CampaignStatus.Cancelled;
        // Potentially add logic for refunding donations if desired before cancellation
    }

    function updateCampaign(
        uint256 _id,
        string memory _title,
        string memory _description,
        CampaignCategory _category,
        string memory _projectDescription,
        uint256 _goalAmount,
        string memory _image,
        TeamMember[] calldata _teamMembers,
        InvestmentTier[] calldata _investmentTiers
    ) public campaignExists(_id) isCampaignOwner(_id) campaignValidForInteraction(_id) {
        Campaign storage campaign = campaigns[_id];

        campaign.title = _title;
        campaign.description = _description;
        campaign.category = _category;
        campaign.projectDescription = _projectDescription;
        campaign.goalAmount = _goalAmount;
        campaign.image = _image;
        campaign.teamMembers = _teamMembers;
        campaign.investmentTiers = _investmentTiers;
    }

    // Read Functions
    function getCampaignCoreDetails(uint256 _id) public view campaignExists(_id) returns (
        address campaignOwner,
        string memory title,
        string memory description,
        CampaignCategory category,
        string memory projectDescription,
        uint256 goalAmount,
        uint256 deadline,
        uint256 currentAmount,
        CampaignStatus status,
        string memory image
    ) {
        Campaign storage campaign = campaigns[_id];
        return (
            campaign.campaignOwner,
            campaign.title,
            campaign.description,
            campaign.category,
            campaign.projectDescription,
            campaign.goalAmount,
            campaign.deadline,
            campaign.currentAmount,
            campaign.status,
            campaign.image
        );
    }

    function getCampaignTeamMembers(uint256 _id) public view campaignExists(_id) returns (TeamMember[] memory) {
        return campaigns[_id].teamMembers;
    }

    function getCampaignInvestmentTiers(uint256 _id) public view campaignExists(_id) returns (InvestmentTier[] memory) {
        return campaigns[_id].investmentTiers;
    }

    function getAllDonatorsAndAmount(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }
}