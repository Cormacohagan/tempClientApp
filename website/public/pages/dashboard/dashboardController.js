ethChainApp.controller("dashboardCtrl", function($scope, $http){


    //
    // var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/91385a4c298148b58b285223dc9fc33b'));
    // var transactions = [];
    // var curBlock = (web3.eth.getBlock('latest'));
    // var totalTransactions = curBlock.transactions;
    //
    // if(totalTransactions.length > 10){
    //     //Populate 10 transactions from latest block found
    //     for(var i=0; i<10; i++){
    //         transactions.push(totalTransactions[i]);
    //     }
    // }
    // else{
    //     //Populate 10 transactions from as many blocks in chronological order as necessary
    //     while(transactions.length < 10){
    //         var prevBlock = curBlock.number-1;
    //
    //         for(var j in totalTransactions){
    //             transactions.push(totalTransactions[j]);
    //         }
    //
    //         curBlock = web3.eth.getBlock(prevBlock);
    //         totalTransactions = curBlock.transactions;
    //
    //     }
    // }
    //
    // //console.log(transactions);
    // res.send(transactions);


    //Create an Ethereum testnet wallet
    $scope.createWallet = function(){

        console.log("In here");

        $http.get('/ethRequests/createWallet')
            .then(function(response){

                console.log(response);

            });

    }





    $scope.registerLayout = function(){

        document.getElementById('registerBox').style.display = "flex";
        document.getElementById('loginBox').style.display = "none";

        document.getElementById("bkError").style.display = "none";
        document.getElementById("emailError").style.display = "none";
        document.getElementById("passwordError").style.display = "none";
        document.getElementById("postcodeError").style.display = "none";

    }


    $scope.loginLayout = function(){

        (document.getElementById('loginBox')).style.display = "flex";
        document.getElementById('registerBox').style.display = "none";

    }


    //Log in to business portal
    $scope.login = function(){

        document.getElementById("loginError").style.display = "none";
        var email = document.getElementById("loginUsername").value;
        var pw = document.getElementById("loginPassword").value;

        $http.get('/mongo/loginVerify', {params:{email:email, password:pw}})
            .then(function(response){

                if(response.data == 1){
                    console.log("Success! Logging in");
                }
                else{
                    document.getElementById("loginError").style.display = "block";
                }

            });

    }

});