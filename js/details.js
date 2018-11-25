window.onload = () => {

    let id = window.location.href.split("=")[1];

    if (sessionStorage.private_key && sessionStorage.address && sessionStorage.abi && sessionStorage.infura_key) {
        
        const providers = ethers.providers;
//        const network = providers.networks.ropsten;
//        const infuraProvider = new providers.InfuraProvider(network, sessionStorage.infura_key);
		const infuraProvider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    
        const address = sessionStorage.address;
        const abi = JSON.parse(sessionStorage.abi);
    
        const wallet = new ethers.Wallet(sessionStorage.private_key, infuraProvider);
        const contract = new ethers.Contract(address, abi, wallet);

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
                document.getElementById("your_party").innerHTML = "Your party : <b>ESD Sales</b>";
            }

            if (party == "2") {
                document.getElementById("your_party").innerHTML = "Your party : <b>PB RM</b>";
            }

            if (party == "3") {
                document.getElementById("your_party").innerHTML = "Your party : <b>PB KYC</b>";
            }

            contract.proposals(id)
            .then( (result) => {
                var proposal = result.toString().split(",");
                document.getElementById("fields").innerHTML += '<br><h5>Title : ' + proposal[0] + '</h5>';
                document.getElementById("fields").innerHTML += '<ul>';
                
                contract.getStatusLogCount()
                .then( result => {
                    var items = [];
                    const length = parseInt(result.toString()) - 1;
                    for (var i=0; i <= length; i++){
                        const counter = i;
                        contract.statusLogs(counter)
                        .then( result => {
                            var data = result.toString().split(",");
                            var status = {};
                            status.id = data[0];
                            status.action = parseInt(data[1]);
                            status.date = data[2];
                            status.user = data[3];
                            
                            contract.usernames(data[3])
                            .then( result => {
                                status.username = result.toString();
                                contract.partyOf(data[3])
                                .then( result => {
                                    status.party = result.toString();
                                    items.push(status);

                                    if (counter == length) {
                                
                                        const itemsFiltred = items.sort((a,b) => {
                                            return b.date - a.date;
                                        }).filter((a) => {
                                            return a.id == id;
                                        });
        
                                        var parties = ['','ESD Sales','PB RM','PB KYC'];
                                        var actions = ['created', 'disapproved', 'approved']
                                        document.getElementById("fields").innerHTML += '<ul id="list"></ul>';
                                        itemsFiltred.forEach(item => {
                                            document.getElementById("list").innerHTML += `<li>
                                                ${item.username} (party ${parties[item.party]}) has ${actions[parseInt(item.action)]} the client at ${new Date(parseInt(item.date)*1000).toLocaleString()}
                                            </li>`;
                                        });
                                        
                                    }
                                });
                            });
                        });
                    }
                });

                /*contract.getStatusLogCount()
                .then( (result) => {
                    for (var i=0; i < parseInt(result.toString()); i++){
                        const _i = i+1;
                        contract.statusLogs(i)
                        .then( (result) => {
                            var status = result.toString().split(",");
                            if (parseInt(status[0]) == id) {
                                contract.usernames(status[3])
                                .then( (result) => {
                                    var username = result.toString();
                                    contract.partyOf(status[3])
                                    .then( (result) => {
                                        var parties = ['','A','B','C'];
                                        var actions = ['created', 'disapproved', 'approved']
                                        var party = parties[parseInt(result.toString())];
                                        var date = new Date(parseInt(status[2])*1000);
                                        document.getElementById("fields").innerHTML += `<li>
                                            #${_i} ${username} (party ${party}) has ${actions[parseInt(status[1])]} the proposal at ${date.toLocaleString()}
                                        </li>`;
                                    });
                                });
                            }     
                        });
                    }
                });*/
                
                document.getElementById("fields").innerHTML += '</ul>';      
            });

        });

        document.getElementById("logout").addEventListener("click", () => {
            sessionStorage.clear();
            window.location.replace("list.html");
        });

    } else {
        window.location.replace("index.html");
    }
}