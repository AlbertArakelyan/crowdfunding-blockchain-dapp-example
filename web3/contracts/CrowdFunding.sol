// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns; // Creates something like array

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        // public keyword means we can use it on frontend
        Campaign storage campaign = campaigns[numberOfCampaigns]; // create a new element under new index and start editing it

        // is everything ok?
        require(
            campaign.deadline < block.timestamp,
            "Campaign deadline must be in the future"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable { // payable means we are going to send some cryptocurrency through this function
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id]; // Pick the needed item to interact with

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        /*
            Send the donation to the campaign owner. The `sent` boolean indicates whether the transfer was successful.
            This line of code is making a call to the campaign.owner address with 
            the specified amount of value. The payable keyword ensures that the 
            recipient can receive the funds. The call function is used to execute a 
            message call or create a contract. The sent variable is a boolean that 
            indicates whether the call was successful or not. The empty string "" 
            is the data parameter for the call.        
        */
        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected += amount;
        }
    }

    function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory) { // view means it's going only to return some data to be able to view it
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) { // memory means get them from memory
        /*
            Instead of getting array we create an aempty array with empty slots
            as many as numberOfCampaigns, loop over them and assign one by one.
        */
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i]; // pick from storage
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
