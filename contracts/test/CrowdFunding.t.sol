// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "forge-std/Test.sol";
import "../src/CrowdFunding.sol";

contract CrowdFundingTest is Test {
    CrowdFunding public crowdfunding;

    address payable public deployer;
    address payable public alice;
    address payable public bob;

    function setUp() public {
        deployer = payable(makeAddr("deployer"));
        alice = payable(makeAddr("alice"));
        bob = payable(makeAddr("bob"));

        vm.startPrank(deployer);
        crowdfunding = new CrowdFunding();
        vm.stopPrank();
    }

    function test_CreateCampaign() public {
        uint256 deadline = block.timestamp + 10 days;
        CrowdFunding.InvestmentTier[] memory tiers = new CrowdFunding.InvestmentTier[](1);
        tiers[0] = CrowdFunding.InvestmentTier({
            tierTitle: "Basic Tier",
            minimumAmount: 1 ether,
            description: "A basic tier for supporters."
        });
        CrowdFunding.TeamMember[] memory team = new CrowdFunding.TeamMember[](1);
        team[0] = CrowdFunding.TeamMember({
            name: "Alice",
            role: "Founder",
            bio: "Passionate about Web3"
        });

        uint256 campaignId = crowdfunding.createCampaign(
            alice,
            "My Awesome Project",
            "A short description",
            CrowdFunding.CampaignCategory.DeFi,
            "A detailed project description, going into more depth.",
            10 ether,
            deadline,
            "ipfs://myimagehash",
            team,
            tiers
        );

        (address campaignOwner, string memory title, string memory description, CrowdFunding.CampaignCategory category, string memory projectDescription, uint256 goalAmount, uint256 deadlineRetrieved, uint256 currentAmount, CrowdFunding.CampaignStatus status, string memory image) = crowdfunding.getCampaignCoreDetails(campaignId);
        CrowdFunding.TeamMember[] memory retrievedTeamMembers = crowdfunding.getCampaignTeamMembers(campaignId);
        CrowdFunding.InvestmentTier[] memory retrievedInvestmentTiers = crowdfunding.getCampaignInvestmentTiers(campaignId);

        assertEq(campaignOwner, alice);
        assertEq(title, "My Awesome Project");
        assertEq(description, "A short description");
        assertEq(projectDescription, "A detailed project description, going into more depth.");
        assertEq(goalAmount, 10 ether);
        assertEq(deadlineRetrieved, deadline);
        assertEq(currentAmount, 0);
        assertEq(uint256(status), uint256(CrowdFunding.CampaignStatus.Active));
        assertEq(uint256(category), uint256(CrowdFunding.CampaignCategory.DeFi));
        assertEq(image, "ipfs://myimagehash");
        assertEq(retrievedTeamMembers[0].name, "Alice");
        assertEq(retrievedInvestmentTiers[0].tierTitle, "Basic Tier");
        assertEq(crowdfunding.numberOfCampaigns(), 1);
    }

    function testRevert_CreateCampaign_PastDeadline() public {
        vm.warp(block.timestamp + 100 days); // Ensure block.timestamp is large enough
        uint256 deadline = block.timestamp - 1 days; // Deadline in the past
        CrowdFunding.InvestmentTier[] memory tiers = new CrowdFunding.InvestmentTier[](0);
        CrowdFunding.TeamMember[] memory team = new CrowdFunding.TeamMember[](0);

        vm.expectRevert("The deadline should be in the future.");
        crowdfunding.createCampaign(
            alice,
            "Invalid Project",
            "",
            CrowdFunding.CampaignCategory.DeFi,
            "",
            1 ether,
            deadline,
            "",
            team,
            tiers
        );
    }

    function testRevert_CreateCampaign_ZeroGoal() public {
        uint256 deadline = block.timestamp + 10 days;
        CrowdFunding.InvestmentTier[] memory tiers = new CrowdFunding.InvestmentTier[](0);
        CrowdFunding.TeamMember[] memory team = new CrowdFunding.TeamMember[](0);

        vm.expectRevert("Goal amount must be greater than zero.");
        crowdfunding.createCampaign(
            alice,
            "Invalid Project",
            "",
            CrowdFunding.CampaignCategory.DeFi,
            "",
            0, // Zero goal
            deadline,
            "",
            team,
            tiers
        );
    }

    function testRevert_CreateCampaign_ZeroAddressOwner() public {
        uint256 deadline = block.timestamp + 10 days;
        CrowdFunding.InvestmentTier[] memory tiers = new CrowdFunding.InvestmentTier[](0);
        CrowdFunding.TeamMember[] memory team = new CrowdFunding.TeamMember[](0);

        vm.expectRevert("Campaign owner cannot be zero address.");
        crowdfunding.createCampaign(
            address(0),
            "Invalid Project",
            "",
            CrowdFunding.CampaignCategory.DeFi,
            "",
            1 ether,
            deadline,
            "",
            team,
            tiers
        );
    }

    function test_DonateToCampaign() public {
        vm.warp(1000); // Set block.timestamp to a fixed, non-zero value for deterministic testing
        uint256 campaignId = _createTestCampaign(alice, 10 ether, block.timestamp + 10 days);

        vm.deal(bob, 1 ether); // Fund bob with 1 ether for the donation
        vm.startPrank(bob);
        crowdfunding.donateToCampaign{value: 1 ether}(campaignId);
        vm.stopPrank();

        (,,,,,,,uint256 currentAmount,,) = crowdfunding.getCampaignCoreDetails(campaignId);
        assertEq(currentAmount, 1 ether);
    }

    function testRevert_DonateToCampaign_ZeroAmount() public {
        uint256 campaignId = _createTestCampaign(alice, 10 ether, block.timestamp + 10 days);

        vm.startPrank(bob);
        vm.expectRevert("Must send a non-zero amount.");
        crowdfunding.donateToCampaign{value: 0}(campaignId);
        vm.stopPrank();
    }

    function test_WithdrawFunds_SuccessfulCampaign() public {
        uint256 initialBalance = alice.balance;
        uint256 campaignId = _createTestCampaign(alice, 1 ether, block.timestamp + 1 days);

        vm.deal(bob, 1 ether); // Fund bob
        vm.startPrank(bob);
        crowdfunding.donateToCampaign{value: 1 ether}(campaignId);
        vm.stopPrank();

        vm.warp(block.timestamp + 2 days); // Advance time past deadline

        vm.startPrank(alice);
        crowdfunding.withdrawFunds(campaignId);
        vm.stopPrank();

        (,,,,,,,uint256 remainingCurrentAmount,CrowdFunding.CampaignStatus status,) = crowdfunding.getCampaignCoreDetails(campaignId);
        assertEq(remainingCurrentAmount, 0, "Funds should be withdrawn");
        assertEq(uint256(status), uint256(CrowdFunding.CampaignStatus.Successful), "Status should be Successful");
        assertApproxEqAbs(alice.balance, initialBalance + 1 ether, 1e16); // Allow for gas cost
    }

    function testRevert_WithdrawFunds_NotOwner() public {
        uint256 campaignId = _createTestCampaign(alice, 1 ether, block.timestamp + 1 days);

        vm.warp(block.timestamp + 2 days);

        vm.startPrank(bob);
        vm.expectRevert("Only the campaign owner can perform this action.");
        crowdfunding.withdrawFunds(campaignId);
        vm.stopPrank();
    }

    function testRevert_WithdrawFunds_CampaignNotSuccessful() public {
        uint256 campaignId = _createTestCampaign(alice, 10 ether, block.timestamp + 1 days);

        vm.deal(bob, 1 ether);
        vm.startPrank(bob);
        crowdfunding.donateToCampaign{value: 0.5 ether}(campaignId); // Only half the goal
        vm.stopPrank();

        vm.warp(block.timestamp + 2 days);

        vm.startPrank(alice);
        vm.expectRevert("Campaign not successful.");
        crowdfunding.withdrawFunds(campaignId);
        vm.stopPrank();
    }

    function test_CancelCampaign() public {
        uint256 campaignId = _createTestCampaign(alice, 10 ether, block.timestamp + 10 days);

        vm.startPrank(alice);
        crowdfunding.cancelCampaign(campaignId);
        vm.stopPrank();

        (,,,,,,,,CrowdFunding.CampaignStatus status,) = crowdfunding.getCampaignCoreDetails(campaignId);
        assertEq(uint256(status), uint256(CrowdFunding.CampaignStatus.Cancelled), "Campaign status should be Cancelled");
    }

    function testRevert_CancelCampaign_NotOwner() public {
        uint256 campaignId = _createTestCampaign(alice, 10 ether, block.timestamp + 10 days);

        vm.startPrank(bob);
        vm.expectRevert("Only the campaign owner can perform this action.");
        crowdfunding.cancelCampaign(campaignId);
        vm.stopPrank();
    }

    function test_UpdateCampaign() public {
        uint256 campaignId = _createTestCampaign(alice, 10 ether, block.timestamp + 10 days);

        CrowdFunding.InvestmentTier[] memory tiers = new CrowdFunding.InvestmentTier[](1);
        tiers[0] = CrowdFunding.InvestmentTier({
            tierTitle: "Updated Tier",
            minimumAmount: 2 ether,
            description: "An updated tier."
        });
        CrowdFunding.TeamMember[] memory team = new CrowdFunding.TeamMember[](1);
        team[0] = CrowdFunding.TeamMember({
            name: "Bob",
            role: "Co-Founder",
            bio: "New bio"
        });

        vm.startPrank(alice);
        crowdfunding.updateCampaign(
            campaignId,
            "Updated Title",
            "Updated Short Desc",
            CrowdFunding.CampaignCategory.NFT,
            "Updated Detailed Desc",
            20 ether,
            "ipfs://newimagehash",
            team,
            tiers
        );
        vm.stopPrank();

        (address campaignOwner, string memory title, string memory description, CrowdFunding.CampaignCategory category, string memory projectDescription, uint256 goalAmount, uint256 deadlineRetrieved, uint256 currentAmount, CrowdFunding.CampaignStatus status, string memory image) = crowdfunding.getCampaignCoreDetails(campaignId);
        CrowdFunding.TeamMember[] memory retrievedTeamMembers = crowdfunding.getCampaignTeamMembers(campaignId);
        CrowdFunding.InvestmentTier[] memory retrievedInvestmentTiers = crowdfunding.getCampaignInvestmentTiers(campaignId);

        assertEq(campaignOwner, alice);
        assertEq(title, "Updated Title");
        assertEq(description, "Updated Short Desc");
        assertEq(projectDescription, "Updated Detailed Desc");
        assertEq(goalAmount, 20 ether);
        assertEq(deadlineRetrieved, block.timestamp + 10 days);
        assertEq(currentAmount, 0);
        assertEq(uint256(status), uint256(CrowdFunding.CampaignStatus.Active));
        assertEq(uint256(category), uint256(CrowdFunding.CampaignCategory.NFT));
        assertEq(image, "ipfs://newimagehash");
        assertEq(retrievedTeamMembers[0].name, "Bob");
        assertEq(retrievedInvestmentTiers[0].tierTitle, "Updated Tier");
    }

    function _createTestCampaign(
        address _campaignOwner,
        uint256 _goalAmount,
        uint256 _deadline
    ) internal returns (uint256) {
        CrowdFunding.InvestmentTier[] memory tiers = new CrowdFunding.InvestmentTier[](0);
        CrowdFunding.TeamMember[] memory team = new CrowdFunding.TeamMember[](0);
        vm.startPrank(_campaignOwner);
        uint256 campaignId = crowdfunding.createCampaign(
            _campaignOwner,
            "Test Campaign",
            "Short test desc",
            CrowdFunding.CampaignCategory.DeFi,
            "Detailed test desc",
            _goalAmount,
            _deadline,
            "ipfs://testimage",
            team,
            tiers
        );
        vm.stopPrank();
        return campaignId;
    }
} 