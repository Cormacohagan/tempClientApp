var express = require('express');
var request = require('request');
var router = require('express').Router();
var Web3 = require('web3');
var web3 = new Web3();
var tx = require('ethereumjs-tx');
var hookWeb3 = require('hooked-web3-provider');
var async = require('async');
const lightWallet = require('eth-lightwallet');

var keystoreGlobal;



//Set Web3 provider
function setProvider(keystore) {

    var provider = new hookWeb3({
        host: "https://rinkeby.infura.io/",
        transaction_signer: keystore
    });

    web3.setProvider(provider);

}

//Get balance of all wallets with given PK
function getBalances() {

    var addresses = keystoreGlobal.getAddresses();
    var addressArr = [];

    const asyncPopulate = async.map(addresses, web3.eth.getBalance, function(err, balances) {

        async.map(addresses, web3.eth.getTransactionCount, function(err, nonces) {

            for (var i=0; i<addresses.length; ++i) {

                addressArr.push({address:addresses[i], balance:balances[i]});

                console.log(addresses[i] + "    " + balances[i]);

            }
        });
    });
}


//Create new address(es)
function newAddresses(password) {

    return new Promise((resolve, reject) => {

        if (password == '') {

            password = prompt('Enter password to retrieve addresses', 'Password');
        }

        var numAddr = 1;

        keystoreGlobal.keyFromPassword(password, function(err, pwDerivedKey) {

            keystoreGlobal.generateNewAddress(pwDerivedKey, numAddr);

            var addresses = keystoreGlobal.getAddresses();
            var privateKey = keystoreGlobal.exportPrivateKey(addresses[0],pwDerivedKey);

            resolve({address:addresses, privateKey:privateKey});

        });

    });

}



// Create Eth Wallet on machine
router.get('/createWallet', function(req, res) {

    //var password = req.query.password;

    var password = "test";
    var seed = lightWallet.keystore.generateRandomSeed();

    lightWallet.keystore.createVault({
        password:password,
        seedPhrase:seed,
        hdPathString: "m/0'/0'/0'"
    }, function(err, key){

        keystoreGlobal = key;

        setProvider(keystoreGlobal);

        newAddresses(password)
            .then((value) => {

                res.send({address:value.address[0], seed:seed, privateKey:value.privateKey});

            });

    });

});


//Returns a verified transaction key
function verifyTransaction(password, seed){
    return new Promise((resolve, reject) => {

        lightWallet.keystore.createVault({
            password:password,
            seedPhrase:seed,
            hdPathString: "m/0'/0'/0'"
        }, function(err, key) {

            keystoreGlobal = key;

            setProvider(keystoreGlobal);

            resolve(key);

        });
    });

}

// Send Eth to a given address via raw transaction
router.get('/sendEth', function(req, res) {


    var password = "test";
    var seed="thing there topple lounge way afford bird army pepper task width melt";
    var from="0xf0ead73d133d4cc664fa421552c6517fbe9573ae";
    var pk="9f95a82131de816c494c7cd5d6917220e0c57a5479a62f89ba92313f34bdd41f";
    var to="0x4b2cfe65cedd517d8579ff42c71e31ead6a60230";
    var eth="0.1";
    var value = parseFloat(eth)*1.0e18;


    var pkHex = new Buffer(pk, 'hex')

    var rawTx = {

        from: "0xf0ead73d133d4cc664fa421552c6517fbe9573ae",
        to: "0x4b2cfe65cedd517d8579ff42c71e31ead6a60230",
        eth:eth,
        value:value,
        gasPrice: 7000000000,
        gas: 25000

    }









    // var transaction = new tx(rawTx);
    // transaction.sign(pkHex);
    //
    // var serializedTx = transaction.serialize();
    //
    // web3.eth.sendSignedTransaction(serializedTx.toString('hex'), function(err, hash){
    //
    //     if(!err){
    //         console.log(hash);
    //     }
    //
    // });


    // verifyTransaction(password, seed)
    //     .then(function(connKey){
    //
    //         var from = "0xa1477720e9fcbdc15fddb6aaa3c6b7a08529bdc0";
    //         var to = "0x4b2cfe65cedd517d8579ff42c71e31ead6a60230";
    //         var eth = "0.1";
    //         var value = parseFloat(eth)*1.0e18;
    //         var gasPrice = 7000000000;
    //         var gas = 25000;
    //
    //         web3.eth.sendTransaction({from:from, to:to, value:value, gasPrice: gasPrice, gas: gas},
    //             function(err, txHash){
    //
    //                 console.log(err);
    //                 console.log(txHash);
    //
    //             });
    //
    //         res.send("Testing bais");
    //
    //     });

});


module.exports = router;