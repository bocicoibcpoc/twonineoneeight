window.onload = () => {
    let userAddress = window.location.href.split("=")[1];

    if (sessionStorage.private_key && sessionStorage.address && sessionStorage.abi && sessionStorage.infura_key) {
        
        const providers = ethers.providers;
//        const network = providers.networks.ropsten;
//        const infuraProvider = new providers.InfuraProvider(network, sessionStorage.infura_key);
		const infuraProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    
        const address = sessionStorage.address;
        const abi = JSON.parse(sessionStorage.abi);
    
        const wallet = new ethers.Wallet(sessionStorage.private_key, infuraProvider);
        const contract = new ethers.Contract(address, abi, wallet);

        document.getElementById("logout").addEventListener("click", () => {
            sessionStorage.clear();
            window.location.replace("list.html");
        });

        contract.usernames(wallet.address)
        .then( (res) => {
            document.getElementById("username").innerHTML = '<b>' + res.toString() + '</b>';
        });

        document.getElementById("your_address").innerHTML = wallet.address;

        contract.balanceOf(wallet.address)
        .then( (res) => {
            document.getElementById("your_balance").innerHTML = "Your banlance : " + res.toString();
        });

        getDataByAddress(contract, userAddress)
        .then( result => {
            var parties = ['','ESD Sales','PB RM','PB KYC'];
            document.getElementById("userInfo").innerHTML += 
            `${result[0]} (party ${parties[result[1]]})<br>
            User address : ${userAddress}`;
        });

        contract.partyOf(wallet.address)
        .then( (res) => {
            const party = res.toString();
            if (party == "1") {
                document.getElementById("create").innerHTML = '<a href="create.html" class="button">Refer Client</a>';
            }

            if (party == "1") {
                document.getElementById("your_party").innerHTML = "Your party : <b>ESD Sales</b>";
            }

            if (party == "2") {
                document.getElementById("your_party").innerHTML = "Your party : <b>PB RM</b>";
            }

            if (party == "3") {
                document.getElementById("your_party").innerHTML = "Your party : <b>PB KYC</b>";
            }
        });

        /*contract.getStatusLogCount()
        .then( result => {
            const length = parseInt(result.toString()) - 1;
            var actions = ['created', 'disapproved', 'approved'];
            for (var i=0; i <= length; i++){
                contract.statusLogs(i)
                .then( result => {
                    let item = result.toString().split(",");
                    if (item[3] == userAddress) {
                        document.getElementById("fields").innerHTML += 
                        `has <b>${actions[parseInt(item[1])]}</b> the proposal <b>#${item[0]}</b><br>`;
                    }
                })
            }
        });*/

        contract.partyOf(userAddress)
        .then( (res) => {
            const userParty = res.toString();
            contract.getProposalsCount()
            .then( (result) => {
                for (var i=0; i < parseInt(result.toString()); i++){
                    const id = i;
                    contract.proposals(id)
                    .then( (result) => {
                        const proposal = result.toString().split(",");
                        proposalOwners(contract, id)
                        .then(res => {
                            const proposalOwners = res.toString().split(",");

                            if (proposal[2] == "0") {
                                if (proposalOwners[0] == userAddress && userParty == "1") {
                                    if (document.getElementById("fields").innerHTML == 'No pending clients') {
                                        document.getElementById("fields").innerHTML = ''
                                    }
                                    document.getElementById("fields").innerHTML += 
                                    `Pending to approve the proposal <b>#${id}</b><br>`;
                                }
                            }
        
                            else if (proposal[2] == "1") {
                                if ((proposalOwners[1] == '0x0000000000000000000000000000000000000000' || proposalOwners[1] == userAddress) && userParty == "2") {
                                    if (document.getElementById("fields").innerHTML == 'No pending clients') {
                                        document.getElementById("fields").innerHTML = ''
                                    }
                                    document.getElementById("fields").innerHTML += 
                                    `Pending to approve the proposal <b>#${id}</b><br>`;
                                }
                            }
        
                            else if (proposal[2] == "2") {
                                if ((proposalOwners[2] == '0x0000000000000000000000000000000000000000' || proposalOwners[2] == userAddress) && userParty == "3") {
                                    if (document.getElementById("fields").innerHTML == 'No pending clients') {
                                        document.getElementById("fields").innerHTML = ''
                                    }
                                    document.getElementById("fields").innerHTML += 
                                    `Pending to approve the proposal <b>#${id}</b><br>`;
                                }
                            }

                            else if (proposal[2] == "3") {
                                if (proposalOwners[2] == userAddress && userParty == "3") {
                                    if (document.getElementById("fields").innerHTML == 'No pending clients') {
                                        document.getElementById("fields").innerHTML = ''
                                    }
                                    document.getElementById("fields").innerHTML += 
                                    `has approved the proposal <b>#${id}</b><br>`;
                                }
                            }

                            else if (proposal[2] == "4") {
                                if (proposalOwners[0] == userAddress && userParty == "1") {
                                    if (document.getElementById("fields").innerHTML == 'No pending clients') {
                                        document.getElementById("fields").innerHTML = ''
                                    }
                                    document.getElementById("fields").innerHTML += 
                                    `has rejected the proposal <b>#${id}</b><br>`;
                                }
                            }

                        });
                    });
                }
            });
        });
    }
}

async function proposalOwners(contract, id) {
    const Aaddress = await contract.proposalOwners(id,0);
    const Baddress = await contract.proposalOwners(id,1);
    const Caddress = await contract.proposalOwners(id,2);
    return [Aaddress,Baddress,Caddress];
}

async function getDataByAddress(contract, address) {
    const username = await contract.usernames(address).then(res => {return res.toString()});
    const party = await contract.partyOf(address).then(res => {return res.toString()});
    return [username, party];
}