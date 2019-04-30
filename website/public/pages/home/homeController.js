

ethChainApp.controller("homeCtrl", function($scope, $timeout, $http){

    //Setup Variables
    $scope.setupBool = false;
    $scope.setupStage1 = false;
    $scope.setupStage2 = false;
    $scope.setupStage3 = false;
    $scope.skipped = false;
    $scope.homePage = false;

    //Storage Variables
    $scope.forename = "";
    $scope.surname = "";
    $scope.brightness=0;
    $scope.autoPay=false;
    $scope.prePay=false;
    $scope.walletPassword="";
    $scope.privateKey="";

    var colourList = ["#231F1F","#373333","#4B4848","#5F5C5C","#737070","#878585","#9B9999",
        "#AFAEAE","#C3C2C2","#D7D6D6","#EBEBEB","#FFFFFF"];


    $scope.registerLayout = function(){

        document.getElementById('registerBox').style.display = "flex";
        document.getElementById('loginBox').style.display = "none";

        document.getElementById("bkError").style.display = "none";
        document.getElementById("emailError").style.display = "none";
        document.getElementById("passwordError").style.display = "none";
        document.getElementById("postcodeError").style.display = "none";

    }


    //Go from startup to page 1
    $scope.start = function(){

        $scope.setupBool = true;

        $timeout(function() {

            $scope.setupStage1 = true;

        }, 1000);

    }




    //Go from page 1 to page 2
    $scope.personalInfo = function(num){

        $scope.setupStage1 = false;

        $timeout(function() {

            $scope.setupStage2 = true;

        }, 1000);

    }

    //Return from page 1 to startup
    $scope.backToStart = function(){

        $scope.setupStage1 = false;

        $timeout(function() {

            $scope.setupBool = false;

        }, 1000);

    }

    //Go from page 2 to page 3
    $scope.settings = function(){

        $scope.forename = document.getElementById("forenameText").value;
        $scope.surname = document.getElementById("surnameText").value;

        $scope.setupStage2 = false;

        $timeout(function() {

            $scope.setupStage3 = true;

        }, 1000);

    }

    //Return from page 2 to page 1
    $scope.backToSplash = function(){

        $scope.setupStage2 = false;

        $timeout(function() {

            $scope.setupStage1 = true;

        }, 1000);

    }

    //Go from page 3 to page 4
    $scope.wallet = function(){

        $scope.setupStage3 = false;

        $timeout(function() {

            $scope.setupStage4 = true;

        }, 1000);

    }

    //Return from page 3 to page 2
    $scope.backToPersonal= function(){

        $scope.setupStage3 = false;

        $timeout(function() {

            $scope.setupStage2 = true;

        }, 1000);

    }

    //Finish the setup process
    $scope.completeSetup = function(){

        $scope.setupStage4 = false;

    }

    //Return from page 4 to page 3
    $scope.backToSettings = function(){

        $scope.setupStage4 = false;

        $timeout(function() {

            $scope.setupStage3 = true;

        }, 1000);

    }

    //Update the Background brightness, used in settings
    $scope.updateBackground = function(brightLvl){

        if($scope.brightness == 0){
            document.getElementById("blSlider").value = 1;
            $scope.brightness = 1;
        }
        else{

            updateBgColour($scope.brightness);

            $scope.brightness = brightLvl;


        }

    }

    function updateBgColour(val){

        document.getElementById("blSlider").value = val;
        document.getElementById("mainStage").style.backgroundColor = colourList[val-1]


    }

    //Create a local Eth wallet for the user
    $scope.createWallet = function() {

    }

    $scope.loadHomePage = function(){

        $scope.setupBool = true;

        $timeout(function() {

            $scope.homePage = true;

        }, 1000);


    }

    function newWallet(password){

        //Generate one new Eth testnet address when given a password.

    }






















});