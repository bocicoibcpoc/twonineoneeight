window.onload = () => {
    document.getElementById("submit").addEventListener("click", () => {
        var private_key = document.getElementById("private_key").value;

        if (private_key != "") {

            if (private_key.substring(0, 2) != '0x') {
                private_key = '0x' + private_key;
            }

            sessionStorage.private_key = private_key;
            sessionStorage.address = '0xb7f12b13f91aefdc651148a104c93f81052f05be';
            sessionStorage.abi = '[
			{
			  "constant": true,
			  "inputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "name": "proposals",
			  "outputs": [
				{
				  "name": "title",
				  "type": "string"
				},
				{
				  "name": "content",
				  "type": "string"
				},
				{
				  "name": "status",
				  "type": "uint256"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "mintingFinished",
			  "outputs": [
				{
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "name",
			  "outputs": [
				{
				  "name": "",
				  "type": "string"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "totalSupply",
			  "outputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_from",
				  "type": "address"
				},
				{
				  "name": "_to",
				  "type": "address"
				},
				{
				  "name": "_value",
				  "type": "uint256"
				}
			  ],
			  "name": "transferFrom",
			  "outputs": [
				{
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [
				{
				  "name": "",
				  "type": "address"
				}
			  ],
			  "name": "partyOf",
			  "outputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "INITIAL_SUPPLY",
			  "outputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "decimals",
			  "outputs": [
				{
				  "name": "",
				  "type": "uint8"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_to",
				  "type": "address"
				},
				{
				  "name": "_amount",
				  "type": "uint256"
				}
			  ],
			  "name": "mint",
			  "outputs": [
				{
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_value",
				  "type": "uint256"
				}
			  ],
			  "name": "burn",
			  "outputs": [],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "name": "statusLogs",
			  "outputs": [
				{
				  "name": "id",
				  "type": "uint256"
				},
				{
				  "name": "action",
				  "type": "uint256"
				},
				{
				  "name": "date",
				  "type": "uint256"
				},
				{
				  "name": "user",
				  "type": "address"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [
				{
				  "name": "",
				  "type": "uint256"
				},
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "name": "proposalOwners",
			  "outputs": [
				{
				  "name": "",
				  "type": "address"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "name": "members",
			  "outputs": [
				{
				  "name": "",
				  "type": "address"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_spender",
				  "type": "address"
				},
				{
				  "name": "_subtractedValue",
				  "type": "uint256"
				}
			  ],
			  "name": "decreaseApproval",
			  "outputs": [
				{
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [
				{
				  "name": "_owner",
				  "type": "address"
				}
			  ],
			  "name": "balanceOf",
			  "outputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [],
			  "name": "renounceOwnership",
			  "outputs": [],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [],
			  "name": "finishMinting",
			  "outputs": [
				{
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "owner",
			  "outputs": [
				{
				  "name": "",
				  "type": "address"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "symbol",
			  "outputs": [
				{
				  "name": "",
				  "type": "string"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_to",
				  "type": "address"
				},
				{
				  "name": "_value",
				  "type": "uint256"
				}
			  ],
			  "name": "transfer",
			  "outputs": [
				{
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_spender",
				  "type": "address"
				},
				{
				  "name": "_addedValue",
				  "type": "uint256"
				}
			  ],
			  "name": "increaseApproval",
			  "outputs": [
				{
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [
				{
				  "name": "_owner",
				  "type": "address"
				},
				{
				  "name": "_spender",
				  "type": "address"
				}
			  ],
			  "name": "allowance",
			  "outputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [
				{
				  "name": "",
				  "type": "address"
				}
			  ],
			  "name": "usernames",
			  "outputs": [
				{
				  "name": "",
				  "type": "string"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_newOwner",
				  "type": "address"
				}
			  ],
			  "name": "transferOwnership",
			  "outputs": [],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "name": "burner",
				  "type": "address"
				},
				{
				  "indexed": false,
				  "name": "value",
				  "type": "uint256"
				}
			  ],
			  "name": "Burn",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "name": "to",
				  "type": "address"
				},
				{
				  "indexed": false,
				  "name": "amount",
				  "type": "uint256"
				}
			  ],
			  "name": "Mint",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [],
			  "name": "MintFinished",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "name": "previousOwner",
				  "type": "address"
				}
			  ],
			  "name": "OwnershipRenounced",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "name": "previousOwner",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "name": "newOwner",
				  "type": "address"
				}
			  ],
			  "name": "OwnershipTransferred",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "name": "owner",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "name": "spender",
				  "type": "address"
				},
				{
				  "indexed": false,
				  "name": "value",
				  "type": "uint256"
				}
			  ],
			  "name": "Approval",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "name": "from",
				  "type": "address"
				},
				{
				  "indexed": true,
				  "name": "to",
				  "type": "address"
				},
				{
				  "indexed": false,
				  "name": "value",
				  "type": "uint256"
				}
			  ],
			  "name": "Transfer",
			  "type": "event"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_party",
				  "type": "uint256"
				},
				{
				  "name": "_username",
				  "type": "string"
				}
			  ],
			  "name": "register",
			  "outputs": [],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "getMembers",
			  "outputs": [
				{
				  "name": "",
				  "type": "address[]"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "getProposalsCount",
			  "outputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": true,
			  "inputs": [],
			  "name": "getStatusLogCount",
			  "outputs": [
				{
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "payable": false,
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_title",
				  "type": "string"
				},
				{
				  "name": "_content",
				  "type": "string"
				}
			  ],
			  "name": "create",
			  "outputs": [],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_spender",
				  "type": "address"
				},
				{
				  "name": "_value",
				  "type": "uint256"
				}
			  ],
			  "name": "approve",
			  "outputs": [
				{
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_id",
				  "type": "uint256"
				},
				{
				  "name": "_content",
				  "type": "string"
				}
			  ],
			  "name": "approve",
			  "outputs": [],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "constant": false,
			  "inputs": [
				{
				  "name": "_id",
				  "type": "uint256"
				},
				{
				  "name": "_content",
				  "type": "string"
				}
			  ],
			  "name": "disapprove",
			  "outputs": [],
			  "payable": false,
			  "stateMutability": "nonpayable",
			  "type": "function"
			}
		  ]';
   
			sessionStorage.infura_key = 'bc9ad02aefe8432da4a8111b092a2732';

            window.location.replace("register.html");
        }
    });
}