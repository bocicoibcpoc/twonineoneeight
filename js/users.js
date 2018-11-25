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
        });

        contract.getMembers()
        .then(result => {
            let addresses = result.toString().split(",");
            var parties = ['','ESD Sales','PB RM','PB KYC'];
            addresses.forEach(address => {
                getDataByAddress(contract, address)
                .then( result => {
                    document.getElementById("fields").innerHTML += `<a href="statistics.html?address=${address}">${result[0]} (party ${parties[result[1]]})</a><br>`;
                });
            });
        });

    }
}

async function getDataByAddress(contract, address) {
    const username = await contract.usernames(address).then(res => {return res.toString()});
    const party = await contract.partyOf(address).then(res => {return res.toString()});
    return [username, party];
}