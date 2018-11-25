pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";


contract Proposal is MintableToken, BurnableToken {
	string public name = "BOCIToken";
	string public symbol = "BITv5";
	uint8 public decimals = 0;
	uint public INITIAL_SUPPLY = 1000000;
    
    mapping(address => uint) public partyOf;
    mapping(address => string) public usernames;
    proposal[] public proposals;
    statusLog[] public statusLogs;
    address[] public members;
    mapping(uint => address[]) public proposalOwners; // 0: address of ESD Sales | 1: address of PB RM | 2: address of PB KYC

    struct proposal {
        string title;
        string content;
        uint status;
    }

    struct statusLog {
        uint id;
        uint action; // 0: create 1: disapprove, 2: approve
        uint date;
        address user;
    }

    /*
    partyOf:
    1: ESD Sales
    2: PB RM
    3: PB KYC

    status:
    0: created by ESD Sales
    1: approved by ESD Sales
    2: approved by PB RM
    3: approved by PB KYC
    4: rejected by ESD Sales
    */

    function register(uint _party, string _username) public {
        require(_party == 1 || _party == 2 || _party == 3);
        partyOf[msg.sender] = _party;
        usernames[msg.sender] = _username;
        members.push(msg.sender);
    }
    
    function getMembers() public view returns(address[]) {
        return members;
    }

    function getProposalsCount() public view returns(uint) {
        return proposals.length;
    }

    function getStatusLogCount() public view returns(uint) {
        return statusLogs.length;
    }

    function create(string _title, string _content) public {
        require(partyOf[msg.sender] == 1);
        uint id = proposals.length; 
        proposals.push(proposal(_title, _content, 1));
        mint(msg.sender, 1000);
        statusLogs.push(statusLog(id, 0, now, msg.sender));
        proposalOwners[id].push(msg.sender);
        proposalOwners[id].push(address(0));
        proposalOwners[id].push(address(0));

    }

    function approve(uint _id, string _content) public {

        // party ESD Sales
        if (proposals[_id].status == 0) {
            require(partyOf[msg.sender] == 1 && proposalOwners[_id][0] == msg.sender);
            proposals[_id].status = 1;
        }
        // party PB RM
        else if (proposals[_id].status == 1) {
            if (proposalOwners[_id][1] == address(0)) {
                proposalOwners[_id][1] = msg.sender;
            }
            require(partyOf[msg.sender] == 2 && proposalOwners[_id][1] == msg.sender);
            proposals[_id].status = 2;
        }
        // party PB KYC
        else if (proposals[_id].status == 2) {
            if (proposalOwners[_id][2] == address(0)) {
                proposalOwners[_id][2] = msg.sender;
            }
            require(partyOf[msg.sender] == 3 && proposalOwners[_id][2] == msg.sender);
            proposals[_id].status = 3;
        }

        statusLogs.push(statusLog(_id, 2, now, msg.sender));
        proposals[_id].content = _content;
        mint(msg.sender, 1000);
    }

    function disapprove(uint _id, string _content) public {
        // party ESD Sales
        if (proposals[_id].status == 0 && proposalOwners[_id][0] == msg.sender) {
            require(partyOf[msg.sender] == 1);
            proposals[_id].status = 4;
        }
        // party PB RM
        if (proposals[_id].status == 1) {
            if (proposalOwners[_id][1] == address(0)) {
                proposalOwners[_id][1] = msg.sender;
            }
            require(partyOf[msg.sender] == 2 && proposalOwners[_id][1] == msg.sender);
            proposals[_id].status = 0;
        }
        // party PB KYC
        if (proposals[_id].status == 2) {
            if (proposalOwners[_id][2] == address(0)) {
                proposalOwners[_id][2] = msg.sender;
            }
            require(partyOf[msg.sender] == 3 && proposalOwners[_id][2] == msg.sender);
            proposals[_id].status = 1;
        }

        statusLogs.push(statusLog(_id, 1, now, msg.sender));
        proposals[_id].content = _content;

		if (balanceOf(msg.sender) <= 1000) {
			mint(msg.sender, 1000);
		}

		burn(1000);
    }
}