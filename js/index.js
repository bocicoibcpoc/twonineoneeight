window.onload = () => {
    document.getElementById("submit").addEventListener("click", () => {
        var private_key = document.getElementById("private_key").value;

        if (private_key != "") {

            if (private_key.substring(0, 2) != '0x') {
                private_key = '0x' + private_key;
            }

            sessionStorage.private_key = private_key;
            sessionStorage.address = '0xc97ea8fc0c958ecded04f78ea6016af1b063f97b';
            sessionStorage.abi = '[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"status","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"},{"name":"_content","type":"string"}],"name":"create","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_content","type":"string"}],"name":"disapprove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getStatusLogCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"partyOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"statusLogs","outputs":[{"name":"id","type":"uint256"},{"name":"action","type":"uint256"},{"name":"date","type":"uint256"},{"name":"user","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"proposalOwners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_content","type":"string"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getProposalsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMembers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_party","type":"uint256"},{"name":"_username","type":"string"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"usernames","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]';
            sessionStorage.infura_key = '5b48ccb771c544658742b69d58b37201';

            window.location.replace("register.html");
        }
    });
}