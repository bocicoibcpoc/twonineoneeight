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

        let id = window.location.href.split("=")[1];

        contract.proposals(id)
        .then( (result) => {
            var person = result.toString().split(",");
            document.getElementById("title").value = person[0];
            document.getElementById("content").value = person[1];
        });

        document.getElementById("submit").addEventListener("click", () => {
            let content = document.getElementById("content").value.replace(",", " ");
    
            contract.approve(id, content)
            .then(function(transactionHash) {
                document.getElementById("fields").innerHTML = '<i class="fas fa-clock"></i> Please Wait...';
                var action = setInterval(() => {
                    infuraProvider.getTransactionReceipt(transactionHash.hash)
                    .then((transaction) => {
                        if (transaction != null && transaction.status == 1) {
                            clearInterval(action);
                            window.location.replace("list.html");
                        } 
                        else if (transaction != null && transaction.status == 0) {
                            document.getElementById("message").innerHTML = '<i class="fas fa-info-circle"></i> Please Try Again.';
                        }
                    });
                }, 3000);
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