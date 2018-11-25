window.onload = () => {

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

            contract.getProposalsCount()
            .then( (result) => {
                document.getElementById("table").innerHTML = "";
                for (var i=0; i < parseInt(result.toString()); i++){
                    const id = i;
                    contract.proposals(id)
                    .then( (result) => {
                        const proposal = result.toString().split(",");
                        proposalOwners(contract, id)
                        .then(res => {
                            const proposalOwners = res.toString().split(",");

                            if (proposal[2] == "0") {
                                if (proposalOwners[0] == wallet.address && party == "1") {
                                    document.getElementById("table").innerHTML += `
                                        <tr>
                                            <td>${id}</td>
                                            <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                            <td>${proposal[1]}</td>
                                            <td>
                                                <a href="approve.html?id=${id}">
                                                    <i title="Approve" class="fas fa-check"></i>
                                                </a>
                                                <a href="disapprove.html?id=${id}">
                                                    <i title="Disapprove" class="fas fa-times"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    `;
                                } else {
                                    contract.usernames(proposalOwners[0])
                                    .then( (res) => {
                                        document.getElementById("table").innerHTML += `
                                            <tr>
                                                <td>${id}</td>
                                                <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                                <td>${proposal[1]}</td>
                                                <td>Pending to approve by <b>${res.toString()}</b></td>
                                            </tr>
                                        `;
                                    });
                                }
                            }
        
                            else if (proposal[2] == "1") {
                                if ((proposalOwners[1] == '0x0000000000000000000000000000000000000000' || proposalOwners[1] == wallet.address) && party == "2") {
                                    document.getElementById("table").innerHTML += `
                                        <tr>
                                            <td>${id}</td>
                                            <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                            <td>${proposal[1]}</td>
                                            <td>
                                                <a href="approve.html?id=${id}">
                                                    <i title="Approve" class="fas fa-check"></i>
                                                </a>
                                                <a href="disapprove.html?id=${id}">
                                                    <i title="Disapprove" class="fas fa-times"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    `;
                                } else {
                                    contract.usernames(proposalOwners[1])
                                    .then( (res) => {
                                        if (res.toString() == "") {
                                            document.getElementById("table").innerHTML += `
                                                <tr>
                                                    <td>${id}</td>
                                                    <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                                    <td>${proposal[1]}</td>
                                                    <td>Pending to approve by <b>PB RM</b></b></td>
                                                </tr>
                                            `;
                                        } else {
                                            document.getElementById("table").innerHTML += `
                                                <tr>
                                                    <td>${id}</td>
                                                    <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                                    <td>${proposal[1]}</td>
                                                    <td>Pending to approve by <b>${res.toString()}</b></b></td>
                                                </tr>
                                            `;
                                        }
                                    });
                                }
                            }
        
                            else if (proposal[2] == "2") {
                                if ((proposalOwners[2] == '0x0000000000000000000000000000000000000000' || proposalOwners[2] == wallet.address) && party == "3") {
                                    document.getElementById("table").innerHTML += `
                                        <tr>
                                            <td>${id}</td>
                                            <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                            <td>${proposal[1]}</td>
                                            <td>
                                                <a href="approve.html?id=${id}">
                                                    <i title="Approve" class="fas fa-check"></i>
                                                </a>
                                                <a href="disapprove.html?id=${id}">
                                                    <i title="Disapprove" class="fas fa-times"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    `;
                                }
                                else {
                                    contract.usernames(proposalOwners[2])
                                    .then( (res) => {
                                        if (res.toString() == "") {
                                            document.getElementById("table").innerHTML += `
                                                <tr>
                                                    <td>${id}</td>
                                                    <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                                    <td>${proposal[1]}</td>
                                                    <td>Pending to approve by <b>PB KYC</b></b></td>
                                                </tr>
                                            `;
                                        } else {
                                            document.getElementById("table").innerHTML += `
                                                <tr>
                                                    <td>${id}</td>
                                                    <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                                    <td>${proposal[1]}</td>
                                                    <td>Pending to approve by <b>${res.toString()}</b></b></td>
                                                </tr>
                                            `;
                                        }
                                    });
                                }
                            }

                            else if (proposal[2] == "3") {
                                contract.usernames(proposalOwners[2])
                                .then( (res) => {
                                    document.getElementById("table").innerHTML += `
                                        <tr>
                                            <td>${id}</td>
                                            <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                            <td>${proposal[1]}</td>
                                            <td>Approved by <b>${res.toString()}</b></b></td>
                                        </tr>
                                    `;
                                });
                            }

                            else if (proposal[2] == "4") {
                                contract.usernames(proposalOwners[0])
                                .then( (res) => {
                                    document.getElementById("table").innerHTML += `
                                        <tr>
                                            <td>${id}</td>
                                            <td><a href="details.html?id=${id}">${proposal[0]}</a></td>
                                            <td>${proposal[1]}</td>
                                            <td>Rejected by <b>${res.toString()}</b></b></td>
                                        </tr>
                                    `;
                                });
                            }

                        });
                    });
                }
            });
        });
    } else {
        window.location.replace("index.html");
    }
}

async function proposalOwners(contract, id) {
    const Aaddress = await contract.proposalOwners(id,0);
    const Baddress = await contract.proposalOwners(id,1);
    const Caddress = await contract.proposalOwners(id,2);
    return [Aaddress,Baddress,Caddress];
}