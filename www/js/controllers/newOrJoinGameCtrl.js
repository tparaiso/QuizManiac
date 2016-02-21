angular.module('app.newOrJoinGame', [])
.controller('NewOrJoinGameCtrl', function($scope, $timeout, ionicMaterialMotion, ionicMaterialInk, URL_SERVER) {
    $scope.isExpanded = false;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
	// $rootScope.toggleSound();
})
